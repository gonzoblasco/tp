import { configureStore } from '@reduxjs/toolkit';
import deliverablesReducer from './slices/deliverablesSlice';

const store = configureStore({
  reducer: {
    deliverables: deliverablesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;