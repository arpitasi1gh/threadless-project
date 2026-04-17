import CatalogPage from '../catalog/CatalogPage'

const DISCLAIMER =
  '* Savings percentage and strikethrough pricing based on comparison to regular prices of the same items at full-price in Artist Shops or third party retail locations and may vary over time.'

export default function AllDesigns() {
  return <CatalogPage disclaimer={DISCLAIMER} />
}
