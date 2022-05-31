import { createSlice } from "@reduxjs/toolkit";
import winningCombinations from "../data.json";

const initialState = {
  multiplayer: false,
  players: [
    { name: "Player 1", score: 0 },
    { name: "Player 2", score: 0 },
  ],
  ended: false,
  startTurn: 0,
  turn: 0,
  count: 0,
  board: ["", "", "", "", "", "", "", "", ""],
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
    setPlayerName: ({ players }, { payload }) => {
      players[payload.index].name = payload.name;
    },
    makeMove: (state, { payload }) => {
      if (state.board[payload] !== "") {
        console.log("ERROR: tried to make a random move for an actual player");
        return;
      }
      if (state.turn) {
        state.board[payload] = "o";
      } else {
        state.board[payload] = "x";
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
          state.board[winningCombinations[i][0]] === "x" &&
          state.board[winningCombinations[i][1]] === "x" &&
          state.board[winningCombinations[i][2]] === "x"
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
          state.board[winningCombinations[i][0]] === "o" &&
          state.board[winningCombinations[i][1]] === "o" &&
          state.board[winningCombinations[i][2]] === "o"
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
    makeRandomMove: (state) => {
      if (state.multiplayer || !state.turn) {
        console.log("ERROR: tried to make a random move for an actual player");
        return;
      }
      if (state.ended) return;
      let i;
      do {
        i = Math.floor(Math.random() * 9);
      } while (state.board[i] !== "");
      state.turn ? (state.board[i] = "o") : (state.board[i] = "x");
      state.turn = (state.turn + 1) % 2;
      state.count++;
      state.history.push(i);
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
      state.board[state.history.pop()] = "";
      state.count--;
      state.turn = (state.turn + 1) % 2;
    },
  },
});

export const {
  toggleMultiplayer,
  setPlayerName,
  makeMove,
  checkResult,
  nextGame,
  makeRandomMove,
  restartGame,
  undoMove
} = gameSlice.actions;

export default gameSlice.reducer;
