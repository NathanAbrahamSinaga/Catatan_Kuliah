import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import matakuliahReducer from './matakuliahSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    matakuliah: matakuliahReducer,
  },
})

export default store