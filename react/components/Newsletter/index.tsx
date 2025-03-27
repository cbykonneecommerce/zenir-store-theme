// import React from 'react'
import React, { useContext } from "react";
import { ToastContext } from "vtex.styleguide";

import "./Newsletter.css";

const Newsletter = () => {
  const { showToast }: any = useContext(ToastContext);
  const toastTimer = 10000;
  const url = "/api/dataentities/NL/";
  const headersOptions: any = {
    "Content-Type": "application/json",
    Accept: "application/vnd.vtex.ds.v10+json",
  };

  const sendData = (name: string, email: string) => {
    fetch(`${url}/documents`, {
      method: "POST",
      headers: headersOptions,
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    })
      .then(() => {
        setTimeout(() => {
          showToast({
            message: "Seu Dados foram cadastrado com sucesso",
            duration: toastTimer,
            type: "error",
          });
          document
            .querySelectorAll(".vtex-toast")[0]
            .classList.add("vtex-toast-success");
        }, 100);
      })
      .catch((error) => console.error(error));
  };

  const verifyEmail = (name: string, email: string) => {
    fetch(`${url}search?_where=email=${email}&_fields=email&a=tfcvih`, {
      method: "GET",
      headers: headersOptions,
    })
      .then((response) => {
        return response.json();
      })
      .then((data: any) => {
        if (data.length !== 0) {
          showToast({
            message: "Seu email já foi cadastrado",
            duration: toastTimer,
            type: "error",
          });
        } else {
          sendData(name, email);
        }
      });
  };

  const cleanInputs = (inputName: any, inputEmail: any) => {
    inputEmail.value = "";
    inputName.value = "";
  };

  const handleEvent = (event: any) => {
    event.preventDefault();
    const inputName = event.target[0];
    const inputEmail = event.target[1];

    verifyEmail(inputName.value, inputEmail.value);
    cleanInputs(inputName, inputEmail);
  };

  const urlHome = window?.location?.pathname == "/" ? true : false;

  return (
    <>
      <section className={`newsletterSection ${urlHome ? "footer-home" : ""}`}>
        <form
          className="newsletterForm flex items-center justify-between vtex-store-newsletter-1-x-newsletterForm--newsletter-main mw9"
          onSubmit={() => handleEvent(event)}
        >
          <p className="vtex-rich-text-0-x-paragraph--newsletter-text">
            Deixe seu e-mail para ficar por dentro das nossas{" "}
            <strong>novidades</strong>:
          </p>
          <div className="flex vtex-store-newsletter-1-x-newsletterForm--newsletter-main">
            <div className="newsletter-input-name">
              <input
                className="newsletterInput vtex-styleguide-9-x-input br3 mr3 ma0 border-box br2 w-100 bn outline-0 bg-base c-on-base b--muted-4 hover-b--muted-3 t-body ph5 "
                name="newsletter"
                placeholder="Nome"
                type="text"
                id="sendNameNewsletter"
                required
              />
            </div>
            <div className="newsletter-input-email">
              <input
                className="newsletterInput vtex-styleguide-9-x-input br3 ma0 ml3 border-box br2 w-100 bn outline-0 bg-base c-on-base b--muted-4 hover-b--muted-3 t-body ph5 "
                name="newsletter"
                placeholder="Email"
                type="text"
                id="sendEmailNewsletter"
                required
              />
            </div>
            <button
              className=" ml5 newsletterButton vtex-button white"
              type="submit"
            >
              Enviar
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Newsletter;
