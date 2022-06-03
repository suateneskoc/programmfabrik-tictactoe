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
      let winningIndexes = [];
      if (state.count === 9) {
        ended = true;
      }
      for (let i = 0; i < winningCombinations.length; i++) {
        if (
          state.board[
            (winningCombinations[i][0][0], winningCombinations[i][0][1])
          ] === "x" &&
          state.board[
            (winningCombinations[i][1][0], winningCombinations[i][1][1])
          ] === "x" &&
          state.board[
            (winningCombinations[i][2][0], winningCombinations[i][2][1])
          ] === "x"
        ) {
          ended = true;
          state.players[0].score++;
          winningIndexes = [
            winningCombinations[i][0],
            winningCombinations[i][1],
            winningCombinations[i][2],
          ];
          break;
        }
        if (
          state.board[
            (winningCombinations[i][0][0], winningCombinations[i][0][1])
          ] === "o" &&
          state.board[
            (winningCombinations[i][1][0], winningCombinations[i][1][1])
          ] === "o" &&
          state.board[
            (winningCombinations[i][2][0], winningCombinations[i][2][1])
          ] === "o"
        ) {
          ended = true;
          state.players[1].score++;
          winningIndexes = [
            winningCombinations[i][0],
            winningCombinations[i][1],
            winningCombinations[i][2],
          ];
          break;
        }
      }
      if (ended) {
        state.ended = true;
        state.winningIndexes = winningIndexes;
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
      if (state.ended) return;
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
