import { useEffect } from "react";
import { ThemeProvider } from "@mui/material";
import { ColorModeContext } from "./features/ThemeToggler/ThemeToggler";
import { useBasicTheme } from "./shared/hooks/useBasicTheme";
import { baseUrl } from "./shared/constants";
import "./App.css";
import { Router } from "./router";
import { BrowserRouter } from "react-router-dom";


function App() {
  const [theme, colorMode] = useBasicTheme();

  useEffect(() => {
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
