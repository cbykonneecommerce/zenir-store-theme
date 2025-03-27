import React, { useEffect, useState } from "react";
import { applyModifiers, useCssHandles } from "vtex.css-handles";
import { Button } from "vtex.styleguide";
// @ts-ignore

import "./ModalCookies.css";

const CSS_HANDLES = [
  "modalCookiesContainer",
  "modalCookiesContainerWrapper",
  "modalCookiesContainerWrapperButtons",
  "modalCookiesCloseButton",
];

const LOCAL_STORAGE_KEY = "cookie-modal-zenir";

export default function ModalCookies() {
  const [isActive, setActive] = useState(false);

  const { handles } = useCssHandles(CSS_HANDLES);

  const changeViewport = () => {
    const metaViewport = document.head.querySelector(
      "[name~=viewport][content]"
    );

    metaViewport?.setAttribute(
      "content",
      "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
    );
  };

  const checkSearchTitle = () => {
    const searchTitle = document.querySelector(
      ".vtex-search-result-3-x-galleryTitle--layout"
    );

    if (searchTitle) {
      const titleText = searchTitle.textContent?.trim();

      if (
        titleText &&
        (titleText === "Super Quarta de Cinzas" || /^clock-/.test(titleText))
      ) {
        searchTitle.remove();
      }
    }
  };

  useEffect(() => {
    changeViewport();

    setTimeout(() => {
      const isActiveOnLocalstorage = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_KEY) ?? "{}"
      );

      if (!isActiveOnLocalstorage?.aceito) {
        setActive(true);
      }

      checkSearchTitle();
    }, 2000);
  }, []);

  if (!isActive) {
    return <div />;
  }

  const handleAccept = () => {
    setActive(false);
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({ aceito: true, data: new Date().toLocaleString("pt-br") })
    );
  };

  return (
    <div
      className={applyModifiers(
        handles.modalCookiesContainer,
        isActive ? "active" : "inactive"
      )}
    >
      <div className={handles.modalCookiesContainerWrapper}>
        <h4>Controle sua privacidade</h4>
        <p>Nosso site usa cookies para melhorar sua navegação</p>
      </div>
      <span
        onClick={() => setActive(false)}
        className={handles.modalCookiesCloseButton}
      >
        X
      </span>
      <a href="/institucional/privacidade">Politicas de privacidade</a>
      <div className={handles.modalCookiesContainerWrapperButtons}>
        <Button
          onClick={() => {
            window.location.href = "/institucional/privacidade";
          }}
        >
          Minhas opções
        </Button>
        <Button onClick={handleAccept}>Aceito cookies</Button>
      </div>
    </div>
  );
}
