import '../all-designs/AllDesigns.css'
import './SearchResults.css'
import { useContext, useMemo, useState } from 'react'
import { FaHeart, FaPlus, FaSearch, FaTimes } from 'react-icons/fa'
import { useNavigate, useSearchParams } from 'react-router-dom'
import ProductCard from '../../components/cards/ProductCard'
import { DataContext } from '../../context/DataContext'
import { addItemToCart } from '../../utils/cart'
import {
  addRecentSearch,
  getRecentSearches,
  getMatchedProduct,
  getMatchedProductType,
  getSuggestionImage,
  removeRecentSearch,
  sanitizeSearchQuery,
  searchItems,
} from '../../utils/search'

function SearchResults() {
  const { items, loading } = useContext(DataContext)
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const query = sanitizeSearchQuery(searchParams.get('q') || '')
  const [recentSearches, setRecentSearches] = useState(() =>
    query ? addRecentSearch(query) : getRecentSearches(),
  )
  const selectedDesignId = Number(searchParams.get('design') || 0) || null
  const selectedProductType = searchParams.get('productType') || ''
  const results = useMemo(() => searchItems(items, query), [items, query])

  const selectedItem = useMemo(() => {
    if (!selectedDesignId) {
      return null
    }

    return (Array.isArray(items) ? items : []).find((item) => item.id === selectedDesignId) || null
  }, [items, selectedDesignId])

  const relatedSearches = useMemo(() => {
    if (query) {
      return results.slice(0, 4).map((item) => item.design.title)
    }

    return recentSearches
  }, [query, recentSearches, results])

  const relatedProducts = useMemo(() => {
    if (!query) {
      return []
    }

    const baseType = selectedProductType || getMatchedProductType(selectedItem || results[0], query)
    const matchingTypeResults = results.filter(
      (item) => getMatchedProductType(item, query || baseType) === baseType,
    )
    const pool = matchingTypeResults.length >= 4 ? matchingTypeResults : results

    return pool
      .filter((item) => item.id !== selectedDesignId)
      .slice(0, 8)
  }, [query, results, selectedDesignId, selectedItem, selectedProductType])

  const openProduct = (item, productType = getMatchedProductType(item, query)) => {
    const nextParams = new URLSearchParams(searchParams)
    nextParams.set('q', query || item?.design?.title || '')
    nextParams.set('design', String(item.id))
    if (productType) {
      nextParams.set('productType', productType)
    }
    setSearchParams(nextParams, { replace: true })
  }

  const closeProduct = () => {
    const nextParams = new URLSearchParams(searchParams)
    nextParams.delete('design')
    nextParams.delete('productType')
    setSearchParams(nextParams, { replace: true })
  }

  const runSearch = (nextQuery) => {
    const cleanQuery = sanitizeSearchQuery(nextQuery)
    if (!cleanQuery) {
      return
    }

    setRecentSearches(addRecentSearch(cleanQuery))
    navigate(`/search?q=${encodeURIComponent(cleanQuery)}`)
  }

  const handleRemoveRecent = (searchTerm) => {
    setRecentSearches(removeRecentSearch(searchTerm))
  }

  if (loading) {
    return <div className="spinner">Finding matching products...</div>
  }

  return (
    <main className="search-results-page">
      <section className="search-top-grid">
        <section className="search-results-hero">
          <div>
            <p className="search-results-kicker">Search</p>
            <h1>{query ? `Results for "${query}"` : 'Search the Threadless catalog'}</h1>
            <p className="search-results-copy">
              {query
                ? `${results.length} matching designs and products across the shop.`
                : 'Start from a design title, artist, tag, or product type to discover something new.'}
            </p>
          </div>
          <div className="search-results-meta">
            <FaSearch />
            <span>{query ? `${results.length} found` : 'Browse suggestions'}</span>
          </div>
        </section>

        {recentSearches.length > 0 ? (
          <section className="search-panel">
            <div className="search-panel-header">
              <div>
                <p className="search-panel-kicker">Recent Searches</p>
                <h2>Pick up where you left off</h2>
              </div>
            </div>
            <div className="recent-search-list">
              {recentSearches.map((searchTerm) => (
                <div className="recent-search-chip" key={searchTerm}>
                  <button type="button" className="recent-search-link" onClick={() => runSearch(searchTerm)}>
                    {searchTerm}
                  </button>
                  <button
                    type="button"
                    className="recent-search-remove"
                    aria-label={`Remove ${searchTerm} from recent searches`}
                    onClick={() => handleRemoveRecent(searchTerm)}
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {relatedSearches.length > 0 ? (
          <section className="search-panel search-panel-secondary">
            <div className="search-panel-header">
              <div>
                <p className="search-panel-kicker">Suggestions</p>
                <h2>{query ? 'You might also like' : 'Popular ways to explore'}</h2>
              </div>
            </div>
            <div className="related-search-list">
              {relatedSearches.map((searchTerm) => (
                <button
                  key={searchTerm}
                  type="button"
                  className="related-search-pill"
                  onClick={() => runSearch(searchTerm)}
                >
                  {searchTerm}
                </button>
              ))}
            </div>
          </section>
        ) : null}
      </section>

      {query && results.length === 0 ? (
        <section className="search-empty-state">
          <strong>No close matches yet</strong>
          <p>Try a shorter keyword, artist name, tag, or product type like hoodie, mug, or phone case.</p>
        </section>
      ) : null}

      {results.length > 0 ? (
        <section className="search-results-grid-wrap">
          <div className="card-grid">
            {results.map((item) => {
              const matchedProduct = getMatchedProduct(item, query)
              const matchedProductType = getMatchedProductType(item, query)
              const startingPrice = Math.min(
                ...(matchedProduct?.variants?.map((variant) => variant?.price).filter(Boolean) || [0]),
              )

              return (
                <article
                  key={item.id}
                  className="card search-card"
                  role="button"
                  tabIndex={0}
                  onClick={() => openProduct(item, matchedProductType)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      openProduct(item, matchedProductType)
                    }
                  }}
                >
                  <div className="card-image-wrap">
                    <img
                      className="card-image"
                      src={matchedProduct?.image || getSuggestionImage(item)}
                      alt={item.design.title}
                    />
                  </div>
                  <div className="card-meta">
                    <div className="card-copy">
                      <h3 className="cardTitle">
                        {item.design.title} <span className="cardArtist">by {item.design.artist}</span>
                      </h3>
                      {startingPrice > 0 ? <p className="cardPrice">From ${startingPrice.toFixed(2)}</p> : null}
                    </div>
                    <div className="card-actions">
                      <button
                        className="icon-button favorite-button"
                        aria-label="Add to favorites"
                        onClick={(event) => event.stopPropagation()}
                      >
                        <FaHeart />
                      </button>
                      <button
                        className="icon-button add-button"
                        aria-label="Add item to cart"
                        onClick={(event) => {
                          event.stopPropagation()
                          addItemToCart(item, { productType: matchedProductType })
                        }}
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>
      ) : null}

      {relatedProducts.length > 0 ? (
        <section className="search-results-grid-wrap related-products-section">
          <div className="search-panel search-panel-secondary">
            <div className="search-panel-header">
              <div>
                <p className="search-panel-kicker">More Like This</p>
                <h2>More {selectedProductType || getMatchedProductType(selectedItem || relatedProducts[0], query) || 'products'} you may like</h2>
              </div>
            </div>
            <div className="card-grid related-card-grid">
              {relatedProducts.map((item) => {
                const matchedProduct = getMatchedProduct(item, query)
                const matchedProductType = getMatchedProductType(item, query)
                const startingPrice = Math.min(
                  ...(matchedProduct?.variants?.map((variant) => variant?.price).filter(Boolean) || [0]),
                )

                return (
                  <article
                    key={`related-${item.id}`}
                    className="card search-card"
                    role="button"
                    tabIndex={0}
                    onClick={() => openProduct(item, matchedProductType)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault()
                        openProduct(item, matchedProductType)
                      }
                    }}
                  >
                    <div className="card-image-wrap">
                      <img
                        className="card-image"
                        src={matchedProduct?.image || getSuggestionImage(item)}
                        alt={item.design.title}
                      />
                    </div>
                    <div className="card-meta">
                      <div className="card-copy">
                        <h3 className="cardTitle">
                          {item.design.title} <span className="cardArtist">by {item.design.artist}</span>
                        </h3>
                        {startingPrice > 0 ? <p className="cardPrice">From ${startingPrice.toFixed(2)}</p> : null}
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>
      ) : null}

      {selectedItem ? (
        <ProductCard
          key={`${selectedItem.id}-${selectedProductType || 'default'}`}
          item={selectedItem}
          onClose={closeProduct}
          initialProductType={selectedProductType || getMatchedProductType(selectedItem, query)}
        />
      ) : null}
    </main>
  )
}

export default SearchResults
