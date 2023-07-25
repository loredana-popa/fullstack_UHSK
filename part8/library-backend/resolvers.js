const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const resolvers = {
	Query: {
		// the total number of books saved in DB
		bookCount: async () => Book.collection.countDocuments(),

		// the total number of authors saved in DB
		authorCount: async () => Author.collection.countDocuments(),

		// get all the books from DB
		allBooks: async (root, args) => {
			console.log('all books')
			return await Book.find({}).populate('author')
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

		// return the books that match the given genre
		findBooksByGenre: async (root, { genre }) => {
			console.log('books by genre')
			return await Book.find({ genres: `${genre}` }).populate('author')
		},
	},

	Author: {
		// get the number of books of each author
		bookCount: async root => {
			const books = await Book.find({}).populate('author')
			const count = books.filter(book => book.author.name === root.name).length
			return count
		},
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

			const res = await Book.findOne({ title: args.title }).populate('author')

			pubsub.publish('BOOK_ADDED', { bookAdded: res })

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
			const user = new User({ ...args })

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

		// checks if the username-password pair is valid, if true return a jwt token
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

	Subscription: {
		bookAdded: {
			subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
		},
	},
}

module.exports = resolvers
