const CART_STORAGE_PREFIX = 'esales-cart'
const CART_GUEST_KEY = `${CART_STORAGE_PREFIX}-guest`

const normalizeId = (value) => String(value ?? '').trim()

const canUseStorage = () => typeof window !== 'undefined' && typeof localStorage !== 'undefined'

const resolveCartKey = (userId = null) => {
  const normalizedUserId = normalizeId(userId)
  if (normalizedUserId) return `${CART_STORAGE_PREFIX}-user-${normalizedUserId}`
  return CART_GUEST_KEY
}

export const readCurrentUserId = () => {
  if (!canUseStorage()) return ''

  try {
    const raw = localStorage.getItem('user')
    if (!raw) return ''
    const parsed = JSON.parse(raw)
    return normalizeId(parsed?.id)
  } catch {
    return ''
  }
}

const normalizeCartItem = (item) => {
  const id = normalizeId(item?.id)
  if (!id) return null

  return {
    ...item,
    id,
    quantity: Math.max(1, Number(item?.quantity) || 1)
  }
}

const normalizeCart = (items) => {
  if (!Array.isArray(items)) return []
  return items.map((item) => normalizeCartItem(item)).filter(Boolean)
}

const mergeCartItems = (baseItems, incomingItems) => {
  const byId = new Map(normalizeCart(baseItems).map((item) => [item.id, item]))

  for (const incoming of normalizeCart(incomingItems)) {
    if (byId.has(incoming.id)) {
      const current = byId.get(incoming.id)
      byId.set(incoming.id, {
        ...current,
        quantity: Math.max(1, Number(current.quantity) || 1) + Math.max(1, Number(incoming.quantity) || 1)
      })
    } else {
      byId.set(incoming.id, incoming)
    }
  }

  return [...byId.values()]
}

export const getCartForUser = (userId = null) => {
  if (!canUseStorage()) return []

  try {
    const raw = localStorage.getItem(resolveCartKey(userId))
    if (!raw) return []
    return normalizeCart(JSON.parse(raw))
  } catch {
    return []
  }
}

export const setCartForUser = (userId, items) => {
  if (!canUseStorage()) return []

  const normalized = normalizeCart(items)
  localStorage.setItem(resolveCartKey(userId), JSON.stringify(normalized))
  return normalized
}

export const getCurrentCart = () => getCartForUser(readCurrentUserId())

export const setCurrentCart = (items) => setCartForUser(readCurrentUserId(), items)

export const clearGuestCart = () => setCartForUser(null, [])

export const mergeGuestCartIntoUser = (userId) => {
  const guestCart = getCartForUser(null)
  const userCart = getCartForUser(userId)
  const merged = mergeCartItems(userCart, guestCart)

  setCartForUser(userId, merged)
  clearGuestCart()

  return merged
}

export const copyGuestCartToUser = (userId) => {
  const guestCart = getCartForUser(null)
  return setCartForUser(userId, guestCart)
}

export const addToCurrentCart = (item) => {
  const current = getCurrentCart()
  const merged = mergeCartItems(current, [item])
  return setCurrentCart(merged)
}

export const updateCurrentCartItem = (item) => {
  const normalized = normalizeCartItem(item)
  if (!normalized) return getCurrentCart()

  const current = getCurrentCart()
  const updated = current.map((entry) => (entry.id === normalized.id ? normalized : entry))
  return setCurrentCart(updated)
}

export const removeFromCurrentCart = (itemId) => {
  const normalizedId = normalizeId(itemId)
  const filtered = getCurrentCart().filter((item) => item.id !== normalizedId)
  return setCurrentCart(filtered)
}

export const clearCurrentCart = () => setCurrentCart([])
