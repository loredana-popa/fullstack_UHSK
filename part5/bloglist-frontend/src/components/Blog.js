import { useState } from 'react'

const Blog = ({blog, updateBlog, deleteBlog, loggedUser}) => {
  const [showDetails, setShowDetails] = useState(false)
  const [buttonLable, setButtonLable] = useState('view')
  const [newBlog, setNewBlog] = useState({...blog})

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const detailsStyle =  showDetails ? {display: '' } : {display: 'none'} 

  const toggleViewDetails = () => {
    setShowDetails(!showDetails)
    showDetails ? setButtonLable('view') : setButtonLable('hide')
  }

  //show delete button only for blogs created by the logged in user
  const showDeleteButton = loggedUser === newBlog.user.username
    ? {display: '' } 
    : {display: 'none'} 
  
  
  const increaseLikes = (e) => {
    e.preventDefault()
    const elId = newBlog.id

    if(newBlog.id === elId) {
      const nrLikes = newBlog.likes + 1
      setNewBlog({...newBlog, likes: nrLikes} )
    }
    updateBlog(elId, newBlog)
    console.log('update blog', elId, newBlog)
  }


  const removeBlog = (e) => {
    e.preventDefault()
    const elId = newBlog.id

    
    if(window.confirm(`Remove blog ${newBlog.title} by ${newBlog.author}`)) {
      deleteBlog(elId, newBlog)
    }
  }
  

  return (
    <div style={blogStyle} >
      {blog.title} {blog.author}

      <button onClick={toggleViewDetails}>{buttonLable}</button>

      <div style={detailsStyle} id={blog.id}>
        <div> {blog.url}</div>

        <div>likes: {blog.likes} 
          <button onClick={increaseLikes}>like</button>
        </div>

        <div>{blog.author}</div>

        <div style={showDeleteButton}>
          <button onClick={removeBlog}>remove</button>
        </div>

      </div>
    </div>
  ) 
  }

export default Blog