import { configureStore } from "@reduxjs/toolkit";
import darkModeReducer from "./features/darkModeSlice";
import gameReducer from "./features/gameSlice";

export const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    game: gameReducer,
  },
});
