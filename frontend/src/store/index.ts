import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import plansSlice from './slices/plansSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    plans: plansSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;