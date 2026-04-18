import './Pagination.css'

const buildPageModel = (page, pageCount) => {
  if (pageCount <= 7) {
    return Array.from({ length: pageCount }, (_, idx) => idx + 1)
  }

  const clamped = Math.min(pageCount, Math.max(1, page))
  const set = new Set([1, 2, pageCount - 1, pageCount, clamped - 1, clamped, clamped + 1])
  const sorted = [...set].filter((p) => p >= 1 && p <= pageCount).sort((a, b) => a - b)

  const model = []
  for (let i = 0; i < sorted.length; i += 1) {
    const current = sorted[i]
    const prev = sorted[i - 1]
    if (prev != null && current - prev > 1) {
      model.push('…')
    }
    model.push(current)
  }

  return model
}

export default function Pagination({ page, pageCount, onPageChange }) {
  if (pageCount <= 1) return null

  const clamped = Math.min(pageCount, Math.max(1, page))
  const pages = buildPageModel(clamped, pageCount)

  return (
    <nav className="pagination" aria-label="Pagination">
      <button
        type="button"
        className="pagination-btn"
        onClick={() => onPageChange(Math.max(1, clamped - 1))}
        disabled={clamped === 1}
      >
        Prev
      </button>

      <div className="pagination-pages" role="list">
        {pages.map((entry, idx) => {
          if (entry === '…') {
            return (
              <span key={`ellipsis-${idx}`} className="pagination-ellipsis" aria-hidden="true">
                …
              </span>
            )
          }

          const pageNumber = entry
          const isActive = pageNumber === clamped
          return (
            <button
              key={pageNumber}
              type="button"
              className={`pagination-page ${isActive ? 'is-active' : ''}`}
              aria-current={isActive ? 'page' : undefined}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          )
        })}
      </div>

      <button
        type="button"
        className="pagination-btn"
        onClick={() => onPageChange(Math.min(pageCount, clamped + 1))}
        disabled={clamped === pageCount}
      >
        Next
      </button>
    </nav>
  )
}

