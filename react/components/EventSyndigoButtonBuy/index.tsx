import React from 'react';
import type { ProductContextState } from 'vtex.product-context/react/ProductContextProvider'
import { useProduct } from 'vtex.product-context';

declare global {
  interface Window {
    SYNDI: any
  }
}

const EventSyndigoButtonBuy = () => {
  const { product, buyButton: { clicked } } = useProduct() as ProductContextState
  const infoSku = product?.items[0].itemId
  const infoPrice = product?.priceRange.listPrice.lowPrice
  
  
  const handlePixelEvent = () => {
    window.SYNDI = window.SYNDI || [];
    window.SYNDI.push({
      "type": "track",
      "event": "addToCart",
      qty:1,
      sku: {infoSku},
      price: {infoPrice},
      "customParam":"foobar"
    })
  }

  if (clicked === true) {
    handlePixelEvent()
  }

  return <></>
};

export default EventSyndigoButtonBuy;
