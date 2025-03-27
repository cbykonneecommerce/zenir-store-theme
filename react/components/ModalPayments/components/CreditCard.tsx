import React from "react";
import { useCssHandles } from "vtex.css-handles";
import { useProduct } from "vtex.product-context";
import { formatPrice } from "../../ShippingCalculator/utils/formatPrice";

interface InstallmentsProps {
  Value: number;
  InterestRate: number;
  TotalValuePlusInterestRate: number;
  NumberOfInstallments: number;
  Name: string;
  PaymentSystemName: string;
  __typename: string;
}

const CreditCard = () => {
  const product = useProduct();
  const installments =
    product?.selectedItem?.sellers[0].commertialOffer?.Installments;

  const CSS_HANDLES = [
    "containerCreditCard",
    "containerNumberOfInstallments",
    "numberOfInstallmentsItem",
    "interestRateItem",
    "totalValuePlusInterestRate",
    "containerCreditCardItem",
  ];
  const { handles } = useCssHandles(CSS_HANDLES);

  const installmentsFilter = installments?.filter(
    (slaItem: { PaymentSystemName: string }) =>
      slaItem.PaymentSystemName === "American Express"
  ) as InstallmentsProps[] | undefined;

  return (
    <div className={handles.containerCreditCard}>
      {installmentsFilter && installmentsFilter?.length > 0 ? (
        <>
          {installmentsFilter.map(
            (installment: InstallmentsProps, index: number) => {
              return (
                <div className={handles.containerCreditCardItem} key={index}>
                  <span className={handles.containerNumberOfInstallments}>
                    <p className={handles.numberOfInstallmentsItem}>{`${
                      installment.NumberOfInstallments
                    }x de ${formatPrice(installment.Value)}`}</p>
                    <p className={handles.interestRateItem}>{`${
                      installment.InterestRate > 0 ? "Com Juros" : "Sem Juros"
                    } `}</p>
                  </span>
                  <span className={handles.totalValuePlusInterestRate}>
                    {formatPrice(installment.TotalValuePlusInterestRate)}
                  </span>
                </div>
              );
            }
          )}
        </>
      ) : null}
    </div>
  );
};

export default CreditCard;
