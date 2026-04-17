import CatalogPage from '../catalog/CatalogPage'

const KEYWORDS = [
  'pop-art',
  'digital-art',
  'graphic-art',
  'gaming',
  'anime',
  'pixel-art',
  'cartoon',
  'rainbow',
]

export default function Urban_Streetart() {
  return <CatalogPage designKeywords={KEYWORDS} cardImageSource="design" />
}

