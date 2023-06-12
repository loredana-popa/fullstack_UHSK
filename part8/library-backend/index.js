const { ApolloServer } = require('@apollo/server')
const { GraphQLError } = require('graphql')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose
	.connect(MONGODB_URI)
	.then(() => {
		console.log('connected to MongoDB')
	})
	.catch(error => {
		console.log('error connection to MongoDB', error.message)
	})

let authors = [
	{
		name: 'Robert Martin',
		id: 'afa51ab0-344d-11e9-a414-719c6709cf3e',
		born: 1952,
	},
	{
		name: 'Martin Fowler',
		id: 'afa5b6f0-344d-11e9-a414-719c6709cf3e',
		born: 1963,
	},
	{
		name: 'Fyodor Dostoevsky',
		id: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
		born: 1821,
	},
	{
		name: 'Joshua Kerievsky', // birthyear not known
		id: 'afa5b6f2-344d-11e9-a414-719c6709cf3e',
	},
	{
		name: 'Sandi Metz', // birthyear not known
		id: 'afa5b6f3-344d-11e9-a414-719c6709cf3e',
	},
]

let books = [
	{
		title: 'Clean Code',
		published: 2008,
		author: 'Robert Martin',
		id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
		genres: ['refactoring'],
	},
	{
		title: 'Agile software development',
		published: 2002,
		author: 'Robert Martin',
		id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
		genres: ['agile', 'patterns', 'design'],
	},
	{
		title: 'Refactoring, edition 2',
		published: 2018,
		author: 'Martin Fowler',
		id: 'afa5de00-344d-11e9-a414-719c6709cf3e',
		genres: ['refactoring'],
	},
	{
		title: 'Refactoring to patterns',
		published: 2008,
		author: 'Joshua Kerievsky',
		id: 'afa5de01-344d-11e9-a414-719c6709cf3e',
		genres: ['refactoring', 'patterns'],
	},
	{
		title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
		published: 2012,
		author: 'Sandi Metz',
		id: 'afa5de02-344d-11e9-a414-719c6709cf3e',
		genres: ['refactoring', 'design'],
	},
	{
		title: 'Crime and punishment',
		published: 1866,
		author: 'Fyodor Dostoevsky',
		id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
		genres: ['classic', 'crime'],
	},
	{
		title: 'The Demon ',
		published: 1872,
		author: 'Fyodor Dostoevsky',
		id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
		genres: ['classic', 'revolution'],
	},
]
console.log('step 0')

const typeDefs = `
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id:ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks: [Book!]!
    allAuthors : [Author!]!
    me: User
  }

  type Mutation{
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]
    ): Book

    editAuthor(
      name: String!
      setBornTo: Int!): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ) : User

    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
	Query: {
		// the total number of books saved in DB
		bookCount: async () => Book.collection.countDocuments(),

		// the total number of authors saved in DB
		authorCount: async () => Author.collection.countDocuments(),

		// get all the books from DB
		allBooks: async (root, args) => {
			console.log('all books')
			return await Book.find({})
		},

		// get all the authors from DB
		allAuthors: async (root, args) => {
			console.log('all authors')
			return await Author.find({})
		},

		// return the logged-in user
		me: (root, args, context) => {
			return context.currentUser
		},
	},

	Author: {
		// get the number of books of each author
		bookCount: async root =>
			books.filter(book => book.author === root.name).length,
	},

	Mutation: {
		// create and add a new book to the DB
		addBook: async (root, args, context) => {
			console.log('addBook mutation is initiated')

			const isAuthor = await Author.findOne({ name: args.author })
			console.log('author found in DB is', isAuthor)

			const createdAuthor = new Author({
				name: args.author,
				born: null,
			})

			const authorID = isAuthor ? isAuthor._id : createdAuthor._id
			console.log('author ID is', authorID)

			const isBook = await Book.findOne({ name: args.title })
			const createdBook = new Book({
				title: args.title,
				author: authorID,
				published: args.published,
				genres: args.genres,
			})

			const currentUser = context.currentUser
			// console.log('logged in user is', currentUser)

			if (!currentUser) {
				throw new GraphQLError('not authenticated', {
					extensions: {
						code: 'BAD_USER_INPUT',
					},
				})
			}

			if (!isAuthor) {
				await createdAuthor.save()
			}

			if (isBook) {
				return null
			}

			try {
				await createdBook.save()
				console.log('new book', createdBook)
			} catch (error) {
				throw new GraphQLError('Saving book failed', {
					extensions: {
						code: 'BAD_USER_INPUT',
						invalidArgs: args.name,
						error,
					},
				})
			}
			// const res = await createdBook.save()
			const res = await Book.findOne({ title: args.title }).populate('author')
			console.log('returned book is', res)
			return res
		},

		// Change the year of birth for a given author
		editAuthor: async (root, args, context) => {
			console.log('args given', args)

			const author = await Author.findOne({ name: args.name })
			console.log(' author to be changed', author)

			const currentUser = context.currentUser
			console.log('logged in user is', currentUser)

			if (!currentUser) {
				throw new GraphQLError('not authenticated', {
					extensions: {
						code: 'BAD_USER_INPUT',
					},
				})
			}

			if (!author) {
				return null
			}

			try {
				await Author.updateOne(
					{ _id: author._id },
					{ $set: { born: args.setBornTo } }
				)
			} catch (error) {
				throw new GraphQLError('Updating author failed', {
					extensions: {
						code: 'BAD_USER_INPUT',
						invalidArgs: args.name,
						error,
					},
				})
			}

			const res = await Author.findOne({ name: args.name })
			console.log('updated author', res)
			return res
		},

		// create and add a new user to the DB
		createUser: async (root, args) => {
			const user = new User({ username: args.username })

			return user.save().catch(error => {
				throw new GraphQLError('Creating the user failed', {
					extensions: {
						code: 'BAD_USER_INPUT',
						invalidArgs: args.name,
						error,
					},
				})
			})
		},

		// checks if the username-password pair is valid, if it is it returs a jwt token
		login: async (root, args) => {
			const user = await User.findOne({ username: args.username })

			if (!user || args.password !== 'secret') {
				throw new GraphQLError('wrong credentials', {
					extensions: {
						code: 'BAD_USER_INPUT',
					},
				})
			}
			const userForToken = {
				username: user.username,
				id: user._id,
			}

			return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
		},
	},
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
})

startStandaloneServer(server, {
	listen: { port: 4000 },
	context: async ({ req, res }) => {
		const auth = req ? req.headers.authorization : null
		if (auth && auth.startsWith('Bearer ')) {
			const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
			const currentUser = await User.findById(decodedToken.id)
			return { currentUser }
		}
	},
}).then(({ url }) => {
	console.log(`Server ready at ${url}`)
})
