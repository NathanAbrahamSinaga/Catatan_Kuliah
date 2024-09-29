import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchMatakuliahList } from '../services/api'

export const fetchMatakuliah = createAsyncThunk(
  'matakuliah/fetchMatakuliah',
  async () => {
    const response = await fetchMatakuliahList()
    return response
  }
)

const matakuliahSlice = createSlice({
  name: 'matakuliah',
  initialState: {
    matakuliah: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMatakuliah.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchMatakuliah.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.matakuliah = action.payload
      })
      .addCase(fetchMatakuliah.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default matakuliahSlice.reducer