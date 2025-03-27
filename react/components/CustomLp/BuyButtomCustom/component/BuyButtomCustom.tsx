/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-console */
import React, { useState } from "react";
import { useOrderItems } from "vtex.order-items/OrderItems";
import { usePixel } from "vtex.pixel-manager";
import { Spinner, withToast } from "vtex.styleguide";
import "./BuyButtomCustom.css";

interface IBuyButtomCustom {
  text: string;
  cartItem: any;
  backgroundColor: string;
  color: string;
  showToast?: (params: any) => void;
}

const BuyButtomCustom = ({
  text,
  cartItem,
  backgroundColor,
  color,
  showToast,
}: IBuyButtomCustom) => {
  const { addItems } = useOrderItems();
  const [isAdding, setAdding] = useState(false);

  const { push } = usePixel();

  const addTocart = async () => {
    setAdding(true);
    const qdtValid: any = 1;

    const cartItemUpdate = [
      {
        ...cartItem.data,
        quantity: qdtValid,
      },
    ];

    await addItems(cartItemUpdate);
    push({
      event: "addToCart",
      id: "addToCart",
    });

    if (showToast) {
      showToast({
        message: `Produto adicionado ao carrinho!`,
      });
    }

    window.location.href = "/checkout";
  };

  return (
    <>
      <button
        style={{ backgroundColor, color }}
        onClick={addTocart}
        className="btn-add-to-cart"
      >
        {isAdding ? <Spinner size={20} color="#000" /> : text}
      </button>
    </>
  );
};

export default withToast(BuyButtomCustom);
