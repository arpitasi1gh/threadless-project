import CatalogPage from '../catalog/CatalogPage'

const KEYWORDS = [
  'minimalist',
  'mid-century-modern',
  'typography',
  'vector-art',
  'graphic-design',
]

export default function Minimalist_Modern() {
  return <CatalogPage designKeywords={KEYWORDS} cardImageSource="design" />
}
