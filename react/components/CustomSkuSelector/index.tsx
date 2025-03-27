import React, { useState, useContext, useEffect } from "react";
import { useCssHandles } from "vtex.css-handles";
import { ProductContext, ProductTypes } from "vtex.product-context";
import { Link } from "vtex.render-runtime";

import "./CustomSkuSelector.css"

interface SimilarProduct {
  productId: string;
  link: string;
  items: Item[];
}

interface Item {
  images: {
    imageUrl: string;
  }[];
}

const CSS_HANDLES = [
  "CustomSkuSelector", 
  "CustomSkuSelectorImage",
  "CustomSkuSelectorDiv"
] as const;

const CustomSkuSelector = () => {
  const { handles } = useCssHandles(CSS_HANDLES);

  const { product } = useContext(
    ProductContext
  ) as ProductTypes.ProductContextState;

  const productId = product?.productId;

  const [data, setData] = useState<SimilarProduct[]>([]);

  const url = `/api/catalog_system/pub/products/crossselling/similars/${productId}`;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const jsonData = await response.json();

        setData(jsonData);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData();
  }, [url]);

  return (
    <>
      {data.length > 0 && (
        <div className={handles.CustomSkuSelector}>
          <span>Variações:</span>
          <div className={handles.CustomSkuSelectorDiv}>
            {data.map((similarProduct) => (
                <Link key={similarProduct.productId} to={similarProduct.link}>
                {similarProduct.items.map((item, itemIndex) => (
                  <>
                    <img
                      className={handles.CustomSkuSelectorImage}
                      key={itemIndex}
                      src={item.images[0].imageUrl}
                      alt="Imagem do sku"
                    />
                  </>
                ))}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default CustomSkuSelector;
