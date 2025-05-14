/* eslint-disable import/order */
import React, { memo, useState } from "react";
import { useCssHandles } from "vtex.css-handles";

import CopyLinkButton from "./components/CopyLinkButton";

import "./SocialSharing.css";
import WhatsAppShareButton from "./components/WhatsAppShareButton";

interface ButtonProps {
  onClick: () => void;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface InputProps {
  value: string;
  onChange: (newValue: string) => void;
}

const Button: React.FC<ButtonProps> = ({ onClick }) => (
  <button
    className="tfcvih-weonne-zenir-io-4-x-socialSharing"
    onClick={onClick}
  >
    <img
      alt="Social sharing"
      src="https://tfcvih.vtexassets.com/assets/vtex.file-manager-graphql/images/712f4e8d-20c0-40ca-b688-299bc70104ab___37ee4e40b820eae94588a7f4c4f0966c.png"
    />
  </button>
);

const Input: React.FC<InputProps> = memo(({ value, onChange }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleInputChange}
      placeholder="Digite o código do vendedor"
    />
  );
});

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const CSS_HANDLES = [
    "modalContent",
    "overlay",
    "modalTitle",
    "modalWrapper",
    "modalClose",
  ];

  const { handles } = useCssHandles(CSS_HANDLES);
  const [code, setCode] = useState("");

  const handleInputChange = (newValue: string) => {
    setCode(newValue);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className={handles.overlay} onClick={onClose} />
      <section className={handles.modalContent}>
        <p className={handles.modalTitle}>Compartilhamento Social</p>
        <div className={handles.modalWrapper}>
          <p>Código do vendedor</p>
          <Input value={code} onChange={handleInputChange} />
          <WhatsAppShareButton disabled={!code} code={code} />
          <CopyLinkButton disabled={!code} code={code} />
        </div>

        <button className={handles.modalClose} onClick={onClose}>
          <svg
            fill="none"
            width="24"
            height="24"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <use href="#sti-close--line" />
          </svg>
        </button>
      </section>
    </>
  );
};

const SocialSharing: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={handleButtonClick} />
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default SocialSharing;
