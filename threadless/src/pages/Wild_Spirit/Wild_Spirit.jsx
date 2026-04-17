import CatalogPage from '../catalog/CatalogPage'

const KEYWORDS = [
  'nature',
  'wildlife',
  'adventure',
  'animals',
  'birds',
  'floral',
  'seasonal',
  'winter',
]

export default function Wild_Spirit() {
  return <CatalogPage designKeywords={KEYWORDS} cardImageSource="design" />
}
