import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link,
	// useNavigate,
	Navigate,
} from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	showNotification,
	hideNotification,
} from './reducers/notificationReducer'
import { setBlogs, createBlog, initializeBlogs } from './reducers/blogReducer'
import { loginUser, logoutUser } from './reducers/logginReducer'
import { initializeUsers } from './reducers/userReducer'

import Home from './components/Home'
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
	// const navigate = useNavigate()
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

	const handleMessageDisplay = message => {
		// save notification
		dispatch(showNotification(message))
		// reset notification
		setTimeout(() => {
			dispatch(hideNotification())
		}, 5000)
	}

	const handleLogout = () => {
		window.localStorage.removeItem('loggedBlogappUser')
		console.log('user is logged out')
		dispatch(logoutUser())
		// navigate('/login')
	}

	const addBlog = blogObject => {
		// console.log('hide blog form after creating a blog')
		blogFormRef.current.toggleVisibility()
		blogService
			.create(blogObject)
			.then(returnedBlog => {
				dispatch(createBlog(returnedBlog))
				handleMessageDisplay(
					`NEW_a new blog: ${blogObject.title} by ${blogObject.author} added`
				)
			})

			.catch(error => handleMessageDisplay(`ERR_${error.response.data.error}`))
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

				handleMessageDisplay(
					`UPD_you liked: ${changedBlog.title} by ${changedBlog.author}`
				)
			)
			.catch(error => {
				handleMessageDisplay(`ERR_${error.response.data.error}`)
			})
	}

	const deleteBlog = (id, blogObject) => {
		const blogToDelete = { ...blogObject }

		blogService
			.remove(id, blogToDelete)
			.then(() => dispatch(setBlogs(blogs.filter(blog => blog.id !== id))))

			.catch(error => {
				handleMessageDisplay(`ERR_${error.response.data.error}`)
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
				handleMessageDisplay(`ERR_${error.response.data.error}`)
			})
	}

	// if (user === null) {
	// 	return (
	// 		<Router>
	// 			<Notification />
	// 			<Routes>
	// 				<Route path='/login' element={<LoginForm />} />
	// 			</Routes>
	// 		</Router>
	// 	)
	// }

	const padding = {
		padding: 5,
	}
	return (
		<div className='container'>
			<Router>
				<Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
					<Navbar.Toggle aria-controls='responsive-navbar-nav' />
					<Navbar.Collapse id='responsive-navbar-nav'>
						<Nav className='me-auto'>
							<Nav.Link href='#' as='span'>
								<Link style={padding} to='/'>
									home
								</Link>
							</Nav.Link>
							<Nav.Link href='#' as='span'>
								<Link style={padding} to='/blogs'>
									blogs
								</Link>
							</Nav.Link>
							<Nav.Link href='#' as='span'>
								<Link style={padding} to='/users'>
									users
								</Link>
							</Nav.Link>
							<Nav.Link href='#' as='span'>
								{user ? (
									<em style={padding}>
										{user.name} logged in
										<button onClick={handleLogout}>logout</button>
									</em>
								) : (
									<Link style={padding} to='/login'>
										login
									</Link>
								)}
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Navbar>

				<Notification />

				<Togglable ref={blogFormRef}>
					<BlogForm createBlog={addBlog} />
				</Togglable>

				<Routes>
					<Route path='/users/:id' element={<User users={users} />} />
					<Route
						path='/users'
						element={
							user ? <Users users={users} /> : <Navigate replace to='/login' />
						}
					/>
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
					<Route
						path='/blogs'
						element={
							user ? <Blogs blogs={blogs} /> : <Navigate replace to='/login' />
						}
					/>
					<Route path='/login' element={<LoginForm />}></Route>
					<Route path='/' element={<Home />} />
				</Routes>
			</Router>
		</div>
	)
}

export default App
