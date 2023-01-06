import { useState } from 'react'

const Blog = ({blog, updateBlog}) => {
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

  
  const increaseLikes = (e) => {
    e.preventDefault()
    const elId = e.target.id

    if(newBlog.id === elId) {
      const countLikes = newBlog.likes + 1
      setNewBlog({...newBlog, likes: countLikes} )
    }
    updateBlog(elId, newBlog)
    
    console.log(newBlog)
  }

  return (
    <div style={blogStyle} id={blog.id}>
      {blog.title} {blog.author}

      <button onClick={toggleViewDetails}>{buttonLable}</button>

      <div style={detailsStyle}>
        <div> {blog.url}</div>
        <div>likes: {blog.likes} <button id={blog.id} onClick={increaseLikes}>like</button></div>
        <div>{blog.author}</div>
      </div>
    </div>
  ) 
  }

export default Blog