const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		minlength: 3,
	},
	author: {
		type: String,
		required: true,
	},
	published: {
		type: Number,
	},
	genres: [{ type: String }],
})

module.exports = mongoose.model('Book', bookSchema)
