import React from "react";
import { useProduct } from "vtex.product-context";
import { useQuery } from "react-apollo";
import productQuery from "../../graphql/product.graphql";

interface Installment {
  Value: number;
  InterestRate: number;
  TotalValuePlusInterestRate: number;
  NumberOfInstallments: number;
  PaymentSystemName: string;
  PaymentSystemGroupName: string;
  Name: string;
  __typename: string;
}

const CustomProductInstallments = () => {
  const product = useProduct();
  const sku = product?.selectedItem?.itemId;
  const { data } = useQuery(productQuery, {
    variables: { sku: sku },
  });

  const installments =
    data?.product.items[0].sellers[0].commertialOffer.Installments;
  const price = data?.product.items[0].sellers[0].commertialOffer.Price;
  const listPrice = data?.product.items[0].sellers[0].commertialOffer.ListPrice;

  const americanExpress = installments?.filter((item: any) => {
    if (item.PaymentSystemName == "American Express") {
      return item.PaymentSystemName;
    }
  });

  function findInstallmentWithConditions(
    americanExpress: Installment[]
  ): Installment | undefined {
    const filteredInstallments = americanExpress?.filter(
      (object) =>
        object.Name.includes("Sem juros") && object.NumberOfInstallments === 10
    );

    if (filteredInstallments?.length > 0) {
      return filteredInstallments[0];
    }

    return americanExpress?.reduce(
      (maxInstallment, currentInstallment) =>
        currentInstallment.NumberOfInstallments >
        maxInstallment.NumberOfInstallments
          ? currentInstallment
          : maxInstallment,
      americanExpress[0]
    );
  }

  const installment = findInstallmentWithConditions(americanExpress);

  const changeForReal = (value: any) => {
    if (!value) return;
    return value?.toFixed(2).replace(".", ",");
  };

  return (
    <>
      {price ? (
        <div className="flex items-start justify-center flex-column">
          <span className="strike vtex-product-price-1-x-listPrice vtex-product-price-1-x-listPrice--summary">
            {listPrice !== price ? `de R$ ${changeForReal(listPrice)}` : ""}
          </span>
          <span className="vtex-product-price-1-x-sellingPrice--summary">
            R$ {changeForReal(price)}
          </span>
          {installment ? (
            <span className="vtex-product-price-1-x-installments--summary">
              ou em {installment?.NumberOfInstallments}x de R$
              {changeForReal(installment?.Value) + " "}
              {installment.InterestRate > 0 ? "no cartão" : "sem juros"}
            </span>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default CustomProductInstallments;
