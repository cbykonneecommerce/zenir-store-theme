import React from "react";
import { useCssHandles } from "vtex.css-handles";

import { useSocioContext } from "./CustomSocioTorcedorProvider";

import "./Global.css";

const CSS_HANDLES = ["socioName"];

export default function SocioName() {
  const { handles } = useCssHandles(CSS_HANDLES);
  const { loading, profile } = useSocioContext();

  if (loading || !profile) {
    return <span />;
  }

  return (
    <span className={handles.socioName}>
      {profile.firstName || `${profile.email.substring(0, 10)}...`}
    </span>
  );
}
