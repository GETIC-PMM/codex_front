import React, { useEffect, useMemo, useState } from "react";
import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "https://sso.mossoro.rn.gov.br/",
  realm: "dev",
  clientId: "rh",
});

export const KeycloakContext = React.createContext(
  {} as {
    keycloak: Keycloak;
    isInit: boolean;
  }
);

const AuthProviderKC = ({ children }: { children: React.ReactNode }) => {
  const isRun = useMemo(
    () => ({
      current: false,
    }),
    []
  );
  const [isInit, setIsInit] = useState(false);

  useEffect(() => {
    if (isRun.current) return;

    isRun.current = true;

    keycloak
      .init({
        onLoad: "login-required",
      })
      .then((auth) => {
        if (!auth) {
          window.location.reload();
        } else {
          console.info("Authenticated");
          localStorage.setItem("token", keycloak.token as string);
          setIsInit(true);
        }
      });
  }, []);

  return (
    <KeycloakContext.Provider value={{ keycloak, isInit }}>
      {children}
    </KeycloakContext.Provider>
  );
};

export default AuthProviderKC;
