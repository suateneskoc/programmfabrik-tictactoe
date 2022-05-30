import { FaMoon, FaSun } from "react-icons/fa";

const DarkModeSwitch = ({ darkMode, setDarkMode }) => {
  const handleClick = () => {
    setDarkMode((prev) => !prev);
  };
  return (
    <button
      className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 bg-gray-100 hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-800 rounded-md p-3 transition"
      onClick={handleClick}
    >
      {darkMode ? <FaSun /> : <FaMoon />}
    </button>
  );
};

export default DarkModeSwitch;
