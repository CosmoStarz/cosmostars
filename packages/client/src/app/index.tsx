import "./index.css";

import { ThemeProvider } from "@mui/material";
import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

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
  const code = new URLSearchParams(window.location.search).get("code");

  useEffect(() => {
    checkIsUserAuth();
  }, []);
  useEffect(() => {
    if (code) {
      yandexOAuth(code);
    }
  });
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        {isLoadingAuth ? (
          <BasicLayout>
            <LoaderView />
          </BasicLayout>
        ) : (
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        )}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
