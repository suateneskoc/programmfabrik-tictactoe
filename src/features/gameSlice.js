import { createSlice } from "@reduxjs/toolkit";
import winningCombinations from "../data.json";

const initialState = {
  multiplayer: false,
  difficulty: "Easy",
  players: [
    { name: "Player 1", score: 0 },
    { name: "Player 2", score: 0 },
  ],
  ended: false,
  xStarted: true,
  xTurn: true,
  moveCount: 0,
  board: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  winningIndexes: [
    [-1, -1],
    [-1, -1],
    [-1, -1],
  ],
  history: [],
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    toggleMultiplayer: (state) => {
      state.multiplayer = !state.multiplayer;
      state.players[0].score = initialState.players[0].score;
      state.players[1].score = initialState.players[1].score;
      state.ended = initialState.ended;
      state.xStarted = initialState.xStarted;
      state.xTurn = initialState.xTurn;
      state.moveCount = initialState.moveCount;
      state.board = initialState.board;
      state.winningIndexes = initialState.winningIndexes;
      state.history = initialState.history;
    },
    setDifficulty: (state, { payload }) => {
      state.difficulty = payload;
    },
    setPlayerName: ({ players }, { payload }) => {
      players[payload.index].name = payload.name;
    },
    makeMove: (state, { payload }) => {
      if (state.board[payload.xIndex][payload.yIndex] !== "") {
        console.log("ERROR: tried to make a move on an occupied spot");
        return;
      }
      if (state.xTurn) {
        state.board[payload.xIndex][payload.yIndex] = "x";
      } else {
        state.board[payload.xIndex][payload.yIndex] = "o";
      }
      state.xTurn = !state.xTurn;
      state.moveCount++;
      state.history.push(payload);
    },
    checkResult: (state) => {
      if (state.ended) {
        return;
      }
      if (state.moveCount === 9) {
        state.ended = true;
      }
      for (let i = 0; i < winningCombinations.length; i++) {
        if (
          state.board[winningCombinations[i][0][0]][
            winningCombinations[i][0][1]
          ] === "x" &&
          state.board[winningCombinations[i][1][0]][
            winningCombinations[i][1][1]
          ] === "x" &&
          state.board[winningCombinations[i][2][0]][
            winningCombinations[i][2][1]
          ] === "x"
        ) {
          state.ended = true;
          state.players[0].score++;
          state.winningIndexes = [
            winningCombinations[i][0],
            winningCombinations[i][1],
            winningCombinations[i][2],
          ];
          return;
        }
        if (
          state.board[winningCombinations[i][0][0]][
            winningCombinations[i][0][1]
          ] === "o" &&
          state.board[winningCombinations[i][1][0]][
            winningCombinations[i][1][1]
          ] === "o" &&
          state.board[winningCombinations[i][2][0]][
            winningCombinations[i][2][1]
          ] === "o"
        ) {
          state.ended = true;
          state.players[1].score++;
          state.winningIndexes = [
            winningCombinations[i][0],
            winningCombinations[i][1],
            winningCombinations[i][2],
          ];
          return;
        }
      }
      state.winningIndexes = initialState.winningIndexes;
    },
    nextGame: (state) => {
      state.ended = false;
      state.xTurn = !state.xStarted;
      state.xStarted = !state.xStarted;
      state.moveCount = initialState.moveCount;
      state.board = initialState.board;
      state.winningIndexes = initialState.winningIndexes;
      state.history = initialState.history;
    },
    moveOpponent: (state) => {
      if (state.multiplayer || state.xTurn) {
        console.log("ERROR: tried to make a random move for an actual player");
        return;
      }
      if (state.ended || state.moveCount === 9) return;
      const makeOpponentMove = (xIndex, yIndex) => {
        state.board[xIndex][yIndex] = "o";
        state.xTurn = !state.xTurn;
        state.moveCount++;
        state.history.push({ xIndex, yIndex });
      };
      const makeRandomMove = () => {
        let i;
        do {
          i = Math.floor(Math.random() * 9);
        } while (state.board[Math.floor(i / 3)][i % 3] !== "");
        makeOpponentMove(Math.floor(i / 3), i % 3);
      };
      if (state.difficulty === "Easy") {
        makeRandomMove();
        return;
      }
      if (state.difficulty === "Normal") {
        let xCount;
        // Check if player is about to win
        for (let i = 0; i < winningCombinations.length; i++) {
          xCount = 0;
          for (let j = 0; j < 3; j++) {
            if (
              state.board[winningCombinations[i][j][0]][
                winningCombinations[i][j][1]
              ] === "o"
            )
              break;
            if (
              state.board[winningCombinations[i][j][0]][
                winningCombinations[i][j][1]
              ] === "x"
            )
              xCount++;
          }
          if (xCount === 2) {
            // Block the winning streak
            for (let j = 0; j < 3; j++) {
              if (
                state.board[winningCombinations[i][j][0]][
                  winningCombinations[i][j][1]
                ] === ""
              ) {
                makeOpponentMove(
                  winningCombinations[i][j][0],
                  winningCombinations[i][j][1]
                );
                return;
              }
            }
          }
        }
        makeRandomMove();
        return;
      }
      if (state.difficulty === "Hard") {
        const checkWinner = (board, moveCount) => {
          // 10: computer wins, -10: player winds, 0: tie, null: no winner at this state
          for (let i = 0; i < winningCombinations.length; i++) {
            if (
              board[winningCombinations[i][0][0]][
                winningCombinations[i][0][1]
              ] === "x" &&
              board[winningCombinations[i][1][0]][
                winningCombinations[i][1][1]
              ] === "x" &&
              board[winningCombinations[i][2][0]][
                winningCombinations[i][2][1]
              ] === "x"
            ) {
              return moveCount - 10;
            }
            if (
              board[winningCombinations[i][0][0]][
                winningCombinations[i][0][1]
              ] === "o" &&
              board[winningCombinations[i][1][0]][
                winningCombinations[i][1][1]
              ] === "o" &&
              board[winningCombinations[i][2][0]][
                winningCombinations[i][2][1]
              ] === "o"
            ) {
              return 10 - moveCount;
            }
          }
          if (moveCount === 9) return 0;
          return null;
        };

        const minimax = (board, moveCount, maximizing) => {
          let score = checkWinner(board, moveCount);
          if (score !== null) return score;
          let bestScore;
          if (maximizing) {
            bestScore = -Infinity;
            for (let i = 0; i < 3; i++) {
              for (let j = 0; j < 3; j++) {
                if (board[i][j] === "") {
                  board[i][j] = "o";
                  score = minimax(board, moveCount + 1, false);
                  board[i][j] = "";
                  bestScore = Math.max(score, bestScore);
                }
              }
            }
          } else {
            bestScore = Infinity;
            for (let i = 0; i < 3; i++) {
              for (let j = 0; j < 3; j++) {
                if (board[i][j] === "") {
                  board[i][j] = "x";
                  score = minimax(board, moveCount + 1, true);
                  board[i][j] = "";
                  bestScore = Math.min(score, bestScore);
                }
              }
            }
          }
          return bestScore;
        };

        let bestScore = -Infinity;
        let bestMove;
        // Calculate minimax value for each move
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            if (state.board[i][j] === "") {
              let nextBoard = [
                [...state.board[0]],
                [...state.board[1]],
                [...state.board[2]],
              ];
              nextBoard[i][j] = "o";
              let score = minimax(nextBoard, state.moveCount + 1, false);
              nextBoard[i][j] = "";
              if (score > bestScore) {
                bestScore = score;
                bestMove = [i, j];
              }
            }
          }
        }
        makeOpponentMove(bestMove[0], bestMove[1]);
        return;
      }
      console.log("ERROR: Game difficulty state is messed up.");
    },
    restartGame: ({ multiplayer, difficulty }) => {
      return {
        ...initialState,
        multiplayer: multiplayer,
        difficulty: difficulty,
      };
    },
    undoMove: ({ multiplayer, xTurn, moveCount, board, history }) => {
      if (!history.length) return;
      if (!multiplayer && history.length < 1) return;
      if (multiplayer) {
        const move = history.pop();
        board[move.xIndex][move.yIndex] = "";
        moveCount--;
        xTurn = !xTurn;
        return;
      }
      const moves = history.splice(history.length - 2, 2);
      board[moves[0].xIndex][moves[0].yIndex] = "";
      board[moves[1].xIndex][moves[1].yIndex] = "";
      moveCount -= 2;
    },
  },
});

export const {
  toggleMultiplayer,
  setDifficulty,
  setPlayerName,
  makeMove,
  checkResult,
  nextGame,
  moveOpponent,
  restartGame,
  undoMove,
} = gameSlice.actions;

export default gameSlice.reducer;
