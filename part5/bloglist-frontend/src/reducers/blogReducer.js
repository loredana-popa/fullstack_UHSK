import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const blogSlice = createSlice({
	name: 'blog',
	initialState,
	reducers: {
		// create a blog object
		createBlog(state, action) {
			const content = action.payload
			console.log(content)
			state.push({
				title: content.title,
				author: content.author,
				url: content.url,
				likes: content.likes,
				user: content.user,
			})
		},
		// add the new created blog to the state array
		appendBlog(state, action) {
			state.push(action.payload)
		},
		//
		setBlogs(state, action) {
			return action.payload
		},
	},
})
export const { createBlog, appendBlog, setBlogs } = blogSlice.actions
export default blogSlice.reducer
