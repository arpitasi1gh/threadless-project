import CatalogPage from '../catalog/CatalogPage'

const KEYWORDS = [
  'humor',
  'memes',
  'quirky',
  'modern-life',
  'office-culture',
  'food',
  'coffee',
]

export default function Daily_Satire() {
  return <CatalogPage designKeywords={KEYWORDS} cardImageSource="design" />
}
