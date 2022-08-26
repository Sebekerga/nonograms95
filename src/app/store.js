// declaration of redux stores

import { configureStore } from '@reduxjs/toolkit';
import nonogramPuzzleReducer from '../features/nonogramPuzzleReducer';
import windowsReducer from '../features/windowsReducer'

export const store = configureStore({
  reducer: {
    game: nonogramPuzzleReducer,
    windows: windowsReducer
  },
});
