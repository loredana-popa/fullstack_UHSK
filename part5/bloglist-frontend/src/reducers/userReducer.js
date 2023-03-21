import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const initialState = []

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		// replace the state array with a new one
		setUsers(state, action) {
			return action.payload
		},
	},
})

export const initializeUsers = () => {
	return async dispatch => {
		const users = await userService.getAll()
		dispatch(setUsers(users))
	}
}

export const { setUsers } = userSlice.actions
export default userSlice.reducer
