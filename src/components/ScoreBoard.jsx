import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircleIcon, PencilFillIcon, XLgIcon } from "../assets/svgs";
import { setPlayerName } from "../features/gameSlice";

const RealPlayerBoard = ({ index }) => {
  const game = useSelector((state) => state.game);
  const dispatch = useDispatch();
  const [name, setName] = useState(game.players[index].name);
  const [editing, setEditing] = useState(false);
  return (
    <div
      className={`${
        (index === 0 && game.xTurn) || (index === 1 && !game.xTurn)
          ? "bg-gray-100 dark:bg-gray-900"
          : ""
      } group flex flex-col items-center rounded-lg p-2 transition duration-500`}
    >
      <div className="flex justify-center items-center">
        {index ? (
          <CircleIcon width={16} height={16} className="mx-1" />
        ) : (
          <XLgIcon width={16} height={16} className="mx-1" />
        )}
        {editing ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              dispatch(setPlayerName({ index: index, name: name }));
              setEditing(false);
            }}
          >
            <input
              type="text"
              value={name}
              className="text-xl font-medium block w-32 border-gray-300 focus:ring-gray-500 focus:border-gray-500 dark:border-gray-700 dark:bg-black shadow-sm rounded-md px-2 py-1.5"
              onChange={(e) => setName(e.target.value)}
              autoComplete="off"
            />
            <button type="submit" hidden />
          </form>
        ) : (
          <>
            <div className="text-xl font-medium w-24 px-2 py-1.5">
              {game.players[index].name}
            </div>
            <button
              className="opacity-0 group-hover:opacity-100 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 bg-gray-100 hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-800 rounded-full h-auto p-2 transition"
              onClick={() => setEditing(true)}
            >
              <PencilFillIcon width={16} height={16} />
            </button>
          </>
        )}
      </div>
      <div className="text-7xl">{game.players[index].score}</div>
    </div>
  );
};

const ScoreBoard = () => {
  const game = useSelector((state) => state.game);
  return (
    <div className="flex justify-evenly mb-5">
      <RealPlayerBoard index={0} />
      {game.multiplayer ? (
        <RealPlayerBoard index={1} />
      ) : (
        <div
          className={`${
            !game.xTurn ? "bg-gray-100 dark:bg-gray-900" : ""
          } rounded-lg flex flex-col items-center p-2 transition duration-500`}
        >
          <div className="flex justify-center items-center">
            <CircleIcon width={16} height={16} className="mx-1" />
            <div className="text-xl font-medium w-24 px-2 py-1.5 mr-8">
              {game.players[1].name}
            </div>
          </div>
          <div className="text-7xl">{game.players[1].score}</div>
        </div>
      )}
    </div>
  );
};

export default ScoreBoard;
