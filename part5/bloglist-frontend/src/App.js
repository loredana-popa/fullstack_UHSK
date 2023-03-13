import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	showNotification,
	hideNotification,
} from './reducers/notificationReducer'
import { setBlogs, createBlog } from './reducers/blogReducer'
import { loginUser, logoutUser } from './reducers/logginReducer'

import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/blogForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginServices from './services/login'

const App = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const blogFormRef = useRef()

	const dispatch = useDispatch()
	const blogs = useSelector(state => state.blogs)
	const user = useSelector(state => state.login)
	// console.log('logged user is', user)
	// console.log('initial blogs , array', blogs)

	// fetch data from backend
	useEffect(() => {
		blogService.getAll().then(blogs => dispatch(setBlogs(blogs)))
	}, [blogs.length])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			dispatch(loginUser(user))

			blogService.setToken(user.accessToken)
		}
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
			dispatch(loginUser({ ...user }))

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

	return (
		<div>
			<h2>blogs</h2>

			<Notification />

			<p>
				{user.name} logged in
				<button onClick={handleLogout}>logout</button>
			</p>

			<Togglable ref={blogFormRef}>
				<BlogForm createBlog={addBlog} />
			</Togglable>

			{blogs.map((blog, i) => (
				<Blog
					key={i}
					blog={blog}
					updateBlog={updateBlog}
					deleteBlog={deleteBlog}
					user={user}
				/>
			))}
		</div>
	)
}

export default App
