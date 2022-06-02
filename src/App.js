import { useDispatch, useSelector } from "react-redux";
import BackButton from "./components/BackButton";
import DifficultySwitch from "./components/DifficultySwitch/DifficultySwitch";
import PlayerSwitch from "./components/PlayerSwitch";
import DarkModeSwitch from "./components/DarkModeSwitch";
import Grid from "./components/Grid";
import ScoreBoard from "./components/ScoreBoard";
import { restartGame } from "./features/gameSlice";

const App = () => {
  const darkMode = useSelector((state) => state.darkMode.value);
  const dispatch = useDispatch();

  return (
    <div className={`${darkMode ? "dark" : null} `}>
      <div className="min-h-screen bg-gray-50 text-gray-900 dark:text-gray-100 dark:bg-gray-900 flex justify-center">
        <div className="container max-w-xl bg-white border-x border-gray-100 dark:bg-black dark:border-gray-800 p-4 sm:p-7">
          <div className="flex justify-between mb-4">
            <BackButton />
            <div className="flex">
              <DifficultySwitch />
              <PlayerSwitch />
              <DarkModeSwitch />
            </div>
          </div>
          <Grid />
          <ScoreBoard />
          <div className="flex justify-center">
            <button
              className="text-gray-500 hover:text-gray-800 bg-gray-50 hover:bg-gray-100 border border-gray-200 dark:hover:text-gray-200 dark:bg-gray-900 dark:hover:bg-gray-800 dark:border-gray-800 rounded-md px-4 py-2 transition"
              onClick={() => dispatch(restartGame())}
            >
              Restart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
