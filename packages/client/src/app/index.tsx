import "./index.css";

import { ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";

import { ColorModeContext } from "@/features/ThemeToggler/ThemeToggler";
import { Router } from "@/router";
import { useBasicTheme } from "@/shared/hooks/useBasicTheme";

function App() {
  const [theme, colorMode] = useBasicTheme();

  // пример использования хука rtk query. он получит
  // пользователя и результат сохранит в стор

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
