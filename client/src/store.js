import { configureStore } from '@reduxjs/toolkit';
import memeReducer from './slices/memeSlice';

const store = configureStore({
  reducer: {
    memes: memeReducer,
  },
});

export default store;
