/* eslint-disable no-console */
import React from "react";

import { useRuntime } from "vtex.render-runtime";
import { useSocioContext } from "../../CustomSocioTorcedorProvider";

export default function SocioProfileConditionChildren({
  children,
}: {
  children: React.ReactElement;
}) {
  const { loading, profile } = useSocioContext();
  const {
    route: { path },
  } = useRuntime();

  if (loading) {
    return <span />;
  }

  console.log('AQUIII', profile?.clubs)

  if (profile?.clubs?.stCeara && path.toLowerCase() === "/pagina-do-vozao") {
    return <span />;
  }

  if (profile?.clubs?.stFortaleza && path.toLowerCase() === "/pagina-do-leao") {
    return <span />;
  }
  if (profile?.clubs?.stFerroviaria && path.toLowerCase() === "/pagina-do-coral") {
    return <span />;
  }

  return children;
}
