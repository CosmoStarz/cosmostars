import "./index.css";

import { ThemeProvider } from "@mui/material";
import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import { ColorModeContext } from "@/features/ThemeToggler/ThemeToggler";
import { Router } from "@/router";
import { useAuth } from "@/shared/hooks/useAuth";
import { useBasicTheme } from "@/shared/hooks/useBasicTheme";
function App() {
  const [theme, colorMode] = useBasicTheme();

  const { checkIsUserAuth} = useAuth();

  useEffect(() => {
    checkIsUserAuth();
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
