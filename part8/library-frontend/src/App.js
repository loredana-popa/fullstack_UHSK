import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import { useApolloClient, useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED } from './components/queries'

// function that takes care of manipulating cache
export const updateCache = (cache, query, addedBook) => {
	// helper that is used to eliminate saving same book twice
	const uniqByName = a => {
		let seen = new Set()
		return a.filter(item => {
			let k = item.title
			return seen.has(k) ? false : seen.add(k)
		})
	}

	cache.updateQuery(query, ({ allBooks }) => {
		return {
			allBooks: uniqByName(allBooks.concat(addedBook)),
		}
	})
}

const App = () => {
	const [page, setPage] = useState('authors')
	const [token, setToken] = useState(null)
	// const [error, setError] = useState()
	const client = useApolloClient()

	const logout = () => {
		setToken(null)
		localStorage.clear()
		client.resetStore()
		setPage('authors')
	}

	useSubscription(BOOK_ADDED, {
		onData: ({ data, client }) => {
			const addedBook = data.data.bookAdded
			window.alert(
				`A new book was added: ${addedBook.title} by ${addedBook.author.name}`
			)

			updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
		},
	})

	if (!token) {
		return (
			<div>
				<div>
					<button onClick={() => setPage('authors')}>authors</button>
					<button onClick={() => setPage('books')}>books</button>
					<button onClick={() => setPage('login')}>login</button>
				</div>

				<Authors show={page === 'authors'} />

				<Books show={page === 'books'} />

				<LoginForm
					show={page === 'login'}
					setToken={setToken}
					// setError={setError}
				/>
			</div>
		)
	}

	return (
		<div>
			<div>
				<button onClick={() => setPage('authors')}>authors</button>
				<button onClick={() => setPage('books')}>books</button>
				<button onClick={() => setPage('add')}>add book</button>
				<button onClick={() => setPage('recommend')}>recommend</button>
				<button onClick={logout}>logout</button>
			</div>

			<Authors show={page === 'authors'} />

			<Books show={page === 'books'} />

			<NewBook show={page === 'add'} />

			<Recommend show={page === 'recommend'} setToken={setToken} />
		</div>
	)
}

export default App
