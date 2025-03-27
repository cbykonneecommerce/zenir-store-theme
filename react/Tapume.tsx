import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCssHandles } from "vtex.css-handles";
import { ExtensionPoint } from "vtex.render-runtime";

import { STORE_CONFIG_ID } from "./ActiveStore";

import "./Global.css";

const CSS_HANDLES = ["tapumeWrapper"];

export default function Tapume({ children }: { children: React.ReactElement }) {
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(true);

  const { handles } = useCssHandles(CSS_HANDLES);

  useEffect(() => {
    async function getStore() {
      axios
        .get(`/api/dataentities/SC/documents/${STORE_CONFIG_ID}?_fields=active`)
        .then((res) => {
          if (res.data.active) {
            setActive(true);
          }

          setLoading(false);
        });
    }

    getStore();
  }, []);

  if (loading) {
    return <div />;
  }

  if (active) {
    return children;
  }

  return (
    <div className={handles.tapumeWrapper}>
      <ExtensionPoint id="image" />
    </div>
  );
}
