import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import {
  showNotification,
  hideNotification,
} from './reducers/notificationReducer'

import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/blogForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginServices from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('app rendered')
    blogService.getAll().then((blogs) =>
      setBlogs(
        blogs.sort((a, b) => {
          return b.likes - a.likes
        })
      )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.accessToken)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginServices.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.accessToken)
      setUser(user)

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
    setUser(null)
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog))
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
        (error) =>
          dispatch(showNotification(`ERR_${error.response.data.error}`)),
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
          setBlogs(blogs.map((blog) => (blog.id !== id ? blog : changedBlog))),
        dispatch(
          showNotification(
            `UPD_you liked: ${changedBlog.title} by ${changedBlog.author}`
          )
        ),

        setTimeout(() => {
          dispatch(hideNotification())
        }, 5000)
      )
      .catch((error) => {
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
      .then(() => setBlogs(blogs.filter((blog) => blog.id !== id)))
      .catch((error) => {
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
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>

          <div>
            password
            <input
              id='password'
              type='password'
              value={password}
              name='Password'
              onChange={(event) => setPassword(event.target.value)}
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

      {/* <Notification message={message} /> */}
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
          loggedUser={user.username}
        />
      ))}
    </div>
  )
}

export default App
