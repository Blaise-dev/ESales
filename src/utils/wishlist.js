const WISHLIST_STORAGE_PREFIX = 'esales-wishlist'
const WISHLIST_STORAGE_GUEST_KEY = `${WISHLIST_STORAGE_PREFIX}-guest`
export const WISHLIST_EVENT = 'esales-wishlist-updated'

const normalizeId = (value) => String(value ?? '').trim()

const canUseStorage = () => typeof window !== 'undefined' && typeof localStorage !== 'undefined'

const resolveScopedWishlistKey = (userId = null) => {
  const normalizedUserId = normalizeId(userId)
  if (normalizedUserId) {
    return `${WISHLIST_STORAGE_PREFIX}-user-${normalizedUserId}`
  }
  return WISHLIST_STORAGE_GUEST_KEY
}

const readSessionUserId = () => {
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

const getCurrentWishlistKey = () => resolveScopedWishlistKey(readSessionUserId())

const readWishlistIdsFromKey = (storageKey) => {
  if (!canUseStorage()) return []

  try {
    const raw = localStorage.getItem(storageKey)
    if (!raw) return []

    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []

    return [...new Set(parsed.map((entry) => normalizeId(entry?.id ?? entry)).filter(Boolean))]
  } catch {
    return []
  }
}

const writeWishlistIdsToKey = (storageKey, ids) => {
  if (!canUseStorage()) return []

  const normalized = [...new Set((Array.isArray(ids) ? ids : []).map((id) => normalizeId(id)).filter(Boolean))]
  localStorage.setItem(storageKey, JSON.stringify(normalized))
  emitWishlistUpdate()
  return normalized
}

export const getWishlistIds = () => readWishlistIdsFromKey(getCurrentWishlistKey())

export const getWishlistIdsForUser = (userId) => readWishlistIdsFromKey(resolveScopedWishlistKey(userId))

export const emitWishlistUpdate = () => {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent(WISHLIST_EVENT))
}

export const setWishlistIds = (ids) => {
  return writeWishlistIdsToKey(getCurrentWishlistKey(), ids)
}

export const setWishlistIdsForUser = (userId, ids) => {
  return writeWishlistIdsToKey(resolveScopedWishlistKey(userId), ids)
}

export const isInWishlist = (id) => getWishlistIds().includes(normalizeId(id))

export const addToWishlist = (id) => {
  const current = getWishlistIds()
  const normalizedId = normalizeId(id)
  if (!normalizedId || current.includes(normalizedId)) return current
  return setWishlistIds([...current, normalizedId])
}

export const removeFromWishlist = (id) => {
  const normalizedId = normalizeId(id)
  return setWishlistIds(getWishlistIds().filter((entry) => entry !== normalizedId))
}

export const clearWishlist = () => setWishlistIds([])

export const clearGuestWishlist = () => writeWishlistIdsToKey(WISHLIST_STORAGE_GUEST_KEY, [])

export const mergeGuestWishlistIntoUser = (userId) => {
  const guestIds = getWishlistIdsForUser(null)
  const userIds = getWishlistIdsForUser(userId)
  const merged = [...new Set([...userIds, ...guestIds])]

  setWishlistIdsForUser(userId, merged)
  clearGuestWishlist()

  return merged
}

export const copyGuestWishlistToUser = (userId) => {
  const guestIds = getWishlistIdsForUser(null)
  return setWishlistIdsForUser(userId, guestIds)
}

export const toggleWishlist = (id) => {
  const normalizedId = normalizeId(id)
  if (!normalizedId) return false

  if (isInWishlist(normalizedId)) {
    removeFromWishlist(normalizedId)
    return false
  }

  addToWishlist(normalizedId)
  return true
}
