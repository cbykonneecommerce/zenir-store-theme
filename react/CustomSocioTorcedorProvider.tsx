import React, { createContext, useContext, useEffect, useMemo } from "react";
import { useQuery } from "react-apollo";
import { useRuntime } from "vtex.render-runtime";

import PROFILE_QUERY from "./graphql/profile.graphql";

interface Profile {
  email: string;
  firstName: string;
  lastName: string;
  clubs: Record<"stFortaleza" | "stCeara" | "stFerroviaria", boolean>;
}

export interface Data {
  profile: ProfileResponse;
}

export interface ProfileResponse {
  firstName: string;
  email: string;
  lastName: string;
  customFields: CustomField[];
}

export interface CustomField {
  cacheId: string;
  key: string;
  value: string;
}

export const SocioTorcedorContextProvider = createContext<{
  loading: boolean;
  profile: Profile | null;
}>({
  loading: false,
  profile: null,
});

export default function CustomSocioTorcedorProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  const { loading, data } = useQuery<Data>(PROFILE_QUERY, {
    ssr: false,
  });

  const { history } = useRuntime();

  const profile = useMemo(() => {
    if (data?.profile) {
      return {
        email: data.profile.email,
        firstName: data.profile.firstName,
        lastName: data.profile.lastName,
        clubs: data.profile.customFields.reduce((acc, current) => {
          acc[current.key as any] = current.value === "true";
          return acc;
        }, {} as any),
      };
    }

    return null;
  }, [data]);

  useEffect(() => {
    if (!loading && !profile) {
      history?.push(`?returnUrl=${window.location.pathname}`);
    }
  }, [history, loading, profile]);

  return (
    <SocioTorcedorContextProvider.Provider
      value={{
        loading,
        profile,
      }}
    >
      {children}
    </SocioTorcedorContextProvider.Provider>
  );
}

export const useSocioContext = () => {
  const context = useContext(SocioTorcedorContextProvider);

  if (!context) {
    throw new Error(
      "useSocioContext não pode ser usado fora de um SocioTorcedorContextProvider.Provider"
    );
  }

  return context;
};
