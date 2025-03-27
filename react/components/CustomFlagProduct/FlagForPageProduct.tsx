import { useEffect } from 'react'
import type { ProductContextState } from 'vtex.product-context/react/ProductContextProvider'
import { useProduct } from 'vtex.product-context'

export default function FlagForPageProduct() {
  const { product } = useProduct() as ProductContextState
  const productClusters = product?.productClusters?.map((item: any) => item.name) || []

  const hiddenCollections = productClusters.filter((name) => name.endsWith('-zz'))

  useEffect(() => {
    hiddenCollections.forEach((collection) => {
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
