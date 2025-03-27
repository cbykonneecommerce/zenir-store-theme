import React, { useState } from "react";

interface Props {
  code: string;
  disabled: boolean;
}

const CopyLinkButton: React.FC<Props> = ({ code, disabled }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyButtonClick = () => {
    const url = `https://www.zenirmoveis.com.br/?utm_source=${code}&utm_ipart=${code}`;

    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000); // volta ao texto original após 3 segundos
  };

  return (
    <button
      className="copyButton"
      onClick={handleCopyButtonClick}
      disabled={disabled}
    >
      <span>{copied ? "Copiado" : "Copiar link"}</span>
      <i>
        <svg
          width="27"
          height="26"
          viewBox="0 0 27 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.91667 23.8333C5.32084 23.8333 4.81059 23.621 4.38592 23.1963C3.96125 22.7717 3.74928 22.2618 3.75 21.6667V6.49999H5.91667V21.6667H17.8333V23.8333H5.91667ZM10.25 19.5C9.65417 19.5 9.14392 19.2877 8.71925 18.863C8.29459 18.4383 8.08261 17.9284 8.08334 17.3333V4.33332C8.08334 3.73749 8.29567 3.22724 8.72034 2.80257C9.145 2.37791 9.65489 2.16594 10.25 2.16666H20C20.5958 2.16666 21.1061 2.37899 21.5308 2.80366C21.9554 3.22832 22.1674 3.73821 22.1667 4.33332V17.3333C22.1667 17.9292 21.9543 18.4394 21.5297 18.8641C21.105 19.2887 20.5951 19.5007 20 19.5H10.25ZM10.25 17.3333H20V4.33332H10.25V17.3333Z"
            fill="white"
          />
        </svg>
      </i>
    </button>
  );
};

export default CopyLinkButton;
