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
		setSetBornTo('')
	}
	console.log('name is', name)

	return (
		<div>
			<h2> Set birthyear</h2>
			<form onSubmit={submit}>
				<label>
					Author's name:
					<select value={name} onChange={e => setName(e.target.value)}>
						{props.authors.map((a, i) => (
							<option value={a.name} key={i}>
								{a.name}
							</option>
						))}
					</select>
				</label>
				<div>
					born:
					<input
						type='number'
						value={setBornTo}
						onChange={({ target }) => setSetBornTo(Number(target.value))}
					/>
				</div>
				<button type='submit'>update author</button>
			</form>
		</div>
	)
}

export default EditAuthorForm
