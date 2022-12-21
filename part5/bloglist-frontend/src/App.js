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
  const [errorMessage, setErrorMessage] = useState('')
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })


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
    console.log('logging in with', username, password)
  
    try {
      const user = await loginServices.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.accessToken)
      setUser(user)
      setUsername('')
      setPassword('')
      
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
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
    const blogObject = newBlog
    
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewBlog({
          title: '',
          author: '',
          url: ''
        })
      })
  }


  if (user === null) {
    return (
      <div>
        <Notification message={errorMessage} />
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
              <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target}) => setUsername(target.value)}
              />
          </div>
  
          <div>
            password
              <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
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
