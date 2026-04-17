export function normalizeToken(value) {
  return String(value ?? '')
    .toLowerCase()
    .replace(/[\s_-]+/g, '')
    .replace(/[^a-z0-9]/g, '')
}

export function findProductIndexByType(products, desiredType) {
  const desired = normalizeToken(desiredType)
  if (!desired) return -1
  const list = Array.isArray(products) ? products : []
  return list.findIndex((product) => normalizeToken(product?.type) === desired)
}

export function findProductByType(item, desiredType) {
  const products = item?.products ?? []
  const index = findProductIndexByType(products, desiredType)
  return index >= 0 ? products[index] : products?.[0] ?? null
}

export function hasProductType(item, desiredType) {
  const desired = normalizeToken(desiredType)
  if (!desired) return true
  const products = Array.isArray(item?.products) ? item.products : []
  return products.some((product) => normalizeToken(product?.type) === desired)
}

export function matchesDesignKeywords(design, keywords) {
  const list = Array.isArray(keywords) ? keywords : []
  if (list.length === 0) return true

  const haystack = [
    ...(Array.isArray(design?.type) ? design.type : []),
    ...(Array.isArray(design?.subType) ? design.subType : []),
    ...(Array.isArray(design?.tags) ? design.tags : [])
  ].map(normalizeToken)

  return list.some((keyword) => {
    const needle = normalizeToken(keyword)
    if (!needle) return false
    return haystack.includes(needle)
  })
}

