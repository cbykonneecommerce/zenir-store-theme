import React, { useEffect, useState } from 'react';
import { useProduct } from "vtex.product-context";
import type { ProductContextState } from 'vtex.product-context/react/ProductContextProvider'
import type { Seller } from 'vtex.product-context/react/ProductTypes'
import { useCssHandles } from 'vtex.css-handles';

import './ProductPromotion.css';

const CSS_HANDLES = [
  'promotionPix',

] as const;

const ProductPromotion = () => {
  const { handles } = useCssHandles(CSS_HANDLES);
  const { selectedItem } = useProduct() as ProductContextState
  const [{ commertialOffer }] = selectedItem?.sellers as Seller[]

  const [promotion, setPromotion] = useState<any | null>(null)
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchPromotion = async () => {
      try {
        setLoading(true);

        const response = await fetch('/api/dataentities/NP/search?_fields=namePromotion')

        if (!response.ok) {
          throw new Error('Erro na requisição');
        }

        const dadosPromotion = await response.json();

        setPromotion(dadosPromotion[0]);
      } catch (err) {
        console.log('Erro na requisição', err);
      } finally {
        setLoading(false);
      }
    }

    fetchPromotion()
  }, [])

  const namePromotion = promotion?.namePromotion
  const descountPix = commertialOffer.teasers.map(item => item.name)
  const descountPixFormated = descountPix.toString()

  if(descountPixFormated === namePromotion) {
    return (
      <div>
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <p className={`${handles.promotionPix}`}>
            {namePromotion}
          </p>
        )}
      </div>
    ) 
  }

  return (
    <div></div>
  )
}

export default ProductPromotion