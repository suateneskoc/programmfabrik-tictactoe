import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircleIcon, XLgIcon } from "../assets/svgs";
import {
  makeMove,
  checkResult,
  nextGame,
  moveOpponent,
} from "../features/gameSlice";

const GridButton = ({ xIndex, yIndex, value }) => {
  const game = useSelector((state) => state.game);
  const dispatch = useDispatch();
  const handleClick = () => {
    if (game.ended) {
      dispatch(nextGame());
    } else if (!game.turn || game.multiplayer) {
      dispatch(makeMove({ xIndex, yIndex }));
    }
  };

  if (value === "" && (!game.turn || game.multiplayer)) {
    return (
      <button
        className={`aspect-square group bg-gray-100 hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-800 rounded-md shadow dark:shadow-white/10 p-4 transition`}
        onClick={handleClick}
      >
        <div className="opacity-0 group-hover:opacity-10">
          {!game.turn ? (
            <XLgIcon className="w-full h-full" />
          ) : game.multiplayer ? (
            <CircleIcon className="w-full h-full" />
          ) : null}
        </div>
      </button>
    );
  }
  return (
    <button
      className={`aspect-square bg-gray-100 dark:bg-gray-900 rounded-md drop-shadow p-4 transition`}
      disabled={!game.ended}
      onClick={handleClick}
    >
      <div
        className={`${
          game.ended && !game.winningIndexes.includes([xIndex, yIndex])
            ? "opacity-25"
            : ""
        }`}
      >
        {value === "x" ? (
          <XLgIcon className="w-full h-full" />
        ) : value === "o" ? (
          <CircleIcon className="w-full h-full" />
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
          dispatch(moveOpponent());
        }, 750);
      }
    }, 250);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game.board]);

  useEffect(() => {}, [game]);
  return (
    <div className="grid gap-2 grid-cols-3 grid-rows-3 mb-5">
      {game.board.map((row, xIndex) => {
        return row.map((value, yIndex) => (
          <GridButton
            key={yIndex * 3 + xIndex}
            xIndex={xIndex}
            yIndex={yIndex}
            value={value}
          />
        ));
      })}
    </div>
  );
};

export default Grid;
