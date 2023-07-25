import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
	fragment BookDetails on Book {
		title
		author {
			name
		}
		published
		genres
	}
`

export const ALL_AUTHORS = gql`
	query {
		allAuthors {
			name
			born
			bookCount
		}
	}
`
export const ALL_BOOKS = gql`
	query {
		allBooks {
			...BookDetails
		}
	}
	${BOOK_DETAILS}
`
export const ME = gql`
	query {
		me {
			username
			favoriteGenre
			id
		}
	}
`

export const BOOKS_BY_GENRE = gql`
	query booksByGenre($genre: String) {
		findBooksByGenre(genre: $genre) {
			...BookDetails
		}
	}
	${BOOK_DETAILS}
`

export const RECOM_BOOKS = gql`
	query recomBooks($favgenre: String) {
		findBooksByGenre(genre: $favgenre) {
			...BookDetails
		}
	}
	${BOOK_DETAILS}
`

export const CREATE_BOOK = gql`
	mutation createBook(
		$title: String!
		$author: String!
		$published: Int!
		$genres: [String!]!
	) {
		addBook(
			title: $title
			author: $author
			published: $published
			genres: $genres
		) {
			...BookDetails
		}
	}
	${BOOK_DETAILS}
`
export const BOOK_ADDED = gql`
	subscription {
		bookAdded {
			...BookDetails
		}
	}
	${BOOK_DETAILS}
`

export const EDIT_AUTHOR = gql`
	mutation editAuthor($name: String!, $setBornTo: Int!) {
		editAuthor(name: $name, setBornTo: $setBornTo) {
			name
			born
		}
	}
`

export const LOGIN = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			value
		}
	}
`
