import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlices/authSlice';
import todoReducer from './slices/todoSlices/todoSlice';
import { apiSlice } from './slices/apiSlice';

const store = configureStore({
  reducer: {
    auth: authReducer, 
    todo: todoReducer,
    [apiSlice.reducerPath]: apiSlice.reducer 
  },
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
});

export default store;
