import React, { useEffect, useMemo, useState } from "react";
import { useCssHandles } from "vtex.css-handles";
import { useProduct } from "vtex.product-context";

import "./ProductTimer.css";

// interface ProductClusters {
//   id: string;
//   name: string;
//   __typename: string;
// }

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;

const CSS_HANDLES = [
  "timerContainer",
  "timerBox",
  "timerBoxTitle",
  "timerNumber",
  "timerSeparator",
  "space",
] as const;

const ProductTimer: React.FC = () => {
  const { handles } = useCssHandles(CSS_HANDLES);
  const productCtx = useProduct();
  const productClusters = productCtx?.product?.productClusters?.filter(
    (item: any) => item
  );

  const promoDate = productClusters
    ? productClusters
        .find((cluster: any) => /^clock-/.test(cluster.name))
        ?.name.split("clock-")[1]
    : null;

  if (!promoDate) {
    return null;
  }

  const [day, month, year] = promoDate.split("-");
  const deadline: Date = new Date(Number(year), Number(month) - 1, Number(day));

  if (deadline.getTime() < Date.now()) {
    return null;
  }

  const parsedDeadline = useMemo(() => Date.parse(deadline.toString()), [
    deadline,
  ]);

  const [time, setTime] = useState<number>(parsedDeadline - Date.now());

  useEffect(() => {
    const interval = setInterval(
      () => setTime(parsedDeadline - Date.now()),
      1000
    );

    return () => clearInterval(interval);
  }, [parsedDeadline]);

  const handleTimerBoxRef = (ref: HTMLDivElement) => {
    if (
      ref &&
      ref.parentElement?.parentElement?.parentElement?.parentElement
        ?.parentElement
    ) {
      ref.parentElement.parentElement.parentElement.parentElement.parentElement.classList.add(
        "border-active"
      );
    }
  };

  return (
    <div className={`${handles.timerContainer} flex`}>
      <span className={handles.timerBoxTitle}>Essa oferta termina em </span>
      <div
        className={`${handles.timerBox} flex justify-center content-center`}
        ref={handleTimerBoxRef}
      >
        <div className={handles.timerNumber}>
          <span>
            {`${`${Math.floor((time / HOUR) % 24)}`.padStart(2, "0")}h`}
          </span>
        </div>
        <span className={handles.timerSeparator}>:</span>
        <div className={handles.timerNumber}>
          <span>
            {`${`${Math.floor((time / MINUTE) % 60)}`.padStart(2, "0")}m`}
          </span>
        </div>
        <span className={handles.timerSeparator}>:</span>
        <div className={handles.timerNumber}>
          <span>
            {`${`${Math.floor((time / SECOND) % 60)}`.padStart(2, "0")}s`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductTimer;
