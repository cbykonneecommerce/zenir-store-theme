import type { CSSProperties } from "react";
import React from "react";
import { applyModifiers, useCssHandles } from "vtex.css-handles";
import { Link } from "vtex.render-runtime";

interface Category {
  image: string;
  __editorItemTitle: string;
  url: string;
  position: string;
  iconPosition: string;
  showIcon: boolean;
  textColor: string;
}

const CSS_HANDLES = [
  "categoryContainer",
  "categoryContainerTitle",
  "categoryContainerImage",
  "categoryImageDiv",
  "categoryContainerLink",
  "categoryContainerTitleh2",
  "categoryContainerWrapper",
  "categoryContainerGrid",
  "categoryContainerIcon",
  "categoryLinkWrapper",
] as const;

const getTextPosition = ({ position }: { position: string }) => {
  const positions: Record<string, Record<string, string>> = {
    "top-left": {
      left: "0px",
      top: "0px",
    },
    "bottom-left": {
      bottom: "0px",
      left: "0px",
    },
    "top-middle": {
      top: "0px",
      left: "50%",
      transform: "translateX(-50%)",
    },
    "bottom-middle": {
      bottom: "0px",
      left: "50%",
      transform: "translateX(-50%)",
    },
    "top-right": {
      top: "0px",
      right: "0px",
    },
    "bottom-right": {
      bottom: "0px",
      right: "0px",
    },
  };

  const css = positions[position];

  if (!css) {
    return {
      top: "0px",
      left: "0px",
    };
  }

  return css as CSSProperties;
};

const CustomCategories: StoreFrontFC<{
  categories: Category[];
  title: string;
}> = ({ categories, title }) => {
  const { handles } = useCssHandles(CSS_HANDLES);

  return (
    <section className={handles.categoryContainerWrapper}>
      <h3 className={handles.categoryContainerTitleh2}>{title}</h3>

      <div className={handles.categoryLinkWrapper}>
        {categories.map((item, index) => (
          <Link
            key={item.position}
            className={applyModifiers(
              handles.categoryContainer,
              `item-${index + 1}`
            )}
            style={{
              gridArea: `item-${index + 1}`,
            }}
          >
            <img
              className={handles.categoryContainerImage}
              alt={item.__editorItemTitle}
              title={item.__editorItemTitle}
              src={item.image}
              loading="eager"
            />
            <h5
              className={handles.categoryContainerTitle}
              style={{
                ...(getTextPosition({
                  position: item.position,
                }) as any),
                color: item.textColor,
              }}
            >
              {item.__editorItemTitle}
            </h5>
          </Link>
        ))}
      </div>
    </section>
  );
};

CustomCategories.defaultProps = {
  categories: [],
  title: "Navegue por categorias",
};

CustomCategories.schema = {
  title: "Categorias - Conteúdo",
  type: "object",
  properties: {
    title: {
      type: "string",
      title: "Title",
      default: "Nossas categorias",
    },
    categories: {
      type: "array",
      title: "Categorias",
      items: {
        type: "object",
        properties: {
          __editorItemTitle: {
            title: "title",
            type: "string",
            default: "",
          },
          position: {
            type: "string",
            title: "Posição do Texto",
            enum: [
              "top-left",
              "bottom-left",
              "top-middle",
              "bottom-middle",
              "top-right",
              "bottom-right",
            ],
            enumNames: [
              "Top left",
              "Bottom Left",
              "Top Middle",
              "Top Right",
              "Bottom Right",
            ],
            default: "top-left",
          },
          textColor: {
            type: "string",
            title: "Cor do titulo",
            default: "#737373",
          },
          image: {
            type: "string",
            title: "Image",
            default: "",
            widget: {
              "ui:widget": "image-uploader",
            },
          },
          url: {
            type: "string",
            title: "Link",
            default: "",
          },
        },
      },
    },
  },
};

export default CustomCategories;
