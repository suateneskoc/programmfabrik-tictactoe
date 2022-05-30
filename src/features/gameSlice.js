import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  multiplayer: false,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    toggleMultiplayer: (state) => {
      state.multiplayer = !state.multiplayer;
    },
  },
});

export const { toggleMultiplayer } = gameSlice.actions;

export default gameSlice.reducer;
