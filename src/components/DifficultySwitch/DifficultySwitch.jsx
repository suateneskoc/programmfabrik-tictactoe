import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DifficultyModal from "./DifficultyModal";

const DifficultySwitch = () => {
  const difficulty = useSelector((state) => state.game.difficulty);
  const dispatch = useDispatch();
  const [difficultyModal, setDifficultyModal] = useState(true);
  return (
    <>
      <button
        className="font-semibold text-gray-500 hover:text-gray-800 bg-gray-50 hover:bg-gray-100 border border-gray-200 dark:hover:text-gray-200 dark:bg-gray-900 dark:hover:bg-gray-800 dark:border-gray-800 rounded-md flex items-center p-3 mr-3 transition"
        onClick={() => dispatch(setDifficultyModal(true))}
      >
        {difficulty}
        {difficulty === "Easy" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="21"
            fill="currentColor"
            viewBox="0 0 16 16"
            className="ml-2"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
          </svg>
        ) : difficulty === "Normal" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="21"
            fill="currentColor"
            viewBox="0 0 16 16"
            className="ml-2"
          >
            <path d="M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="21"
            fill="currentColor"
            viewBox="0 0 16 16"
            className="ml-2"
          >
            <circle cx="8" cy="8" r="8" />
          </svg>
        )}
      </button>
      <DifficultyModal show={difficultyModal} setShow={setDifficultyModal} />
    </>
  );
};

export default DifficultySwitch;
