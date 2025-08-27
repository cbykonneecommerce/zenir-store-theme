/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-shadow */
import React from "react";
import { useQuery } from "react-apollo";
import { useDevice } from "vtex.device-detector";
import { Helmet } from "vtex.render-runtime";
import { SliderLayout, SliderLayoutGroup } from "vtex.slider-layout";
import { Spinner } from "vtex.styleguide";

import searchResult from "../../graphql/search-result.graphql";
import { Wrapper } from "./BuyButtomCustom/Wrapper";
import Header from "./Header";
import "./global.css";
import type { Product } from "./interface";

interface CustomLpProps {
  blockClass: string;
  slider: Slider[];
  bgimage: string;
  collectionId: string;
  backgroundColor: string;
  color: string;
  header: HeaderProps;
  buyButton: IWrapper;
  corFonteProfile: string;
  corFundoProfile: string;
  priceColor: string;
  extraCssAndJs: string;
  title: string;
}

type IWrapper = {
  textButtom: string;
  backgroundColor: string;
  color: string;
};

type HeaderProps = {
  logoSocio: string;
  logoZenir: string;
  backgroundColor: string;
  blockClass: string;
};

interface Slider {
  images: string;
  imagesMobile: string;
}

const Head: any = Helmet;

const CustomLp: StorefrontFunctionComponent<CustomLpProps> = ({
  blockClass,
  slider,
  bgimage,
  collectionId,
  header,
  color,
  backgroundColor,
  buyButton,
  corFonteProfile,
  corFundoProfile,
  priceColor,
  extraCssAndJs,
  title,
}) => {
  const { data, loading: loadGraph } = useQuery(searchResult, {
    variables: {
      collectionId,
    },
  });

  const swiperSlides = slider?.map((slide, index) => (
    <SliderLayoutGroup key={index}>
      <img src={slide.images} alt={`Slide ${index}`} />
    </SliderLayoutGroup>
  ));

  const swiperSlidesMobile = slider?.map((slide, index) => (
    <SliderLayoutGroup key={index}>
      <img src={slide.imagesMobile} alt={`Slide ${index}`} />
    </SliderLayoutGroup>
  ));

  const { isMobile } = useDevice();

  const backgroundImageUrl = bgimage || null;

  if (loadGraph) {
    return (
      <div
        className="vtex-loading"
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          width: "100vw",
          height: "100vh",
        }}
      >
        <Spinner />
      </div>
    );
  }

  const cards = data?.products?.map((product: Product) => {
    const [
      {
        commertialOffer: { Price },
      },
    ] = product.items[0].sellers;

    const percentage = product.categoryTree.some(
      (category) => String(category.id) === "8"
    )
      ? 85
      : 90;

    const finalPrice = (Price / 100) * percentage;

    const card = (
      <div
        style={{ backgroundColor }}
        className="product"
        key={product?.productId}
      >
        <div className="product-img">
          <img
            src={product?.items[0].images[0].imageUrl}
            alt={product.productName}
          />
        </div>
        <span className="product-name" style={{ color }}>
          {product?.productName.length > 45
            ? `${product?.productName.substring(0, 40)}...`
            : product?.productName}
        </span>
        <span className="product-description" style={{ color }}>
          {product?.description.length > 60
            ? `${product?.description
                .substring(0, 60)
                .replace(/<p>/gi, "")
                .replace(/<br>/gi, "")
                .replace(/<\/p>/gi, "")}...`
            : product?.description.replace(/<p>/gi, "").replace(/<\/p>/gi, "")}
        </span>

        <span className="product-price" style={{ color: priceColor }}>
          <div className="one">R$</div>
          <div className="two">
            {finalPrice?.toLocaleString("pt-BR", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </div>
          <div className="tree">
            {finalPrice
              ?.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
              .slice(-2)}
          </div>
        </span>
        <Wrapper
          textButtom={buyButton?.textButtom}
          data={product}
          backgroundColor={buyButton?.backgroundColor}
          color={buyButton?.color}
        />
      </div>
    );

    return card;
  });

  return (
    <>
      <Head>
        <title>{title}</title>
        <style>{extraCssAndJs}</style>
      </Head>
      <Header
        blockClass={header?.blockClass}
        logoSocio={header?.logoSocio}
        logoZenir={header?.logoZenir}
        backgroundColor={header?.backgroundColor}
        profileBg={corFundoProfile}
        profileFontColor={corFonteProfile}
      />
      <div
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          backgroundRepeat: "repeat",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
        className={`${blockClass} custom-lp`}
      >
        <div className="container">
          <SliderLayout
            itemsPerPage={{ desktop: 1 }}
            showNavigationArrows="never"
            showPaginationDots="always"
            infinite
            autoplay={{
              timeout: 5000,
              stopOnHover: true,
            }}
          >
            {isMobile ? swiperSlidesMobile : swiperSlides}
          </SliderLayout>
          <div className="products">
            <div
              className="products-container"
              style={{
                overflow: "hidden",
              }}
            >
              {cards}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

CustomLp.schema = {
  title: "Custom LP",
  description: "Landing Pages dos times",
  type: "object",
  properties: {
    title: {
      title: "Titulo da págnina",
      type: "string",
      default: "",
    },
    slider: {
      type: "array",
      items: {
        type: "object",
        properties: {
          images: {
            title: "Slider Banners",
            type: "string",
            default: "",
            widget: {
              "ui:widget": "image-uploader",
            },
          },
          imagesMobile: {
            title: "Slider Banners - Mobile",
            type: "string",
            default: "",
            widget: {
              "ui:widget": "image-uploader",
            },
          },
        },
      },
    },
    bgimage: {
      title: "Background da Landing Page",
      type: "string",
      default: "",
      widget: {
        "ui:widget": "image-uploader",
      },
    },
    extraCssAndJs: {
      title: "CSS e JS da página",
      type: "string",
      default: "body {}",
      widget: {
        "ui:widget": "textarea",
      },
    },
    collectionId: {
      title: "Id das Colecoes",
      type: "string",
    },
    backgroundColor: {
      title: "Cor do card de produto",
      type: "string",
    },
    color: {
      title: "Cor da fonte",
      type: "string",
    },
    priceColor: {
      title: "Cor do preço",
      type: "string",
      default: "#fff",
    },
    buyButton: {
      title: "Botao de comprar",
      description: "",
      type: "object",
      properties: {
        textButtom: {
          title: "Texto botão",
          type: "string",
          default: "Aproveite",
        },
        backgroundColor: {
          title: "Cor do botão",
          type: "string",
        },
        color: {
          title: "Cor da fonte do botão",
          type: "string",
        },
      },
    },
    corFundoProfile: {
      title: "Cor de fundo - profile",
      type: "string",
    },
    corFonteProfile: {
      title: "Cor de fonte - profile",
      type: "string",
    },

    header: {
      title: "Header Custom LP",
      description: "Header da Landing Pages dos times",
      type: "object",
      properties: {
        logoSocio: {
          title: "Logo Socio Torcedor",
          type: "string",
          default: "",
          widget: {
            "ui:widget": "image-uploader",
          },
        },
        logoZenir: {
          title: "Logo Zenir",
          type: "string",
          default: "",
          widget: {
            "ui:widget": "image-uploader",
          },
        },
        backgroundColor: {
          title: "Background Color do Header",
          type: "string",
          default: "#fff",
        },
      },
    },
  },
};

export default CustomLp;
