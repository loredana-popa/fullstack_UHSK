import { useQuery, useLazyQuery } from '@apollo/client'
import { useState } from 'react'
import { ALL_BOOKS, BOOKS_BY_GENRE } from './queries'

import FilterButtons from './FilterButtons'
import BooksByGenre from './BooksByGenre'

const Books = props => {
	const [genre, setGenre] = useState('')
	const [filterVal, setFilterVal] = useState(null)

	const { loading, error, data } = useQuery(ALL_BOOKS)
	const allBooks = !data ? [] : data.allBooks

	const [
		filterBooksByGen,
		{ loading: genBookload, data: genBookdata, error: genBookerr },
	] = useLazyQuery(BOOKS_BY_GENRE)

	const booksByGen = !genBookdata ? [] : genBookdata.findBooksByGenre

	// get the array of unique genres from DB
	const genres = () => {
		const genresArr = !allBooks
			? []
			: [...new Set(allBooks.map(Val => Val.genres))]
		const mergeDedupe = arr => {
			return [...new Set([].concat(...arr))]
		}
		return mergeDedupe(genresArr)
	}

	const filterBooks = genre => {
		setFilterVal(genre)
		setGenre(genre)
		filterBooksByGen({ variables: { genre: `${genre}` } })
	}

	if (loading) return 'Loading...'
	if (error) return `Error! ${error.message}`
	if (genBookload) return 'Loading...'
	if (genBookerr) return `Error! ${error.message}`

	if (!props.show) {
		return null
	}

	return (
		<div>
			<h2>books</h2>
			<p>
				in genre: <b>{filterVal}</b>
			</p>

			<BooksByGenre
				filter={genre}
				allBooks={allBooks}
				booksByGen={booksByGen}
			/>

			<FilterButtons filterBooks={filterBooks} genres={genres()} />
		</div>
	)
}

export default Books
