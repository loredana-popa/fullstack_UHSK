import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/blogForm'

import blogService from './services/blogs'
import loginServices from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState({text: null, status: null})
  const [newBlog, setNewBlog] = useState({title: '', author: '', url: ''})

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs =>
        setBlogs(blogs)
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
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    console.log('user is logged out')
    setUser(null)
  }

  const handleChange = (e) => {
    const {name, value} = e.target
    setNewBlog( (prev) => {
      return { ...prev, [name]: value}
    })
  }

  const addBlog = (e) => {
    e.preventDefault()
      const blogObject = {...newBlog}

      blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewBlog({
          title: '',
          author: '',
          url: ''
        })
        setMessage({
          ...message,
          text: `a new blog: ${newBlog.title} by ${newBlog.author} added`,
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
      
      <h2>create new</h2>
      
      <BlogForm 
        onChange={handleChange} 
        onSubmit={addBlog}
      />

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
