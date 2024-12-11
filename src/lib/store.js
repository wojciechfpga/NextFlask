import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice';
export const store = () => {
  return configureStore({
    reducer: {
      auth:authReducer,
    }
  })
}