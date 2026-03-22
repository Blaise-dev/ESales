const WISHLIST_STORAGE_KEY = 'esales-wishlist'
export const WISHLIST_EVENT = 'esales-wishlist-updated'

const normalizeId = (value) => String(value ?? '').trim()

const canUseStorage = () => typeof window !== 'undefined' && typeof localStorage !== 'undefined'

export const getWishlistIds = () => {
  if (!canUseStorage()) return []

  try {
    const raw = localStorage.getItem(WISHLIST_STORAGE_KEY)
    if (!raw) return []

    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []

    return [...new Set(parsed.map((entry) => normalizeId(entry?.id ?? entry)).filter(Boolean))]
  } catch {
    return []
  }
}

export const emitWishlistUpdate = () => {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent(WISHLIST_EVENT))
}

export const setWishlistIds = (ids) => {
  if (!canUseStorage()) return []

  const normalized = [...new Set((Array.isArray(ids) ? ids : []).map((id) => normalizeId(id)).filter(Boolean))]
  localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(normalized))
  emitWishlistUpdate()
  return normalized
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
