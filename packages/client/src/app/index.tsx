import "./index.css";

import { ThemeProvider } from "@mui/material";
import React, { useEffect, useRef } from "react";

import { useOAuth } from "@/features/Auth/YanedxOAuth/utils";
import { ColorModeContext } from "@/features/ThemeToggler/ThemeToggler";
import { Router } from "@/router";
import { useAuth } from "@/shared/hooks/useAuth";
import { useBasicTheme } from "@/shared/hooks/useBasicTheme";
import { BasicLayout } from "@/shared/layouts/BasicLayout";
import { LoaderView } from "@/shared/ui";

function App() {
  const { checkIsUserAuth, isLoadingAuth } = useAuth();
  const { yandexOAuth } = useOAuth();
  const [theme, colorMode] = useBasicTheme();
  const code =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("code")
      : undefined;
  const effectRan = useRef(false);
  useEffect(() => {
    if (!code && typeof window !== "undefined") {
      checkIsUserAuth();
    }
  }, []);
  useEffect(() => {
    if (code && !effectRan.current) {
      yandexOAuth(code);
    }
    return () => {
      effectRan.current = true;
    };
  }, []);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        {isLoadingAuth ? (
          <BasicLayout>
            <LoaderView />
          </BasicLayout>
        ) : (
          <Router />
        )}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
