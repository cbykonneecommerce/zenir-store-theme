import React from "react";
import { applyModifiers, useCssHandles } from "vtex.css-handles";
import { useDevice } from "vtex.device-detector";

import "./Global.css";

interface DivProps {
  flexDirection?: "row" | "column" | "row-reverse" | "column-reverse";
  alignItems?: "flex-start" | "flex-end" | "center" | "baseline" | "stretch";
  justifyContent: "space-between" | "center" | "flex-start" | "flex-end";
  width?: string;
  background?: string;
  gap?: string;
  className?: string;
  children?: React.ReactNode;
  preserveMobileLayout: boolean;
  padding: string;
  paddingMobile: string;
  flexDirectionMobile: string;
  position?: React.CSSProperties["position"];
  margin?: string;
  height?: string;
}

const CSS_HANDLES = ["divContainer"] as const;

const Div: StorefrontFunctionComponent<DivProps> = ({
  flexDirection = "row",
  alignItems = "stretch",
  width = "auto",
  background = "transparent",
  gap = "0",
  className,
  children,
  justifyContent = "flex-start",
  preserveMobileLayout,
  padding = "0px",
  paddingMobile = "",
  flexDirectionMobile = "column",
  position = "initial",
  margin = "0px",
  height = "auto",
}) => {
  const { handles } = useCssHandles(CSS_HANDLES);
  const { isMobile } = useDevice();

  const style: React.CSSProperties = {
    display: "flex",
    flexDirection,
    alignItems,
    width,
    background,
    gap,
    justifyContent,
    padding,
    position,
    margin,
    height,
  };

  if (!preserveMobileLayout && isMobile) {
    style.flexDirection = "column";
  }

  if (flexDirectionMobile && isMobile) {
    style.flexDirection = flexDirectionMobile as any;
  }

  if (isMobile) {
    style.padding = paddingMobile || padding;
  }

  return (
    <div
      style={style}
      className={applyModifiers(handles.divContainer, className || "")}
    >
      {children}
    </div>
  );
};

Div.schema = {
  title: "Seção",
  type: "object",
  properties: {
    flexDirection: {
      type: "string",
      enum: ["row", "column"],
      default: "row",
    },
    alignItems: {
      type: "string",
      enum: ["stretch", "flex-start", "flex-end", "center", "baseline"],
      default: "stretch",
    },
    width: {
      type: "string",
      default: "auto",
    },
    background: {
      type: "string",
      default: "transparent",
    },
    gap: {
      type: "string",
      default: "0",
    },
    justifyContent: {
      type: "string",
      enum: [
        "flex-start",
        "flex-end",
        "center",
        "space-between",
        "space-around",
        "space-evenly",
      ],
      default: "flex-start",
    },
    preserveMobileLayout: {
      type: "boolean",
    },
    padding: {
      type: "string",
      default: "0px",
    },
    paddingMobile: {
      type: "string",
      default: "",
    },
    flexDirectionMobile: {
      type: "string",
      enum: ["row", "column"],
      default: "column",
    },
    position: {
      type: "string",
      default: "initial",
      enum: ["initial", "relative", "fixed", "absolute"],
    },
    margin: {
      type: "string",
      default: "0px",
    },
    height: {
      type: "string",
      default: "auto",
    },
  },
};

export default Div;
