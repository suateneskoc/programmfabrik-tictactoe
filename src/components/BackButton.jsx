import { useDispatch } from "react-redux";
import { ArrowLeftIcon } from "../assets/svgs";
import { undoMove } from "../features/gameSlice";

const BackButton = () => {
  const dispatch = useDispatch();
  return (
    <button
      className="text-gray-500 hover:text-gray-900 bg-gray-50 border border-gray-200 dark:text-gray-400 dark:hover:text-gray-100 hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800 dark:border-gray-800 rounded-md p-3 transition"
      onClick={() => dispatch(undoMove())}
    >
      <ArrowLeftIcon width={24} height={24}/>
    </button>
  );
};

export default BackButton;
