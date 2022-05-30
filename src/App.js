import { useState } from "react";
import DarkModeSwitch from "./DarkModeSwitch";
import Grid from "./Grid";

const App = () => {
  const [darkMode, setDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  return (
    <div className={`${darkMode ? "dark" : null} `}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center">
        <div className="container bg-white dark:bg-black p-3">
          <DarkModeSwitch darkMode={darkMode} setDarkMode={setDarkMode} />
          <Grid />
        </div>
      </div>
    </div>
  );
};

export default App;
