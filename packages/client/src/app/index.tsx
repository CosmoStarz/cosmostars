import { useEffect } from "react";
import { ThemeProvider } from "@mui/material";
import { ColorModeContext } from "@/features/ThemeToggler/ThemeToggler";
import { useBasicTheme } from "@/shared/hooks/useBasicTheme";
import { baseUrl } from "@/shared/constants";
import { Router } from "@/router";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { useGetUserInfoQuery } from "@/entities/user/model";

function App() {
  const [theme, colorMode] = useBasicTheme();

  useEffect(() => {
    // пример использования хука rtk query. он получит
    // пользователя и результат сохранит в стор
    useGetUserInfoQuery();

    const fetchServerData = async () => {
      const response = await fetch(baseUrl);
      const data = await response.json();
      console.log(data);
    };

    fetchServerData();
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
