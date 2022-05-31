import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  makeMove,
  checkResult,
  nextGame,
  makeRandomMove,
} from "./features/gameSlice";

const GridButton = ({ index, value }) => {
  const game = useSelector((state) => state.game);
  const dispatch = useDispatch();
  const handleClick = () => {
    if (game.ended) {
      dispatch(nextGame());
    } else if (!game.turn || game.multiplayer) {
      dispatch(makeMove(index));
    }
  };
  if (value === "" && (!game.turn || game.multiplayer)) {
    return (
      <button
        className={`aspect-square group bg-gray-100 hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-800 rounded-md p-4 transition`}
        onClick={handleClick}
      >
        <div className="opacity-0 group-hover:opacity-25">
          {!game.turn ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="w-full h-full"
              viewBox="0 0 16 16"
            >
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
            </svg>
          ) : game.multiplayer ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="w-full h-full"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            </svg>
          ) : null}
        </div>
      </button>
    );
  }
  return (
    <button
      className={`aspect-square bg-gray-100 dark:bg-gray-900 rounded-md p-4 transition`}
      disabled={!game.ended}
      onClick={handleClick}
    >
      <div
        className={`${
          game.ended && !game.winningIndexes.includes(index) ? "opacity-25" : ""
        }`}
      >
        {value === "x" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-x-lg w-full h-full"
            viewBox="0 0 16 16"
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
          </svg>
        ) : value === "o" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-circle w-full h-full"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
          </svg>
        ) : null}
      </div>
    </button>
  );
};

const Grid = () => {
  const game = useSelector((state) => state.game);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkResult());
    setTimeout(() => {
      if (!game.ended && !game.multiplayer && game.turn) {
        setTimeout(() => {
          dispatch(makeRandomMove());
        }, 750);
      }
    }, 250);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game.board]);

  useEffect(() => {}, [game]);
  return (
    <div className="grid gap-2 grid-cols-3 grid-rows-3 mb-5">
      {game.board.map((value, index) => {
        return <GridButton key={index} index={index} value={value} />;
      })}
    </div>
  );
};

export default Grid;
