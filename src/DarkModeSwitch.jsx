import { FaMoon, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "./features/darkModeSlice";

const DarkModeSwitch = () => {
  const darkMode = useSelector((state) => state.darkMode);
  const dispatch = useDispatch();
  return (
    <button
      className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 bg-gray-100 hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-800 rounded-md p-3 transition"
      onClick={() => dispatch(toggleDarkMode())}
    >
      {darkMode ? <FaSun /> : <FaMoon />}
    </button>
  );
};

export default DarkModeSwitch;
