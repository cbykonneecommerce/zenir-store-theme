import React, { useEffect } from 'react';

interface TramontinaContentProps {
  partnerId: string | any;
  refCode: string | any;
}
const TramontinaContent: React.FC<TramontinaContentProps>
 = ({ partnerId, refCode }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://ce.tramontina.com/dist/tramontina-content.js";
    script.async = true;
    document.head.appendChild(script);

    const tramontinaContent = document.createElement('tramontina-content');
    tramontinaContent.setAttribute('data-id', partnerId);
    tramontinaContent.setAttribute('data-ref-code', refCode);

    const rootElement = document.getElementById('tramontina-script');
    if (rootElement) {
      rootElement.appendChild(tramontinaContent);
    }
    
  }, [partnerId, refCode]);

  return null; 
};

export default TramontinaContent;
