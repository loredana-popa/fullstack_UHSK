import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Blogs = ({ blogs }) => {
	// const style = {
	// 	paddingTop: 10,
	// 	paddingLeft: 2,
	// 	border: 'solid',
	// 	borderWidth: 1,
	// 	marginBottom: 5,
	// }
	return (
		<div>
			<h2>Blogs</h2>

			<Table striped>
				<tbody>
					{blogs.map(blog => (
						<tr key={blog.id}>
							<td>
								<Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
							</td>
							<td>{blog.user.name}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	)
}

export default Blogs
