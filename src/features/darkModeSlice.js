import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: window.matchMedia("(prefers-color-scheme: dark)").matches,
};

export const darkModeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.value = !state.value;
    },
  },
});

export const { toggleDarkMode } = darkModeSlice.actions;

export default darkModeSlice.reducer;
