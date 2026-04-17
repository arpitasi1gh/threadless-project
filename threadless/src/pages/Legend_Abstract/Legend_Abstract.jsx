import CatalogPage from '../catalog/CatalogPage'

const KEYWORDS = [
  'abstract',
  'surreal',
  'fantasy',
  'mythical',
  'dragons',
  'monsters',
  'anatomy',
  'japanese-style',
]

export default function Legend_Abstract() {
  return <CatalogPage designKeywords={KEYWORDS} cardImageSource="design" />
}
