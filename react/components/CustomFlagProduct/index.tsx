import { useEffect } from 'react'
import { ProductSummaryContext } from 'vtex.product-summary-context'

export default function CustomFlagProduct() {
  const { product } = ProductSummaryContext.useProductSummary()
  const isNameColection = product.productClusters.map((item: any) => item.name)

  const hiddenCollections = isNameColection.filter((name: any) => name.endsWith('-zz'))

  useEffect(() => {
    hiddenCollections.forEach((collection: any) => {
      const elements = document.querySelectorAll(`.vtex-product-highlights-2-x-productHighlightText`)
      elements.forEach((element: any) => {
        if (element.textContent === collection) {
          element.style.display = 'none'
        }
      })
    })
  }, [hiddenCollections])

  return null
}
