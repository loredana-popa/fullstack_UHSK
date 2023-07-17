import { useQuery } from '@apollo/client'
import { ME, BOOKS_BY_GENRE } from './queries'

const Recommend = props => {
	// get the current logged-in user info
	const { data: me_data } = useQuery(ME)
	const user = !me_data ? 'no logged-in user' : me_data.me
	const favGenre = user.favoriteGenre

	// get all the books that match with the logged-in user's favourite genre
	const { data: recomBooks_data } = useQuery(BOOKS_BY_GENRE, {
		variables: { genre: `${favGenre}` },
	})

	const recomBooks = !recomBooks_data ? [] : recomBooks_data.findBooksByGenre

	if (!props.show) {
		return null
	}
	return (
		<div>
			<h2>recommendations</h2>
			<p>
				books in your favorite genre <b>{favGenre}</b>
			</p>

			<table>
				<tbody>
					<tr>
						<th></th>
						<th>author</th>
						<th>published</th>
					</tr>
					{recomBooks.map(b => (
						<tr key={b.title}>
							<td>{b.title}</td>
							<td>{b.author.name}</td>
							<td>{b.published}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default Recommend
