const { ApolloServer } = require('@apollo/server')
const { GraphQLError } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')

const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')

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
    author: String!
    published: Int!
    genres: [String!]!
    id: ID!
    
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks: [Book!]!
    allAuthors : [Author!]!
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
  }
`

const resolvers = {
	Query: {
		bookCount: async () => Book.collection.countDocuments(),

		authorCount: async () => Author.collection.countDocuments(),

		allBooks: async (root, args) => {
			console.log('all books')
			return await Book.find({})
		},

		allAuthors: async (root, args) => {
			console.log('all authors')
			return await Author.find({})
		},
	},

	Author: {
		bookCount: root => books.filter(book => book.author === root.name).length,
	},

	Mutation: {
		addBook: async (root, args) => {
			console.log('step1')
			console.log('args are', args)

			const createdAuthor = new Author({
				name: args.author,
				born: null,
			})

			const createdBook = new Book({ ...args })

			const isAuthor = await Author.findOne({ name: args.author })
			console.log('is author', isAuthor)
			if (!isAuthor) {
				await createdAuthor.save()
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
			const res = await createdBook.save()
			return res
		},

		// Change the year of birth for a given author
		editAuthor: async (root, args) => {
			console.log('args given', args)

			const author = await Author.findOne({ name: args.name })
			console.log(' author to be changed', author)

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
	},
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
})

startStandaloneServer(server, {
	listen: { port: 4000 },
}).then(({ url }) => {
	console.log(`Server ready at ${url}`)
})
