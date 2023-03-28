import { useState } from 'react'
// import { useParams } from 'react-router-dom'

const CommentForm = ({ blog, addComment }) => {
	const [comment, setComment] = useState('')

	const handleChange = e => {
		setComment(e.target.value)
	}

	const addNewComment = async e => {
		e.preventDefault()
		const elId = blog.id

		addComment(elId, comment)

		setComment('')
	}

	return (
		<form onSubmit={addNewComment}>
			<label>
				comment:
				<input
					type='text'
					name='comments'
					value={comment}
					onChange={handleChange}
					className='title-input'
				/>
			</label>

			<button id='addComm-btn' type='submit'>
				add comment
			</button>
		</form>
	)
}

export default CommentForm
