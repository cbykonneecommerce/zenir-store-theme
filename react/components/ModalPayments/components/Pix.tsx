import React from 'react'
import { useProduct } from 'vtex.product-context'
import { useCssHandles } from "vtex.css-handles";
import { formatPrice } from '../../ShippingCalculator/utils/formatPrice';

const Pix = () => {
  const product = useProduct()
  const sellingPrice = Number(product?.selectedItem?.sellers[0].commertialOffer?.Price)

    const CSS_HANDLES = [
    "containerPix",
    "pixPrice",
    "pixPriceText",
    "textContentPix",
    "imageContentPix"
  ]
  const { handles } = useCssHandles(CSS_HANDLES);

  return (
    <div className={handles.containerPix}>
      <span  className={handles.pixPrice}>{formatPrice(sellingPrice)} 
      <p className={handles.pixPriceText}>No Pix</p></span>
      <span  className={handles.textContentPix}>
        O pagamento é instantâneo e só pode ser à vista. Na etapa de finalização da compra, a gente explica direitinho como pagar com Pix.
      </span>
      <img className={handles.imageContentPix} src="/arquivos/image-pix.png" alt="image-pix" />
    </div>
  )
}

export default Pix