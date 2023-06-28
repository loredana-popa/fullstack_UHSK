const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		minlength: 3,
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Author',
	},
	published: {
		type: Number,
	},
	genres: [{ type: String }],
})

module.exports = mongoose.model('Book', bookSchema)
