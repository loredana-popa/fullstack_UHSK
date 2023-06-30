import { useQuery } from '@apollo/client'
import { ME, ALL_BOOKS } from './queries'

const Recommend = props => {
	// get the logged-in user
	const { data: me_data } = useQuery(ME)
	const user = !me_data ? 'no logged-in user' : me_data.me
	const favGenre = user.favoriteGenre

	// get all the books from DB
	const { data: books_data } = useQuery(ALL_BOOKS)
	const books = !books_data ? [] : books_data.allBooks

	// get all the books that match with the user's favourite gender
	const booksByGenre = books.filter(book => book.genres.includes(`${favGenre}`))

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
					{booksByGenre.map(b => (
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
