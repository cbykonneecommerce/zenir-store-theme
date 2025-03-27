import React from 'react'
import { useProduct } from 'vtex.product-context'
import { useCssHandles } from "vtex.css-handles";
import { formatPrice } from '../../ShippingCalculator/utils/formatPrice';

const CaixaTem = () => {
  const product = useProduct()
  const sellingPrice = Number(product?.selectedItem?.sellers[0].commertialOffer?.Price)

    const CSS_HANDLES = [
    "containerCaixaTem",
    "caixaTemPrice",
    "caixaTemPriceText",
    "textContentCaixaTem",
    "imageContentCaixaTem"
  ]
  const { handles } = useCssHandles(CSS_HANDLES);

  return (
    <div className={handles.containerCaixaTem}>
      <span  className={handles.caixaTemPrice}>{formatPrice(sellingPrice)} 
      <p className={handles.caixaTemPriceText}>No CaixaTem</p></span>
      <span  className={handles.textContentCaixaTem}>
        O pagamento é instantâneo e só pode ser à vista. Na etapa de finalização da compra, a gente explica direitinho como pagar com CaixaTem.
      </span>
     
    </div>
  )
}

export default CaixaTem