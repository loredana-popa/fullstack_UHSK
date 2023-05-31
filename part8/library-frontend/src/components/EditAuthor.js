import { useMutation } from '@apollo/client'
import { useState } from 'react'

import { EDIT_AUTHOR, ALL_AUTHORS } from './queries'

const EditAuthorForm = props => {
	const [name, setName] = useState('')
	const [setBornTo, setSetBornTo] = useState('')

	const [editAuthor] = useMutation(EDIT_AUTHOR, {
		refetchQueries: [{ query: ALL_AUTHORS }],
	})

	const submit = async event => {
		event.preventDefault()

		console.log('author edited...')

		editAuthor({ variables: { name, setBornTo } })
		// console.log('create book data', data)

		setName('')
		setSetBornTo('')
	}

	return (
		<div>
			<h2> edit author</h2>
			<form onSubmit={submit}>
				<div>
					author's name
					<input
						value={name}
						onChange={({ target }) => setName(target.value)}
					/>
				</div>
				<div>
					born
					<input
						type='number'
						value={setBornTo}
						onChange={({ target }) => setSetBornTo(Number(target.value))}
					/>
				</div>
				<button type='submit'>edit author</button>
			</form>
		</div>
	)
}

export default EditAuthorForm
