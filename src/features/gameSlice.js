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
  startTurn: 0,
  turn: 0,
  count: 0,
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
      state.turn = initialState.turn;
      state.count = initialState.turn;
      state.board = initialState.board;
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
      if (state.turn) {
        state.board[payload.xIndex][payload.yIndex] = "o";
      } else {
        state.board[payload.xIndex][payload.yIndex] = "x";
      }
      state.turn = (state.turn + 1) % 2;
      state.count++;
      state.history.push(payload);
    },
    checkResult: (state) => {
      if (state.ended) {
        return;
      }
      let ended = false;
      if (state.count === 9) {
        ended = true;
      }
      let winningIndexes = initialState.winningIndexes;
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
          break;
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
          break;
        }
      }
    },
    nextGame: (state) => {
      state.ended = false;
      state.turn = (state.startTurn + 1) % 2;
      state.startTurn = (state.startTurn + 1) % 2;
      state.count = initialState.count;
      state.board = initialState.board;
      state.history = initialState.history;
    },
    moveOpponent: (state) => {
      if (state.multiplayer || !state.turn) {
        console.log("ERROR: tried to make a random move for an actual player");
        return;
      }
      if (state.ended || state.count === 9) return;
      const makeOpponentMove = (xIndex, yIndex) => {
        state.board[xIndex][yIndex] = "o";
        state.turn = (state.turn + 1) % 2;
        state.count++;
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
        const checkWinner = (board, count) => {
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
              return -10;
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
              return 10;
            }
          }
          if (count === 9) return 0;
          return null;
        };
        const minimax = (board, count, depth, maximizing) => {
          let score = checkWinner(board, count);
          if (score !== null) return score;
          if (maximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < 3; i++) {
              for (let j = 0; j < 3; j++) {
                if (board[i][j] === "") {
                  board[i][j] = "o";
                  let score = minimax(board, count + 1, depth + 1, false);
                  board[i][j] = "";
                  bestScore = Math.max(score - depth, bestScore);
                }
              }
            }
            return bestScore;
          } else {
            let bestScore = Infinity;
            for (let i = 0; i < 3; i++) {
              for (let j = 0; j < 3; j++) {
                if (board[i][j] === "") {
                  board[i][j] = "x";
                  let score = minimax(board, count + 1, depth + 1, true);
                  board[i][j] = "";
                  bestScore = Math.min(score + depth, bestScore);
                }
              }
            }
            return bestScore;
          }
        };
        let bestScore = -Infinity;
        console.log(bestScore);
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
              let score = minimax(nextBoard, state.count + 1, 0, false);
              nextBoard[i][j] = "";
              if (score > bestScore) {
                bestScore = score;
                bestMove = [i, j];
                console.log(bestMove);
              }
            }
          }
        }
        makeOpponentMove(bestMove[0], bestMove[1]);
        return;
      }
      console.log("ERROR: Game difficulty state is messed up.");
    },
    restartGame: (state) => {
      state.players[0].score = initialState.players[0].score;
      state.players[1].score = initialState.players[1].score;
      state.turn = initialState.turn;
      state.count = initialState.turn;
      state.board = initialState.board;
      state.history = initialState.history;
    },
    undoMove: (state) => {
      if (!state.history.length) return;
      if (!state.multiplayer && state.history.length < 1) return;
      if (state.multiplayer) {
        const move = state.history.pop();
        state.board[move.xIndex][move.yIndex] = "";
        state.count--;
        state.turn = (state.turn + 1) % 2;
        return;
      }
      const moves = state.history.splice(state.history.length - 2, 2);
      state.board[moves[0].xIndex][moves[0].yIndex] = "";
      state.board[moves[1].xIndex][moves[1].yIndex] = "";
      state.count -= 2;
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
