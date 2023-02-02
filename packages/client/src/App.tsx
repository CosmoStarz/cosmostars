import { useEffect } from "react";
import { ThemeProvider } from "@mui/material";
import { ColorModeContext } from "./features/ThemeToggler/ThemeToggler";
import { useBasicTheme } from "./shared/hooks/useBasicTheme";
import "./App.css";

function App() {
  const [theme, colorMode] = useBasicTheme();

  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
    };

    fetchServerData();
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <div className="App">{`Вот тут будет жить ваше приложение :)`}</div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
