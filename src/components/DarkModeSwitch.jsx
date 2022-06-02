import { useDispatch, useSelector } from "react-redux";
import { BrightnessHighFill, MoonFillIcon } from "../assets/svgs";
import { toggleDarkMode } from "../features/darkModeSlice";

const DarkModeSwitch = () => {
  const darkMode = useSelector((state) => state.darkMode.value);
  const dispatch = useDispatch();
  return (
    <button
      className="text-gray-500 hover:text-gray-800 bg-gray-50 hover:bg-gray-100 border border-gray-200 dark:hover:text-gray-200 dark:bg-gray-900 dark:hover:bg-gray-800 dark:border-gray-800 rounded-md p-3 transition"
      onClick={() => dispatch(toggleDarkMode())}
    >
      {darkMode ? (
        <BrightnessHighFill width={24} height={24} />
      ) : (
        <MoonFillIcon width={24} height={24} />
      )}
    </button>
  );
};

export default DarkModeSwitch;
