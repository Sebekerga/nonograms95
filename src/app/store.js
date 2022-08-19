import { configureStore } from '@reduxjs/toolkit';
import nonogramPuzzleReducer from '../features/nonogramPuzzleReducer';

export const store = configureStore({
  reducer: {
    game: nonogramPuzzleReducer
  },
});
