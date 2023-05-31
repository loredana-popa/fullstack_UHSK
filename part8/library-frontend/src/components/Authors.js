import { useQuery } from '@apollo/client'
import EditAuthorForm from './EditAuthor'

import { ALL_AUTHORS } from './queries'

const Authors = props => {
	const { loading, error, data } = useQuery(ALL_AUTHORS)
	const authors = !data ? [] : data.allAuthors

	if (loading) {
		return <div>'Loading...'</div>
	}

	if (error) {
		return <div>`Error! ${error.message}`</div>
	}

	if (!props.show) {
		return null
	}

	return (
		<div>
			<h2>authors</h2>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>born</th>
						<th>books</th>
					</tr>
					{authors.map(a => (
						<tr key={a.name}>
							<td>{a.name}</td>
							<td>{a.born}</td>
							<td>{a.bookCount}</td>
						</tr>
					))}
				</tbody>
			</table>
			<EditAuthorForm />
		</div>
	)
}

export default Authors
