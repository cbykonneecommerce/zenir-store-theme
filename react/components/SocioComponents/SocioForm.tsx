import type { FormEvent } from "react";
import React, { useMemo, useState } from "react";
import ReactInputMask from "react-input-mask";
import { applyModifiers, useCssHandles } from "vtex.css-handles";
import { ExtensionPoint } from "vtex.render-runtime";

import { useSocioContext } from "../../CustomSocioTorcedorProvider";
import validarCPF from "./validators";

import { Alert, Spinner } from "vtex.styleguide";
import "./socio.css";

const CSS_HANDLES = [
  "socioForm",
  "socioFormInputContainer",
  "socioFormInputDisclaimer",
  "invalidDocument",
  "socioDocumentInput",
  "loginlpcustom",
  "loginlpcustomtitle",
  "socioformcontainer",
  "socioFormContainerWrapper",
  "socioFormContainerWrapperDescriptionAndLogo",
  "formDescription",
  "extraImage",
];

interface SocioFormProps {
  clube: string;
  textModal: string;
  descriptionText: string;
  logoForm: string;
  logoZenirClube: string;
  bgColor: string;
  inputLabel: string;
  btnColor: string;
  extraImage: string;
  colorTitle: string;
  colorCastrese: string;
}

const SocioForm: StorefrontFunctionComponent<SocioFormProps> = ({
  clube,
  logoForm,
  descriptionText,
  bgColor,
  inputLabel,
  logoZenirClube,
  btnColor,
  extraImage,
  colorTitle,
  colorCastrese,
}: SocioFormProps) => {
  const { loading, profile } = useSocioContext();
  const { handles } = useCssHandles(CSS_HANDLES);
  const [document, setDocument] = useState("");
  const [localLoading, setLocalLoading] = useState(false);
  const [erro, setError] = useState("");
  const [sucess, setSuccess] = useState(false);

  const isCpfValid = useMemo(() => validarCPF(document), [document]);

  if (loading) {
    return <span>Carregando...</span>;
  }

  if (!profile) {
    return (
      <>
        <div className={handles.loginlpcustom}>
          <span
            className={handles.loginlpcustomtitle}
            style={{
              color: colorTitle,
            }}
          >
            Agora vamos confirmar seu acesso na Zenir.
          </span>
          <ExtensionPoint id="login-content" />
          <a
            href="/cadastre-se"
            style={{
              color: colorCastrese,
            }}
          >
            Não têm conta? Cadastre-se.
          </a>
        </div>
      </>
    );
  }

  const handleSubmit = async (event: FormEvent) => {
    setLocalLoading(true);
    event.preventDefault();
    event.stopPropagation();
    setError("");

    const data = await fetch(`/v1/api/socio-torcedor/consultar`, {
      method: "POST",
      body: JSON.stringify({
        cpf: document.replace(/[^\d]+/g, ""),
      }),
      headers: {
        clube,
      },
    });

    setLocalLoading(false);

    if (data.status === 400) {
      return setError("Houve algum problema ao tentar consultar seus dados");
    }

    if (data.status === 404) {
      return setError(
        `Sócio torcedor com cpf: ${document} não foi encontrado!`
      );
    }

    if (data.status === 500) {
      return setError("Não foi possível consultar seus dados no momento!");
    }

    setSuccess(true);

    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  return (
    <div
      className={handles.socioFormContainerWrapper}
      style={{
        backgroundColor: bgColor,
      }}
    >
      <div className={handles.socioFormContainerWrapperDescriptionAndLogo}>
        <img src={logoForm} title="Formulário de sócio torcedor" />
        <div
          className={handles.formDescription}
          dangerouslySetInnerHTML={{ __html: descriptionText ?? "<p></p>" }}
        ></div>
      </div>
      <form className={handles.socioForm} onSubmit={handleSubmit}>
        <div className={handles.socioFormInputContainer}>
          <img alt="Logo Zenir" src={logoZenirClube} />
          <span
            className={handles.socioFormInputDisclaimer}
            dangerouslySetInnerHTML={{ __html: inputLabel }}
          />
          <ReactInputMask
            placeholder="cpf"
            value={document}
            mask="999.999.999-99"
            required
            autoFocus
            type="phone"
            disabled={localLoading}
            onChange={(event) => setDocument(event.target.value)}
            className={applyModifiers(
              handles.socioDocumentInput,
              !isCpfValid && document.replace(/[^\d]+/g, "").length
                ? "invalid"
                : "valid"
            )}
          />
          {erro ? (
            <Alert type="warning" autoClose={10000}>
              <p>{erro}</p>
            </Alert>
          ) : null}
          {sucess ? (
            <Alert type="success" autoClose={10000}>
              <p>Formulário enviado com sucesso!</p>
            </Alert>
          ) : null}
          <button
            className="vtex-button"
            style={{
              background: btnColor,
            }}
            type="submit"
            disabled={!isCpfValid}
          >
            {localLoading ? <Spinner color="#fff" size={20} /> : "Entrar"}
          </button>
        </div>
      </form>
      {extraImage ? (
        <img
          className={handles.extraImage}
          src={extraImage}
          alt="Formulário imagem extra"
        />
      ) : (
        <span />
      )}
    </div>
  );
};

SocioForm.schema = {
  title: "Formulário de sócio torcedor",
  description: "Landing Pages dos times",
  type: "object",
  properties: {
    clube: {
      title: "Clube desse formulário",
      description: "Valores: fortaleza ou ceara",
      type: "string",
      require: true,
    },
    colorCastrese: {
      title: "Cor do cadastre-se",
      default: "#000",
      type: "string",
    },
    colorTitle: {
      title: "Cor do titulo do formulário de login",
      default: "#000",
      type: "string",
    },
    bgColor: {
      title: "Cor de fundo do formuário",
      description: "",
      default: "#052D7B",
      type: "string",
    },
    descriptionText: {
      title: "Texo de descrição HTML",
      type: "string",
      widget: {
        "ui:widget": "textarea",
      },
    },
    logoForm: {
      title: "Logo do formulário",
      type: "string",
      default: "",
      widget: {
        "ui:widget": "image-uploader",
      },
    },
    logoZenirClube: {
      title: "Logo da zenir junto com o clube formulário",
      type: "string",
      default: "",
      widget: {
        "ui:widget": "image-uploader",
      },
    },
    inputLabel: {
      title: "Label sob o input de CPF - HTML",
      default: "Primeiro vamos confirmar seu sócio-torcedor.",
      type: "string",
      widget: {
        "ui:widget": "textarea",
      },
    },
    btnColor: {
      title: "Cor do botão de confirmação",
      default: "#E12026",
      type: "string",
    },
    extraImage: {
      title: "Imagem extra - Footer",
      type: "string",
      default: "",
      widget: {
        "ui:widget": "image-uploader",
      },
    },
  },
};

export default SocioForm;
