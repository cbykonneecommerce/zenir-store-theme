import React from "react";
import InputMask from "react-input-mask";
import ClipLoader from "react-spinners/ClipLoader";
import { useCssHandles } from "vtex.css-handles";
import { useProduct } from "vtex.product-context";
import { cepMask } from "./utils/cepMask";
import { formatPrice } from "./utils/formatPrice";

import "./ShippingCalculator.css";

const ShippingCalculator = () => {
  const [inputCep, setInputCep] = React.useState("");
  const [logisticInfos, setLogisticInfos] = React.useState<any>([]);
  const [address, setAddress] = React.useState<AddressProps>({});
  const [inputError, setInputError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const product = useProduct();
  const productId = product?.selectedItem?.itemId;
  const [tabIndex, setTabIndex] = React.useState(1);

  interface AddressProps {
    street?: string;
    number?: string;
    addressId?: string;
    addressType?: string;
    complement?: string;
    country?: string;
    geoCoordinates?: [number, number];
    neighborhood?: string;
    postalCode?: string;
    state?: string;
    city?: string;
    reference?: string;
  }

  // interface LogisticProps {
  //   pickupStoreInfo:PickupStoreInfoProps
  //   price: number
  //   id: string
  //   name: string
  //   shippingEstimate: string
  //   pickupDistance: number
  // }

  // interface PickupStoreInfoProps{
  //   friendlyName: string
  //   address: AddressProps
  // }

  const CSS_HANDLES = [
    "containerShippingCalculator",
    "formShippingCalculator",
    "containerInputsShippingCalculator",
    "inputShippingCalculator",
    "buttonShippingCalculator",
    "linkShippingCalculator",
    "containerLogisticInfos",
    "subContainerLogisticInfos",
    "containerTitleLogisticInfos",
    "containerTitleLogisticInfos",
    "titleLogisticInfos",
    "tabActive",
    "containerLogisticItem",
    "logisticItemName",
    "logisticItemShippingEstimate",
    "logisticItemPrice",
    "addressTitle",
    "logisticItemPriceZero",
    "informationTitle",
    "logisticItemNamePickup",
    "logisticItemAddressPickup",
    "logisticItemShippingEstimatePickup",
    "containerlogisticItemPickup",
    "containerlogisticItemPickupPrice",
    "containerImagelogisticItemPickup",
    "inputShippingCalculatorError",
  ];
  const { handles } = useCssHandles(CSS_HANDLES);

  React.useEffect(() => {
    if (inputCep.length <= 8) setInputError(false);
  }, [inputCep]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const options = {
      method: "POST",
      headers: {
        Accept: "application/vnd.vtex.ds.v10+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [
          {
            id: productId,
            quantity: 1,
            seller: "1",
          },
        ],
        postalCode: inputCep.replace("-", ""),
        country: "BRA",
      }),
    };

    try {
      setIsLoading(true);
      fetch("/api/checkout/pub/orderForms/simulation?RnbBehavior=0", options)
        .then((response) => response.json())
        .then((dataResponse) => {
          if (dataResponse?.logisticsInfo[0]?.slas?.length > 0) {
            setLogisticInfos(dataResponse?.logisticsInfo[0]?.slas);

            fetch(`/api/checkout/pub/postal-code/BRA/${inputCep}`)
              .then((response) => response.json())
              .then((dataInputCep) => {
                setAddress(dataInputCep);
              });

            setIsLoading(false);
          } else {
            setIsLoading(false);
            setInputError(true);
          }
        });
    } catch (err) {
      setIsLoading(false);
      setInputError(true);
      console.log(err.message);
    }
  };

  const handleTabIndex = (id: number) => {
    setTabIndex(id);
  };

  return (
    <div className={handles.containerShippingCalculator}>
      <form className={handles.formShippingCalculator} onSubmit={handleSubmit}>
        <div className={handles.containerInputsShippingCalculator}>
          <>
            <InputMask
              mask=""
              inputMode="numeric"
              type="text"
              placeholder="Digite seu CEP"
              value={inputCep ? cepMask(inputCep) : ""}
              className={handles.inputShippingCalculator}
              required
              maxLength={9}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setInputCep(e.currentTarget.value);
              }}
            />
            <button className={handles.buttonShippingCalculator} type="submit">
              {isLoading === true ? (
                <ClipLoader
                  color="fff"
                  loading={isLoading}
                  size={20}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                "Ok"
              )}
            </button>
          </>

          <a
            href="https://buscacepinter.correios.com.br/app/endereco/index.php"
            target="_blank"
            rel="noopener noreferrer"
            className={handles.linkShippingCalculator}
          >
            Não lembro meu cep
          </a>
        </div>

        {logisticInfos?.length <= 0 ? (
          <p className={handles.informationTitle}>
            Informe seu CEP para consultar as opções de envio e retirada.
          </p>
        ) : null}
      </form>
      {logisticInfos?.length > 0 ? (
        <div className={handles.containerLogisticInfos}>
          <div className={handles.subContainerLogisticInfos}>
            <div
              className={`${handles.containerTitleLogisticInfos}  ${
                tabIndex === 1 ? handles.tabActive : null
              }`}
              onClick={() => handleTabIndex(1)}
            >
              <span className={`${handles.titleLogisticInfos}`}>
                <p>Receber em casa</p>
              </span>
            </div>
            <div
              className={`${handles.containerTitleLogisticInfos}  ${
                tabIndex === 2 ? handles.tabActive : null
              }`}
              onClick={() => handleTabIndex(2)}
            >
              <span className={`${handles.titleLogisticInfos}`}>
                <p>Retirar na loja</p>
              </span>
            </div>
          </div>
          {tabIndex === 1 && (
            <div>
              {address && address?.city ? (
                <p
                  className={`${handles.addressTitle}`}
                >{` ${address?.street} ${address?.number}, ${address?.city} - ${address?.state}`}</p>
              ) : null}
              {logisticInfos
                ?.filter(
                  (slaItem: { deliveryChannel: string }) =>
                    slaItem.deliveryChannel === "delivery"
                )
                .map(({ shippingEstimate, name, price }: any) => {
                  return (
                    <div
                      className={`${handles.containerLogisticItem}`}
                      key={name}
                    >
                      <span className={`${handles.logisticItemName}`}>
                        {name}
                      </span>
                      <span
                        className={`${handles.logisticItemShippingEstimate}`}
                      >
                        <span>
                          receba em até
                          <p>
                            {String(shippingEstimate).replace(
                              "bd",
                              " dias úteis"
                            )}
                          </p>
                        </span>
                      </span>
                      <span
                        className={`${handles.logisticItemPrice} ${
                          price === 0 ? handles.logisticItemPriceZero : null
                        }`}
                      >
                        {price === 0 ? "Frete Grátis" : formatPrice(price / 100)}
                      </span>
                    </div>
                  );
                })}
            </div>
          )}
          {tabIndex === 2 && (
            <div>
              {logisticInfos
                ?.filter(
                  (slaItem: { deliveryChannel: string }) =>
                    slaItem.deliveryChannel === "pickup-in-point"
                )
                .map(
                  ({
                    pickupStoreInfo,
                    price,
                    id,
                    pickupDistance,
                    shippingEstimate,
                  }: any) => {
                    return (
                      <div
                        className={`${handles.containerLogisticItem}`}
                        key={id}
                      >
                        <div
                          className={`${handles.containerImagelogisticItemPickup}`}
                        ></div>
                        <div
                          className={`${handles.containerlogisticItemPickup}`}
                        >
                          <span className={`${handles.logisticItemNamePickup}`}>
                            {pickupStoreInfo.friendlyName}
                          </span>
                          <span
                            className={`${handles.logisticItemAddressPickup}`}
                          >
                            {pickupStoreInfo.address.street},
                            {pickupStoreInfo.address.city},
                            {pickupStoreInfo.address.number}
                          </span>
                          <span
                            className={`${handles.logisticItemShippingEstimatePickup}`}
                          >
                            Retire em até{" "}
                            {String(shippingEstimate).replace(
                              "bd",
                              " dias úteis"
                            )}
                          </span>
                        </div>
                        <div
                          className={`${handles.containerlogisticItemPickupPrice}`}
                        >
                          <span>{`${
                            pickupDistance >= 1
                              ? pickupDistance.toFixed(0) + "km"
                              : (pickupDistance * 1000).toFixed(3) + "m"
                          }`}</span>
                          <span
                            className={`${handles.logisticItemPrice} ${
                              price === 0 ? handles.logisticItemPriceZero : null
                            }`}
                          >
                            {price === 0 ? "Frete Grátis" : formatPrice(price / 100)}
                          </span>
                        </div>
                      </div>
                    );
                  }
                )}
            </div>
          )}
        </div>
      ) : (
        <p className={handles.inputShippingCalculatorError}>
          {inputError
            ? "Infelizmente neste momento esse produto não está disponivel para sua localidade. Encontre outras opções clicando aqui"
            : ""}
        </p>
      )}
    </div>
  );
};

export default ShippingCalculator;
