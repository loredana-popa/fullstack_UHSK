import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	showNotification,
	hideNotification,
} from './reducers/notificationReducer'
import { setBlogs, createBlog, initializeBlogs } from './reducers/blogReducer'
import { loginUser, logoutUser } from './reducers/logginReducer'
import { initializeUsers } from './reducers/userReducer'

import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/blogForm'
import Togglable from './components/Togglable'
import User from './components/User'

import blogService from './services/blogs'
import loginServices from './services/login'

const App = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const blogFormRef = useRef()

	const dispatch = useDispatch()
	const blogs = useSelector(state => state.blogs)
	const user = useSelector(state => state.login)
	const users = useSelector(state => state.users)
	console.log('users arr is', users)

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

	const handleLogin = async event => {
		event.preventDefault()

		try {
			const user = await loginServices.login({
				username,
				password,
			})

			window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
			blogService.setToken(user.accessToken)
			dispatch(loginUser(user))

			//clear all input values in the form
			setUsername('')
			setPassword('')
		} catch (exception) {
			dispatch(showNotification('ERR_Wrong credentials')),
				setTimeout(() => {
					dispatch(hideNotification())
					setUsername('')
					setPassword('')
				}, 5000)
		}
	}

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

	const Users = () => {
		return (
			<div>
				<h1>Users</h1>
				<ul>
					{users.map(user => (
						<li key={user.id}>
							<Link to={`/users/${user.id}`}>
								{user.name} {user.blogs.length}
							</Link>
						</li>
					))}
				</ul>
			</div>
		)
	}

	const Blogs = ({ blogs }) => {
		const style = {
			paddingTop: 10,
			paddingLeft: 2,
			border: 'solid',
			borderWidth: 1,
			marginBottom: 5,
		}
		return (
			<div>
				{blogs.map(blog => (
					<div key={blog.id} style={style}>
						<Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
					</div>
				))}
			</div>
		)
	}

	if (user === null) {
		return (
			<div>
				<Notification />

				<h2>Log in to application</h2>

				<form onSubmit={handleLogin}>
					<div>
						username
						<input
							id='username'
							type='text'
							value={username}
							name='Username'
							onChange={event => setUsername(event.target.value)}
						/>
					</div>

					<div>
						password
						<input
							id='password'
							type='password'
							value={password}
							name='Password'
							onChange={event => setPassword(event.target.value)}
						/>
					</div>

					<button id='login-button' type='submit'>
						login
					</button>
				</form>
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
			</div>
			<h2>blogs</h2>

			<Notification />

			<p>
				{user.name} logged in
				<button onClick={handleLogout}>logout</button>
			</p>

			<Togglable ref={blogFormRef}>
				<BlogForm createBlog={addBlog} />
			</Togglable>

			<Routes>
				<Route path='/users/:id' element={<User users={users} />} />
				<Route path='/users' element={<Users />} />
				<Route
					path='/blogs/:id'
					element={
						<Blog
							blogs={blogs}
							updateBlog={updateBlog}
							deleteBlog={deleteBlog}
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
