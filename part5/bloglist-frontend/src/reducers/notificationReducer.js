import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	content: null,
	status: null,
}
const notificationSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		hideNotification(state) {
			state = { ...initialState }
			return state
		},

		showNotification(state, action) {
			const content = action.payload
			const substr = content.substring(0, 4)
			const message = content.substring(4)

			switch (substr) {
				case 'NEW_':
					return (state = {
						...state,
						content: message,
						status: 'success',
					})

				case 'UPD_':
					return (state = {
						...state,
						content: message,
						status: 'success',
					})

				case 'ERR_':
					return (state = {
						...state,
						content: message,
						status: 'error',
					})

				default:
					return state
			}
		},
	},
})
export const { showNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer
