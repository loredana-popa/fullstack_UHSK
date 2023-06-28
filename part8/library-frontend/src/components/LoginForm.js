import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from './queries'

const LoginForm = ({ show, setToken, setError }) => {
	const [username, setUserName] = useState('')
	const [password, setPassword] = useState('')

	const [login, result] = useMutation(LOGIN, {
		onError: error => {
			setError(error.graphQLErrors[0].message)
		},
	})

	useEffect(() => {
		if (result.data) {
			const token = result.data.login.value
			setToken(token)
			localStorage.setItem('books-user-token', token)
		}
	}, [result.data]) //eslint-disable-line

	const submit = async event => {
		event.preventDefault()

		login({ variables: { username, password } })
	}

	if (!show) {
		return null
	}

	return (
		<div>
			<h2>Login</h2>
			<form onSubmit={submit}>
				<div>
					username
					<input
						type='text'
						value={username}
						onChange={({ target }) => setUserName(target.value)}
					/>
				</div>
				<div>
					password
					<input
						type='password'
						value={password}
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<div>
					<button type='submit'>Login</button>
				</div>
			</form>
		</div>
	)
}

export default LoginForm
