import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPlayerName } from "./features/gameSlice";

const RealPlayerBoard = ({ index }) => {
  const game = useSelector((state) => state.game);
  const dispatch = useDispatch();
  const [name, setName] = useState(game.players[index].name);
  const [editing, setEditing] = useState(false);
  return (
    <div
      className={`${
        index === game.turn ? "bg-gray-100 dark:bg-gray-900" : ""
      } group flex flex-col items-center rounded-lg p-2 transition duration-500`}
    >
      <div className="flex justify-center items-center">
        {index ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
            className="mx-1"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
            className="mx-1"
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
          </svg>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
              </svg>
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
            game.turn ? "bg-gray-100 dark:bg-gray-900" : ""
          } rounded-lg flex flex-col items-center p-2 transition duration-500`}
        >
          <div className="flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
              className="mx-1"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            </svg>
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
