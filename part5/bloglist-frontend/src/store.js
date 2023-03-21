import { configureStore } from '@reduxjs/toolkit'

import blogReducer from './reducers/blogReducer'
import logginReducer from './reducers/logginReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
	reducer: {
		blogs: blogReducer,
		login: logginReducer,
		notification: notificationReducer,
		users: userReducer,
	},
})

export default store
