import { gql, useQuery } from '@apollo/client'

const ALL_BOOKS = gql`
	query {
		allBooks {
			title
			author
			published
		}
	}
`

const Books = props => {
	const { loading, error, data } = useQuery(ALL_BOOKS)
	const books = !data ? [] : data.allBooks

	if (loading) return 'Loading...'
	if (error) return `Error! ${error.message}`

	if (!props.show) {
		return null
	}

	return (
		<div>
			<h2>books</h2>

			<table>
				<tbody>
					<tr>
						<th></th>
						<th>author</th>
						<th>published</th>
					</tr>
					{books.map(b => (
						<tr key={b.title}>
							<td>{b.title}</td>
							<td>{b.author}</td>
							<td>{b.published}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default Books
