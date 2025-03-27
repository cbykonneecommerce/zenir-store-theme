import React from "react";
import ImageRotator from "./components/ImageRotator";
import { useCssHandles } from "vtex.css-handles";
import { Link } from "vtex.render-runtime";

import "./CustomPageNotFound.css";
import { Image } from "vtex.store-image";

const CSS_HANDLES = [
  "notFoundContentGeneral",
  "notFoundContent",
  "notFoundIconAndInfo",
  "notFoundIconSearch",
  "notFoundTextTitleLink",
  "notFoundLinkStores",
  "notFoundLinkBackToHome",
  "notFoundTextInfo",
  "notFoundContentImages",
];

const CustomPageNotFound = () => {
  const { handles } = useCssHandles(CSS_HANDLES);

  return (
    <section className={handles.notFoundContentGeneral}>
      <div className={handles.notFoundContent}>
        <div className={handles.notFoundIconAndInfo}>
          <div className={handles.notFoundIconSearch}>
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_89_1021)">
                <path
                  d="M35.3653 35.3606C35.0809 35.6451 34.7205 35.7778 34.3602 35.7778C33.9998 35.7778 33.6395 35.6451 33.355 35.3606L25.0671 27.0738C25.8067 26.467 26.4705 25.8033 27.0774 25.0637L35.3653 33.3505C35.9153 33.9005 35.9153 34.8107 35.3653 35.3606Z"
                  fill="#515151"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M30.567 15.3926C30.567 23.771 23.7741 30.563 15.3946 30.563C7.01514 30.563 0.222229 23.771 0.222229 15.3926C0.222229 7.01424 7.01514 0.222229 15.3946 0.222229C23.7741 0.222229 30.567 7.01424 30.567 15.3926ZM26.7739 15.3926C26.7739 21.6764 21.6792 26.7704 15.3946 26.7704C9.10995 26.7704 4.01526 21.6764 4.01526 15.3926C4.01526 9.10881 9.10995 4.0148 15.3946 4.0148C21.6792 4.0148 26.7739 9.10881 26.7739 15.3926Z"
                  fill="#515151"
                />
              </g>
              <defs>
                <clipPath id="clip0_89_1021">
                  <rect
                    width="35.5556"
                    height="35.5556"
                    fill="white"
                    transform="translate(0.222229 0.222229)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>

          <div className={handles.notFoundTextTitleLink}>
            <h1>Vish, não encontramos o que você procura.</h1>
            <p>
              No momento, o item que você procura pode estar fora de estoque ou
              disponível apenas em <Link className={handles.notFoundLinkStores} to="/stores">nossas lojas físicas.</Link>
            </p>
            <Link className={handles.notFoundLinkBackToHome} to="/">
              Voltar para a Home
              <Image
                src={
                  "https://tfcvih.vtexassets.com/assets/vtex.file-manager-graphql/images/f27c6eee-5c8c-4991-8557-e5d1db4cb80b___7e688e0fed0e08276a28da58b5ea1f98.png"
                }
                alt="icone botão home"
              />
            </Link>
          </div>

          <div className={handles.notFoundTextInfo}>
            <Image
              src={
                "https://tfcvih.vtexassets.com/assets/vtex.file-manager-graphql/images/915abf1d-8b4c-4744-b448-1a941ad84137___5eab6402b2a8ab6abc7ae4982ca355d6.png"
              }
              alt="Icone de seta com informação"
            />
            <p>
              <strong>Utilize a caixa de busca no topo da página</strong> ou
              veja abaixo como podemos te ajudar a encontrar o que você procura
              em nosso site💙
            </p>
          </div>
        </div>

        <div className={handles.notFoundContentImages}>
          <ImageRotator />
        </div>
      </div>
    </section>
  );
};

export default CustomPageNotFound;
