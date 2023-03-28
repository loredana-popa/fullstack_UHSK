import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState = []

const blogSlice = createSlice({
	name: 'blog',
	initialState,
	reducers: {
		// create a blog object and add it to the state array
		createBlog(state, action) {
			state.push(action.payload)
		},

		// replace the state array with a new one
		setBlogs(state, action) {
			return action.payload
		},
	},
})

export const initializeBlogs = () => {
	return async dispatch => {
		const blogs = await blogService.getAll()
		dispatch(setBlogs(blogs))
	}
}

export const { setBlogs, createBlog, createComment } = blogSlice.actions
export default blogSlice.reducer
