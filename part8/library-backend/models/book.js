const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
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
