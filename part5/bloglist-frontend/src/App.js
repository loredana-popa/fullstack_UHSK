import { useState, useEffect, useRef } from 'react'

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
  const [message, setMessage] = useState({text: null, status: null})
  const blogFormRef = useRef()

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs =>
        setBlogs(blogs.sort((a, b) => {
          return b.likes - a.likes
        }))
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

  const handleLogin = async (event) =>{
    event.preventDefault()
  
    try {
      const user = await loginServices.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.accessToken)
      setUser(user)

      //clear all input values in the form
      setUsername('')
      setPassword('')

    } catch (exception) {
      setMessage({
        ...message,
         text: 'Wrong credentials',
         status: true})

      //reset the error message   
      setTimeout(() => {
        setMessage({
          ...message,
          text: null,
          status: null
        })

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
    .then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setMessage({
        ...message,
        text: `a new blog: ${blogObject.title} by ${blogObject.author} added`,
        status: 'success'
      })
      setTimeout(() => {
        setMessage({
          ...message,
          text: null,
          status: null
          })
      }, 5000)
    })
      
    .catch (error =>
      setMessage({
        ...message,
        text: error.response.data.error,
        status: 'error'
      }),
      setTimeout(() => {
        setMessage({
          ...message,
          text: null,
          status: null
        })
        
      }, 5000)
    )
  }

  const updateBlog = (id, blogObject) => {
    const changedBlog = {...blogObject}

    blogService
      .update(id, changedBlog)
      .then(
        setBlogs(blogs.map(blog => blog.id !== id ? blog : changedBlog))
      )
      .catch(error => {
        setMessage({
          ...message,
          text: error.response.data.error,
          status: 'error'})

        setTimeout(() => {
          setMessage({
            ...message,
            text: null,
            status: null
          })
        }, 5000)
        // setBlogs(blogs.filter(b => b.id !== id))
      })
  }


  if (user === null) {
    return (
      <div>
        <Notification message={message} />

        <h2>Log in to application</h2>

        <form onSubmit={handleLogin}>
          <div>
            username
              <input
              type="text"
              value={username}
              name="Username"
              onChange={event => setUsername(event.target.value)}
              />
          </div>
  
          <div>
            password
              <input
              type="password"
              value={password}
              name="Password"
              onChange={event => setPassword(event.target.value)}
              />
          </div>
  
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification 
        message={message}
      />

      <p>{user.name} logged in 
        <button onClick={handleLogout}>logout</button>
      </p> 
    
      <Togglable ref = {blogFormRef}>
        <BlogForm 
          createBlog={addBlog}
        />
      </Togglable>

      {blogs.map((blog, i) =>
        <Blog key={i} blog={blog} updateBlog={updateBlog}/>
      )}
    </div>
  )
}

export default App
