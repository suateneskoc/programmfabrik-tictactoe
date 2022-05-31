import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPlayerName } from "./features/gameSlice";

const RealPlayerBoard = ({ index }) => {
  const players = useSelector((state) => state.game.players);
  const dispatch = useDispatch();
  const [name, setName] = useState(players[index].name);
  const [editing, setEditing] = useState(false);
  return (
    <div className="group flex flex-col items-center">
      <div className="flex justify-center items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 16"
          className="w-6 h-6 text-gray-500"
        >
          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
        </svg>
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
              className="text-xl font-medium focus:ring-indigo-500 focus:border-indigo-500 block w-32 shadow-sm border-gray-300 rounded-md"
              onChange={(e) => setName(e.target.value)}
              autoComplete="off"
            />
            <button type="submit" hidden />
          </form>
        ) : (
          <>
            <div className="text-xl font-medium w-24 px-3 py-2">
              {players[index].name}
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
      <div className="text-7xl">{players[index].score}</div>
    </div>
  );
};

const ScoreBoard = () => {
  const game = useSelector((state) => state.game);
  const dispatch = useDispatch();
  return (
    <div className="flex justify-evenly">
      <RealPlayerBoard index={0} />
      {game.multiplayer ? (
        <RealPlayerBoard index={1} />
      ) : (
        <div className="flex flex-col items-center">
          <div className="flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 16"
              className="w-6 h-6 text-gray-500"
            >
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            </svg>
            <div className="text-xl font-medium w-24 px-3 py-2 mr-8">
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
