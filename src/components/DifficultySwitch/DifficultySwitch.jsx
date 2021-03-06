import { useState } from "react";
import { useSelector } from "react-redux";
import { CircleFillIcon, CircleHalfIcon, CircleIcon } from "../../assets/svgs";
import DifficultyModal from "./DifficultyModal";

const DifficultySwitch = () => {
  const game = useSelector((state) => state.game);
  const [difficultyModal, setDifficultyModal] = useState(false);
  return (
    <>
      <button
        className={`font-semibold text-gray-500 hover:text-gray-800 bg-gray-50 hover:bg-gray-100 border border-gray-200 dark:hover:text-gray-200 dark:bg-gray-900 dark:hover:bg-gray-800 dark:border-gray-800 rounded-md flex items-center p-3 mr-3 transition ${
          game.multiplayer ? "opacity-0" : ""
        }`}
        onClick={() => setDifficultyModal(true)}
      >
        {game.difficulty}
        {game.difficulty === "Easy" ? (
          <CircleIcon width={21} height={21} className="ml-2" />
        ) : game.difficulty === "Normal" ? (
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
