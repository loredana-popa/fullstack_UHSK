import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	showNotification,
	hideNotification,
} from './reducers/notificationReducer'
import { setBlogs, createBlog, initializeBlogs } from './reducers/blogReducer'
import { loginUser, logoutUser } from './reducers/logginReducer'
import { initializeUsers } from './reducers/userReducer'

import Blog from './components/Blog'
import Blogs from './components/Blogs'
import BlogForm from './components/blogForm'
import Togglable from './components/Togglable'
import User from './components/User'
import Users from './components/Users'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

import blogService from './services/blogs'

const App = () => {
	const blogFormRef = useRef()

	const dispatch = useDispatch()
	const blogs = useSelector(state => state.blogs)
	const user = useSelector(state => state.login)
	const users = useSelector(state => state.users)

	// fetch data about blogs from backend
	useEffect(() => {
		dispatch(initializeBlogs())
	}, [blogs.length])

	// fetch user info when logged in
	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			dispatch(loginUser(user))

			blogService.setToken(user.accessToken)
		}
	}, [])

	// fetch data about users from backend
	useEffect(() => {
		dispatch(initializeUsers())
	}, [])

	const handleLogout = () => {
		window.localStorage.removeItem('loggedBlogappUser')
		console.log('user is logged out')
		dispatch(logoutUser())
	}

	const addBlog = blogObject => {
		// console.log('hide blog form after creating a blog')
		blogFormRef.current.toggleVisibility()
		blogService
			.create(blogObject)
			.then(returnedBlog => {
				dispatch(createBlog(returnedBlog))
				dispatch(
					showNotification(
						`NEW_a new blog: ${blogObject.title} by ${blogObject.author} added`
					)
				),
					setTimeout(() => {
						dispatch(hideNotification())
					}, 5000)
			})

			.catch(
				error => dispatch(showNotification(`ERR_${error.response.data.error}`)),
				setTimeout(() => {
					dispatch(hideNotification())
				}, 5000)
			)
	}

	const updateBlog = (id, blogObject) => {
		const changedBlog = { ...blogObject }

		blogService
			.update(id, changedBlog)
			.then(
				() =>
					dispatch(
						setBlogs(blogs.map(blog => (blog.id !== id ? blog : changedBlog)))
					),
				dispatch(
					showNotification(
						`UPD_you liked: ${changedBlog.title} by ${changedBlog.author}`
					)
				),

				setTimeout(() => {
					dispatch(hideNotification())
				}, 5000)
			)
			.catch(error => {
				dispatch(showNotification(`ERR_${error.response.data.error}`)),
					setTimeout(() => {
						dispatch(hideNotification())
					}, 5000)
			})
	}

	const deleteBlog = (id, blogObject) => {
		const blogToDelete = { ...blogObject }

		blogService
			.remove(id, blogToDelete)
			.then(() => dispatch(setBlogs(blogs.filter(blog => blog.id !== id))))

			.catch(error => {
				dispatch(showNotification(`ERR_${error.response.data.error}`)),
					setTimeout(() => {
						dispatch(hideNotification())
					}, 5000)
			})
	}

	const addComment = (id, comment) => {
		blogService
			.createComment(id, comment)
			.then(returnedBlog =>
				dispatch(
					setBlogs(blogs.map(blog => (blog.id !== id ? blog : returnedBlog)))
				)
			)
			.catch(error => {
				dispatch(showNotification(`ERR_${error.response.data.error}`)),
					setTimeout(() => {
						dispatch(hideNotification())
					}, 5000)
			})
	}

	if (user === null) {
		return (
			<div>
				<Notification />
				<LoginForm />
			</div>
		)
	}

	const padding = {
		padding: 5,
	}
	return (
		<Router>
			<div>
				<Link style={padding} to='/blogs'>
					blogs
				</Link>
				<Link style={padding} to='/users'>
					users
				</Link>
				<em>
					{user.name} logged in
					<button onClick={handleLogout}>logout</button>
				</em>
			</div>
			<h2>blogs</h2>

			<Notification />

			<Togglable ref={blogFormRef}>
				<BlogForm createBlog={addBlog} />
			</Togglable>

			<Routes>
				<Route path='/users/:id' element={<User users={users} />} />
				<Route path='/users' element={<Users users={users} />} />
				<Route
					path='/blogs/:id'
					element={
						<Blog
							blogs={blogs}
							user={user}
							updateBlog={updateBlog}
							deleteBlog={deleteBlog}
							addComment={addComment}
						/>
					}
				/>
				<Route path='/blogs' element={<Blogs blogs={blogs} />} />
				<Route path='/' element={<Blogs blogs={blogs} />} />
			</Routes>
		</Router>
	)
}

export default App
