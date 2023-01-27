import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    hideNotification(state, action) {
      return state = initialState
    },

    showNotification(state, action) {
      if(action.payload.startsWith('NEW_')) {
        const substr = action.payload.substring(4)
        return state = `you added: ${substr}`
      } else if (action.payload.startsWith('VOTED_')) {
          const substr = action.payload.substring(6)
        return state = `you voted: ${substr}`
      }
      return state
    } 
  }

})

export const { showNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer

