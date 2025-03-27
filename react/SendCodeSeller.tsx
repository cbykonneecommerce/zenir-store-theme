import React, { useEffect } from "react";

const CODIGO_VENDEDOR_kEY = "sellerCode";

const SendCodeSeller = () => {
  useEffect(() => {
    const extractAlphanumericFromURL = (url: any) => {
      const regex = /[a-zA-Z0-9]+/g;
      const alphanumeric = url.match(regex);
      return alphanumeric;
    };

    const urlParams = new URLSearchParams(window.location.search);
    if (
      urlParams.has('utm_source') &&
      urlParams.has('utm_ipart')
    ) {
      const utmSource = urlParams.get('utm_source');
      const utmIpart = urlParams.get('utm_ipart');

      const sourceAlphanumeric = extractAlphanumericFromURL(utmSource);
      const ipartAlphanumeric = extractAlphanumericFromURL(utmIpart);

      if (sourceAlphanumeric && ipartAlphanumeric) {
        localStorage.setItem(CODIGO_VENDEDOR_kEY, sourceAlphanumeric);
      }
    }
  }, []);

  return <></>;
};

export default SendCodeSeller;

