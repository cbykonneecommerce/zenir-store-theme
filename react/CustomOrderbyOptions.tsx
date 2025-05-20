import React from "react";
import { applyModifiers, useCssHandles } from "vtex.css-handles";
import { useRuntime } from "vtex.render-runtime";
import "./Global.css";

const CSS_HANDLES = ["customOrderByButton", "customOrderByContainer"];

const sortOptions = [
  { label: "Relevância", value: "" },
  { label: "Mais vendidos", value: "OrderByTopSaleDESC" },
  { label: "Mais recentes", value: "OrderByReleaseDateDESC" },
  { label: "Maior preço", value: "OrderByPriceDESC" },
  { label: "Menor preço", value: "OrderByPriceASC" },
];

const CustomOrderbyOptions: React.FC = () => {
  const { setQuery, query } = useRuntime();
  const { handles } = useCssHandles(CSS_HANDLES);

  const handleSortChange = (value: string) => {
    setQuery({ order: value, page: undefined });
  };

  const currentOrder = query?.order || "";

  return (
    <div className={handles.customOrderByContainer}>
      {sortOptions.map(({ label, value }) => {
        const isActive = currentOrder === value;

        return (
          <button
            className={applyModifiers(
              handles.customOrderByButton,
              isActive ? "is-active" : ""
            )}
            key={value || "relevance"}
            onClick={() => handleSortChange(value)}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default CustomOrderbyOptions;
