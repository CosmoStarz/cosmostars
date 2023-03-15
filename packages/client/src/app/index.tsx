import "./index.css";

import { ThemeProvider } from "@mui/material";
import React, { useEffect } from "react";

import { ColorModeContext } from "@/features/ThemeToggler/ThemeToggler";
import { Router } from "@/router";
import { useAuth } from "@/shared/hooks/useAuth";
import { useBasicTheme } from "@/shared/hooks/useBasicTheme";
import { BasicLayout } from "@/shared/layouts/BasicLayout";
import { LoaderView } from "@/shared/ui";
function App() {
  const [theme, colorMode] = useBasicTheme();
  const isLoadingAuth = false;

  // const { checkIsUserAuth, isLoadingAuth } = useAuth();

  // useEffect(() => {
  //   checkIsUserAuth();
  // }, []);

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
