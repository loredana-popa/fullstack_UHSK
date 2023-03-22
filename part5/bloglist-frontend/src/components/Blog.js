import { useState } from 'react'
import { useParams } from 'react-router-dom'
// import PropTypes from 'prop-types'

const Blog = ({ blogs, updateBlog, deleteBlog, user }) => {
	const id = useParams().id
	const blog = blogs.find(b => b.id === id)

	const [newBlog, setNewBlog] = useState({ ...blog })

	const blogCreator = !blog ? null : blog.user.username
	const loggedUser = !user ? null : user.username

	// show delete button only for blogs created by the logged in user
	const showDeleteButton =
		loggedUser === blogCreator ? { display: 'block' } : { display: 'none' }

	const incrementLikes = e => {
		e.preventDefault()
		const elId = blog.id

		setNewBlog({ ...newBlog, likes: ++newBlog.likes })
		updateBlog(elId, newBlog)
	}

	const removeBlog = e => {
		e.preventDefault()
		const elId = newBlog.id

		if (window.confirm(`Remove blog ${newBlog.title} by ${newBlog.author}`)) {
			deleteBlog(elId, newBlog)
		}
	}

	if (!blog) {
		return null
	}

	return (
		<div className='blog' id={blog.id}>
			<h2 className='blog-summary'>
				{blog.title} {blog.author}
			</h2>

			<div className='url-details'> {blog.url}</div>
			<div className='likes-details'>
				{blog.likes} likes
				<button onClick={incrementLikes} className='like-btn'>
					like
				</button>
				<div data-testid='author' className='author-details'>
					{blog.author}
				</div>
				<div style={showDeleteButton}>
					<button onClick={removeBlog} className='remove-btn'>
						remove
					</button>
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
