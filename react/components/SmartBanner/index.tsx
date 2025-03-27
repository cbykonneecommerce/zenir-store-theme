import React, { useState } from "react";
import "./SmartBanner.css";
import { useCssHandles } from "vtex.css-handles";
import { Helmet, canUseDOM } from "vtex.render-runtime";
import { Image } from "vtex.store-image";

import { isSafari, isWebView } from "./utils/device";
import { getCookie, setCookie } from "./utils/cookies";
import { SMART_BANNER_DEFAULT_PROPS, schemaSmartBanner } from "./schema";
import type { SmartBannerProps } from "./typings";
import { useDevice } from "vtex.device-detector";

const CSS_HANDLES = [
  "smartBanner__infoPromotion",
  "smartBanner__infoDescountRedMobile",
  "smartBanner",
  "smartBanner__closeButton",
  "smartBanner__image",
  "smartBanner__textContent",
  "smartBanner__title",
  "smartBanner__subtitle",
  "smartBanner__callToActionButton",
  "smartBanner__infoDescountRed",
] as const;

const SmartBanner: StorefrontFunctionComponent<SmartBannerProps> = ({
  iOSAppID,
  iOSAppUrl,
  androidAppUrl,
  imageUrl,
  title,
  subtitle,
  callToActionButtonText,
}) => {
  const { handles } = useCssHandles(CSS_HANDLES);
  const smartBannerCookieName = "smart-banner";
  const hasSmartBannerCookie = Boolean(getCookie(smartBannerCookieName));
  const [isClosed, setIsClosed] = useState(hasSmartBannerCookie);
  const { isMobile } = useDevice();

  const handleCloseButtonClick = () => {
    setIsClosed(true);

    setCookie({
      name: smartBannerCookieName,
      value: "closed",
      expires: { seconds: 30 },
    });
  };

  const handleCallToActionButtonClick = () => {
    const url = isSafari() ? iOSAppUrl : androidAppUrl;

    window?.open(url, "_blank");

    setIsClosed(true);

    setCookie({
      name: smartBannerCookieName,
      value: "closed",
      expires: { seconds: 30 },
    });
  };

  if (!canUseDOM) {
    return null;
  }

  const { isWebView: platform } = isWebView();

  if (platform === "IOS") {
    return (
      <Helmet>
        <meta name="apple-itunes-app" content={`app-id=${iOSAppID}`} />
      </Helmet>
    );
  }

  if (hasSmartBannerCookie || isClosed) {
    return null;
  }

  return (
    <>
      {isMobile && (
        <section className={handles.smartBanner__infoPromotion}>
          <div className={handles.smartBanner__infoDescountRedMobile}>
            <span>
              Baixe o app e ganhe <strong>10% de desconto*</strong>
            </span>
          </div>
        </section>
      )}

      <section className={handles.smartBanner}>
        <button
          className={handles.smartBanner__closeButton}
          onClick={handleCloseButtonClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
          >
            <path
              d="M9 1L1 9M1 1L9 9"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div className={handles.smartBanner__image}>
          <Image
            src={imageUrl}
            alt={title}
            width={56}
            height={56}
            loading="lazy"
            preload
          />
        </div>
        <div className={handles.smartBanner__textContent}>
          <h2 className={handles.smartBanner__title}>{title}</h2>
          <p className={handles.smartBanner__subtitle}>{subtitle}</p>
        </div>

        {!isMobile && (
          <div className={handles.smartBanner__infoDescountRed}>
            <span>
              Baixe o app e ganhe <strong>10% de desconto*</strong>
            </span>
            <p>*Somente nos produtos sem promoção. Desconto não acumulativo</p>
          </div>
        )}

        <button
          className={handles.smartBanner__callToActionButton}
          onClick={handleCallToActionButtonClick}
        >
          {isMobile ? (
            <p>{callToActionButtonText}</p>
          ) : (
            <p>
              Baixe agora e aproveite!{" "}
              <img
                src={
                  "https://tfcvih.vtexassets.com/assets/vtex.file-manager-graphql/images/d89e55c0-4d5b-42ea-ab72-0611e96cc569___e6fda868700a3836c81d6d8b4be6d793.svg"
                }
                alt="Icone do botão de baixar o app"
              />{" "}
            </p>
          )}
        </button>
      </section>
    </>
  );
};

SmartBanner.defaultProps = SMART_BANNER_DEFAULT_PROPS;
SmartBanner.schema = schemaSmartBanner;

export default SmartBanner;
