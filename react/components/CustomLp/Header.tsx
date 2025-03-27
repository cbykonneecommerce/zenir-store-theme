import React from "react";
import { useSocioContext } from "../../CustomSocioTorcedorProvider";
import "./global.css";

export interface HeaderProps {
  blockClass: string;
  logoSocio: string;
  logoZenir: string;
  backgroundColor: string;
  profileBg: string;
  profileFontColor: string;
}

const getName = (profile: any, loading: boolean): string => {
  if (!profile || loading) {
    return "Nome";
  }

  if (profile.firstName) {
    return profile.firstName;
  }

  return profile.email;
};

const Header: StorefrontFunctionComponent<HeaderProps> = ({
  blockClass,
  logoSocio,
  backgroundColor,
  profileFontColor,
  profileBg,
}) => {
  const { profile, loading } = useSocioContext();

  return (
    <div
      style={{ backgroundColor }}
      className={`${blockClass} header-lp-custom`}
    >
      <div>
        <div className="logo-container">
          <a href="/">
            <img src={logoSocio} alt="" />
          </a>
          <div className="barra" />
        </div>
        <span className="profile-name" style={{ backgroundColor: profileBg }}>
          <span className="icon-profile-header-lp">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="38"
              height="44"
              viewBox="0 0 38 44"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0.189453 34.3107C3.3533 27.2545 10.439 22.3395 18.6727 22.3395C26.9065 22.3395 33.9923 27.2546 37.1561 34.3108C32.924 39.8948 26.2196 43.5016 18.6728 43.5016C11.126 43.5016 4.42155 39.8947 0.189453 34.3107Z"
                fill="#D2D2D2"
              />
              <circle cx="18.6728" cy="10.43" r="9.894" fill="#D2D2D2" />
            </svg>
          </span>
          <span
            style={{
              color: profileFontColor,
            }}
          >
            {getName(profile, loading).substring(0, 10)}
          </span>
        </span>
      </div>
    </div>
  );
};

export default Header;
