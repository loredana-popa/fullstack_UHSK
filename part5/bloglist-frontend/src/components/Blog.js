import { useState } from 'react'

const Blog = ({blog, key}) => {
  const [showDetails, setShowDetails] = useState(false)
  const [buttonLable, setButtonLable] = useState('view')

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

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}

      <button onClick={toggleViewDetails}>{buttonLable}</button>

      <div style={detailsStyle}>
        <div>http: {blog.url}</div>
        <div>likes {blog.likes} <button>like</button></div>
        <div>{blog.author}</div>
      </div>
    </div>
  ) 
  }

export default Blog