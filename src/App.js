import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PlayerSwitch from "./PlayerSwitch";
import DarkModeSwitch from "./DarkModeSwitch";
import Grid from "./Grid";

const App = () => {
  const darkMode = useSelector((state) => state.darkMode);
  const dispatch = useDispatch();

  return (
    <div className={`${darkMode ? "dark" : null} `}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center">
        <div className="container bg-white dark:bg-black p-3">
          <div className="flex justify-between">
            <h1>TicTacToe</h1>
            <div className="flex">
              <PlayerSwitch />
              <DarkModeSwitch />
            </div>
          </div>
          <Grid />
        </div>
      </div>
    </div>
  );
};

export default App;
