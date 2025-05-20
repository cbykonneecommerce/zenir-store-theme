import React from "react";
import { useRuntime } from "vtex.render-runtime";

const sortOptions = [
  { label: "Relevância", value: "" },
  { label: "Mais vendidos", value: "OrderByTopSaleDESC" },
  { label: "Mais recentes", value: "OrderByReleaseDateDESC" },
  { label: "Mais recentes", value: "OrderByReleaseDateDESC" },
  { label: "Maior preço", value: "OrderByPriceDESC" },
  { label: "Menor preço", value: "OrderByPriceASC" },
];

const CustomOrderbyOptions: React.FC = () => {
  const { setQuery } = useRuntime();

  const handleSortChange = (value: string) => {
    setQuery({ order: value, page: undefined });
  };

  return (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      {sortOptions.map(({ label, value }) => (
        <button
          key={value || "relevance"}
          onClick={() => handleSortChange(value)}
          style={{
            padding: "8px 16px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default CustomOrderbyOptions;
