const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 3,
	},
	born: {
		type: Number,
	},
	books: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Book',
		},
	],
})

const Author = mongoose.model('Author', authorSchema)
module.exports = Author
