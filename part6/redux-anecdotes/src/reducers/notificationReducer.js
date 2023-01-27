import { createSlice } from '@reduxjs/toolkit'

const initialState = 'Some text here ....'

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      return state
    }
  }

})

export const { showNotification } = notificationSlice.actions
export default notificationSlice.reducer