import React from "react";
import { useCssHandles } from "vtex.css-handles";
import type { ProductContextState } from "vtex.product-context/react/ProductContextProvider";
import { useProduct } from "vtex.product-context";

import "./CodeRefIdProduct.css"

const CSS_HANDLES = ["codeRefIdProduct", "codeRefIdProductText"] as const;

const CodeRefIdProduct = () => {
  const { handles } = useCssHandles(CSS_HANDLES);

  const { product } = useProduct() as ProductContextState;
  const infoCodeRefId = product?.productReference;

  return (
    <div className={handles.codeRefIdProduct}>
      <span className={handles.codeRefIdProductText}>
        <strong>Código:</strong> {infoCodeRefId}
      </span>
    </div>
  );
};

export default CodeRefIdProduct;
