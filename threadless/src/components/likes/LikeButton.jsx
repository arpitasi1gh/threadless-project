import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { useLikes } from '../../hooks/useLikes'

/**
 * @param {object} props
 * @param {number} props.designId
 * @param {string} props.productType — e.g. T-Shirt, mug; must match the row being liked
 * @param {'card' | 'circle'} [props.variant='card']
 * @param {string} [props.className]
 */
export default function LikeButton({ designId, productType, variant = 'card', className = '' }) {
  const { isLiked, toggleLike } = useLikes()
  const liked = isLiked(designId, productType)

  const baseClass =
    variant === 'circle'
      ? `product-circle-button favorite${liked ? ' is-liked' : ''}`
      : `icon-button favorite-button${liked ? ' is-liked' : ''}`

  return (
    <button
      type="button"
      className={`${baseClass} ${className}`.trim()}
      aria-label={liked ? 'Remove from favorites' : 'Add to favorites'}
      aria-pressed={liked}
      onClick={(event) => {
        event.stopPropagation()
        toggleLike(designId, productType)
      }}
    >
      {liked ? <FaHeart /> : <FaRegHeart />}
    </button>
  )
}
