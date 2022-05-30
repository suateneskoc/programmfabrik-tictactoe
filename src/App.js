import { useState } from "react";
import DarkModeSwitch from "./DarkModeSwitch";

const App = () => {
  const [darkMode, setDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  return (
    <div className={`${darkMode ? "dark" : null} `}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <DarkModeSwitch darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
    </div>
  );
};

export default App;
