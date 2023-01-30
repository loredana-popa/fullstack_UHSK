import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterReducer(state, action){
      const filterText = action.payload
      state = filterText
      return state
    }
  }
})

export const { filterReducer } = filterSlice.actions
export default filterSlice.reducer 

