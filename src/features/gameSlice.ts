import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isGameOver: false,
  gameMode: {
    minRadian: 190,
    maxRadian: 200,
    shotFrequency: 1000,
  },
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGameOver(state, action) {
      state.isGameOver = action.payload.isGameOver;
    },
    setGameMode(state, action) {
      state.gameMode.minRadian = action.payload.minRadian;
      state.gameMode.maxRadian = action.payload.maxRadian;
      state.gameMode.shotFrequency = action.payload.shotFrequency;
    },
  },
});

export const { setGameOver, setGameMode } = gameSlice.actions;
export default gameSlice.reducer;
