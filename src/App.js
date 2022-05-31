import { useDispatch, useSelector } from "react-redux";
import BackButton from "./BackButton";
import PlayerSwitch from "./PlayerSwitch";
import DarkModeSwitch from "./DarkModeSwitch";
import Grid from "./Grid";
import ScoreBoard from "./ScoreBoard";
import { restartGame } from "./features/gameSlice";

const App = () => {
  const darkMode = useSelector((state) => state.darkMode.value);
  const dispatch = useDispatch();

  return (
    <div className={`${darkMode ? "dark" : null} `}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex justify-center">
        <div className="container max-w-xl bg-white dark:bg-black p-4 sm:p-6">
          <div className="flex justify-between mb-3">
            <BackButton />
            <div className="flex">
              <PlayerSwitch />
              <DarkModeSwitch />
            </div>
          </div>
          <Grid />
          <ScoreBoard />
          <div className="flex justify-center">
            <button
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 bg-gray-100 hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-800 rounded-md px-4 py-2 transition"
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
