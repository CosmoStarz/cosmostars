import { useEffect } from "react";
import { ThemeProvider } from "@mui/material";
import { ColorModeContext } from "./features/ThemeToggler/ThemeToggler";
import { useBasicTheme } from "./shared/hooks/useBasicTheme";
import { baseUrl } from "./shared/constants";
import "./App.css";
import { GamePage } from "./pages/Game";

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
        {/* <div className="App">{`Вот тут будет жить ваше приложение :)`}</div> */}
        <GamePage />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
