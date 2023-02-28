import "./index.css";

import { ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";

import { useGetUserQuery } from "@/entities/user/model/api";
import { ColorModeContext } from "@/features/ThemeToggler/ThemeToggler";
import { Router } from "@/router";
import { useBasicTheme } from "@/shared/hooks/useBasicTheme";

function App() {
  const [theme, colorMode] = useBasicTheme();

  useGetUserQuery();

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
