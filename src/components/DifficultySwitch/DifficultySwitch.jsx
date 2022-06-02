import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircleFillIcon, CircleHalfIcon, CircleIcon } from "../../assets/svgs";
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
          <CircleIcon width={21} height={21} className="ml-2" />
        ) : difficulty === "Normal" ? (
          <CircleHalfIcon width={21} height={21} className="ml-2" />
        ) : (
          <CircleFillIcon width={21} height={21} className="ml-2" />
        )}
      </button>
      <DifficultyModal show={difficultyModal} setShow={setDifficultyModal} />
    </>
  );
};

export default DifficultySwitch;
