import React from "react";

import BuyButtomCustom from "./component/BuyButtomCustom";
// import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { cartItem } from "./utils/cartItem";

interface IWrapper {
  textButtom: string;
  data?: any;
  backgroundColor: string;
  color: string;
}

export const Wrapper = ({
  textButtom,
  data,
  backgroundColor,
  color,
}: IWrapper) => {
  const cartItemFilter = cartItem(data);

  return (
    <BuyButtomCustom
      text={textButtom}
      cartItem={cartItemFilter}
      backgroundColor={backgroundColor}
      color={color}
    />
  );
};

Wrapper.defaultProps = {
  textButtom: "Comprar",
  messageSuccess: "Tu producto ha sido agregado al carrito",
};

Wrapper.getSchema = () => {
  return {
    title: "institucional termo de uso",
    type: "object",
    properties: {
      textButtom: {
        title: "Texto botao",
        type: "string",
      },
    },
  };
};
