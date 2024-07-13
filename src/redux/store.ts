import { configureStore } from '@reduxjs/toolkit'
import authReducer  from '../features/auth/auth'
import mediaReducer from '../features/media/media'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    media: mediaReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch