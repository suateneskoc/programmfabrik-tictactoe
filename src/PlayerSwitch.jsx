import { FaUserAlt, FaUserFriends } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleMultiplayer } from "./features/gameSlice";

const PlayerSwitch = () => {
  const multiplayer = useSelector((state) => state.game.multiplayer);
  const dispatch = useDispatch();

  return (
    <button
      className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 bg-gray-100 hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-800 rounded-md p-3 mr-2 transition"
      onClick={() => dispatch(toggleMultiplayer())}
    >
      {multiplayer ? <FaUserAlt /> : <FaUserFriends />}
    </button>
  );
};

export default PlayerSwitch;
