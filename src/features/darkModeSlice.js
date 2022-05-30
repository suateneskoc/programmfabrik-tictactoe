import { createSlice } from "@reduxjs/toolkit";

const initialState = window.matchMedia("(prefers-color-scheme: dark)").matches;

export const darkModeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state = !state;
    },
  },
});

export const { toggleDarkMode } = darkModeSlice.actions;

export default darkModeSlice.reducer;
