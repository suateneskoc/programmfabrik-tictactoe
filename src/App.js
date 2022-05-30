import { useState } from "react";
import PlayerSwitch from "./PlayerSwitch";
import DarkModeSwitch from "./DarkModeSwitch";
import Grid from "./Grid";

const App = () => {
  const [multiplayer, setMultiplayer] = useState(false);
  const [darkMode, setDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  return (
    <div className={`${darkMode ? "dark" : null} `}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center">
        <div className="container bg-white dark:bg-black p-3">
          <div className="flex justify-between">
            <h1>TicTacToe</h1>
            <div className="flex">
              <PlayerSwitch
                multiplayer={multiplayer}
                setMultiplayer={setMultiplayer}
              />
              <DarkModeSwitch darkMode={darkMode} setDarkMode={setDarkMode} />
            </div>
          </div>
          <Grid />
        </div>
      </div>
    </div>
  );
};

export default App;
