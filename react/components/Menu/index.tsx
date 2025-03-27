import React, { useEffect } from "react";
//@ts-ignore
import { useDevice } from "vtex.device-detector";
import { Drawer, DrawerHeader, DrawerCloseButton } from "vtex.store-drawer";
import {
  DisclosureLayout,
  DisclosureTrigger,
  DisclosureContent,
  //@ts-ignore
} from "vtex.disclosure-layout";
// @ts-ignore
import menuIcon from "../../../assets/icons/menu-mobile-icon.svg";
import "./Menu.css";

const Menu = () => {
  const axios = require("axios");
  useEffect(() => {
    axios
      .get("/api/catalog_system/pub/category/tree/10")
      .then(function (response: any) {
        const menuRender = response.data.map((item: any) => ({
          name: item.name,
          url: item.url,
          hasChildren: item.hasChildren,
          children: item.children,
        }));
        setCategory(menuRender);
      });
  }, []);

  const [category, setCategory] = React.useState<
    {
      name: string;
      url: string;
      hasChildren: boolean;
      children: {
        name: string;
        url: string;
        hasChildren: boolean;
        children: { name: string; url: string; hasChildren: boolean }[];
      }[];
    }[]
  >([]);

  const { isMobile } = useDevice();

  return (
    <>
      <div className="menu-container">
        <div className="menu-custom">
          <Drawer
            header={
              <>
                <DrawerHeader>
                  <DrawerCloseButton />
                      <div className="title-menuvtex ">
                        <h2>Todas as Categorias</h2>
                      </div>
                    
                 
                </DrawerHeader>
              </>
            }
            position="left"
            customIcon={
              isMobile ? (
                <img src={menuIcon} />
              ) : (
                <span className="ver-mais">Todas as Categorias</span>
              )
            }
          >
            <div className="contain-header-menu">
                <a href="/" className="contain-header-menu-home">Home</a>
                <a href="/account#/profile" className="contain-header-menu-minha-conta">Minha Conta</a>
            </div>
            <ul>
              {category.map((item) => {
                return (
                  <li>
                    <DisclosureLayout>
                      {item.hasChildren ? (
                        <DisclosureTrigger>
                          {" "}
                          <span
                            className={`menu-item-first ${item.name
                              .toLowerCase()
                              .replace(" ", "-")}`}
                          >
                            {item.name}
                          </span>
                        </DisclosureTrigger>
                      ) : (
                        <DisclosureLayout>
                          <DisclosureTrigger>
                            <span
                              className={`menu-item ${item.name
                                .toLowerCase()
                                .replace(" ", "-")}`}
                            >
                              {item.name}
                            </span>
                          </DisclosureTrigger>
                          <DisclosureContent>
                            <a
                              className={`only-son ${item.name
                                .toLowerCase()
                                .replace(" ", "-")}`}
                              href={item.url}
                            >
                              {item.name}
                            </a>
                          </DisclosureContent>
                        </DisclosureLayout>
                      )}
                      {item.hasChildren
                        ? item.children.map((item) => {
                            return (
                              <div className="sub-menu-custom">
                                <li>
                                  <DisclosureContent>
                                    <a
                                      className={`menu-item ${item.name
                                        .toLowerCase()
                                        .replace(" ", "-")}`}
                                      href={item.url}
                                    >
                                      {item.name}
                                    </a>
                                    <div
                                      style={{
                                        marginLeft: "10px",
                                        backgroundColor: "blue",
                                        display: "none",
                                      }}
                                    >
                                      {item.hasChildren
                                        ? item.children.map((item) => (
                                            <li>{item.name}</li>
                                          ))
                                        : null}
                                    </div>
                                  </DisclosureContent>
                                </li>{" "}
                              </div>
                            );
                          })
                        : null}
                    </DisclosureLayout>
                  </li>
                );
              })}
              <div className="links-menu-drawer">
                <a className="banner-menu-1">
                  <img src="/arquivos/Group 195.png" />
                </a>
                <a className="banner-menu-2">
                  <img src="/arquivos/Group 870.png" />
                </a>
                <a className="central-de-atendimento">
                  <span>Central de Atendimentos</span>
                </a>
                <a className="regulamentos">
                  <span>Regulamentos</span>
                </a>
                <a className="politicas-de-privacidade">
                  <span>Políticas de Privacidade</span>
                </a>
                <a className="telefone-drawer">
                  <span>0800-2755700</span>
                </a>
                <span className="horario-de-atendimento">de 8:00hr às 17:00hr<br/>Shopping até às 22:00hr</span>
              </div>
            </ul>
          </Drawer>
          {isMobile
            ? null
            : category.map((item) => {
                return (
                  <a
                    className={`menu-item-first ${item.name
                      .toLowerCase()
                      .replace(" ", "-")}`}
                    href={item.url}
                  >
                    {item.name}{" "}
                  </a>
                );
              })}
        </div>
      </div>
    </>
  );
};

export default Menu;
