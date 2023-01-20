import { useState } from 'react'
// import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, deleteBlog, loggedUser }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [buttonLable, setButtonLable] = useState('view details')
  const [newBlog, setNewBlog] = useState({ ...blog })

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const detailsStyle =  showDetails ? { display: '' } : { display: 'none' }

  const toggleViewDetails = () => {
    setShowDetails(!showDetails)
    showDetails ? setButtonLable('view') : setButtonLable('hide')
  }

  //show delete button only for blogs created by the logged in user
  const showDeleteButton = loggedUser === blog.user.username
      ? { display: '' }
      : { display: 'none' }


  const incrementLikes = (e) => {
    e.preventDefault()
    const elId = blog.id

    setNewBlog({ ...newBlog , likes : ++ newBlog.likes })
    updateBlog(elId, newBlog)

  }


  const removeBlog = (e) => {
    e.preventDefault()
    const elId = newBlog.id

    if(window.confirm(`Remove blog ${newBlog.title} by ${newBlog.author}`)) {
      deleteBlog(elId, newBlog)
    }
  }

  return (
    <div style={blogStyle} className='blog' id={blog.id}>

      <div className='blog-summary'>
        {blog.title} {blog.author}

        <button onClick={toggleViewDetails} className='view-btn'>
          {buttonLable}
        </button>

      </div>

      <div style={detailsStyle} className='blog-details'>

        <div className='url-details'> {blog.url}</div>

        <div className='likes-details'>
          likes: {blog.likes}

          <button onClick={incrementLikes} className='like-btn'>
            like
          </button>

        </div>

        <div data-testid='author' className='author-details'>{blog.author}</div>

        <div style={showDeleteButton}>
          <button onClick={removeBlog}>remove</button>
        </div>

      </div>
    </div>
  )
}

// Blog.propTypes = {
//   updateBlog: PropTypes.func.isRequired,
//   deleteBlog:PropTypes.func.isRequired
// }

export default Blog