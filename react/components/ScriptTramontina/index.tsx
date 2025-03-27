import React from "react";
import { useProduct } from "vtex.product-context";

import TramontinaContent from "./components/TramontinaContent";

const ScriptTramontina = () => {
  const product = useProduct()
  const partnerId = 193;
  const refCode = product?.selectedItem?.ean

  return (
    <div id="tramontina-script">
      <TramontinaContent partnerId={partnerId} refCode={refCode} />
    </div>
  );
};

export default ScriptTramontina;

