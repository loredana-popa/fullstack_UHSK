import { Link } from 'react-router-dom'

const Blogs = ({ blogs }) => {
	const style = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
	}
	return (
		<div>
			{blogs.map(blog => (
				<div key={blog.id} style={style}>
					<Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
				</div>
			))}
		</div>
	)
}

export default Blogs
