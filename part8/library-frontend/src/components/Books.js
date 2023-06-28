import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { ALL_BOOKS } from './queries'

import FilterButtons from './FilterButtons'

const Books = props => {
	const { loading, error, data } = useQuery(ALL_BOOKS)
	const books = !data ? [] : data.allBooks

	const [filteredBooksArr, setFilteredBooksArr] = useState([])
	const [filterVal, setFilterVal] = useState(null)

	const resultArr = !filterVal ? [...books] : [...filteredBooksArr]

	const genres = () => {
		const genresArr = !books ? [] : [...new Set(books.map(Val => Val.genres))]
		const mergeDedupe = arr => {
			return [...new Set([].concat(...arr))]
		}
		return mergeDedupe(genresArr)
	}

	const filterBooks = genre => {
		const arr = books.filter(book => book.genres.includes(`${genre}`))
		setFilteredBooksArr([...arr])
		setFilterVal(genre)
	}

	if (loading) return 'Loading...'
	if (error) return `Error! ${error.message}`

	if (!props.show) {
		return null
	}

	return (
		<div>
			<h2>books</h2>
			<p>
				in genre: <b>{filterVal}</b>
			</p>

			<table>
				<tbody>
					<tr>
						<th></th>
						<th>author</th>
						<th>published</th>
					</tr>
					{resultArr.map(b => (
						<tr key={b.title}>
							<td>{b.title}</td>
							<td>{b.author.name}</td>
							<td>{b.published}</td>
						</tr>
					))}
				</tbody>
			</table>

			<FilterButtons filterBooks={filterBooks} genres={genres()} />
		</div>
	)
}

export default Books
