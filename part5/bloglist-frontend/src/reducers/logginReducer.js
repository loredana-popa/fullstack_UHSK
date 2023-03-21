import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const loginSlice = createSlice({
	name: 'loggin',
	initialState,
	reducers: {
		loginUser(state, action) {
			return (state = action.payload)
		},
		logoutUser(state) {
			state = initialState
			return state
		},
	},
})

export const { loginUser, logoutUser } = loginSlice.actions

export default loginSlice.reducer
