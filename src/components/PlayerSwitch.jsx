import { useDispatch, useSelector } from "react-redux";
import { PeopleFillIcon, PersonFillIcon } from "../assets/svgs";
import { toggleMultiplayer } from "../features/gameSlice";

const PlayerSwitch = () => {
  const multiplayer = useSelector((state) => state.game.multiplayer);
  const dispatch = useDispatch();

  return (
    <button
      className="text-gray-500 hover:text-gray-800 bg-gray-50 hover:bg-gray-100 border border-gray-200 dark:hover:text-gray-200 dark:bg-gray-900 dark:hover:bg-gray-800 dark:border-gray-800 rounded-md p-3 mr-3 transition"
      onClick={() => dispatch(toggleMultiplayer())}
    >
      {multiplayer ? (
        <PersonFillIcon width={24} height={24} />
      ) : (
        <PeopleFillIcon width={24} height={24} />
      )}
    </button>
  );
};

export default PlayerSwitch;
