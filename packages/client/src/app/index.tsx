import "./index.css";

import { ThemeProvider } from "@mui/material";
import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import { useGetUserInfoQuery } from "@/entities/user/model";
import { ColorModeContext } from "@/features/ThemeToggler/ThemeToggler";
import { Router } from "@/router";
import { baseUrl } from "@/shared/constants";
import { useBasicTheme } from "@/shared/hooks/useBasicTheme";

function App() {
  const [theme, colorMode] = useBasicTheme();

  // пример использования хука rtk query. он получит
  // пользователя и результат сохранит в стор
  useGetUserInfoQuery();

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
