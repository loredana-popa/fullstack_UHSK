// import PropTypes from 'prop-types'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

import loginServices from '../services/login'
import { loginUser } from '../reducers/logginReducer'
import {
	showNotification,
	hideNotification,
} from '../reducers/notificationReducer'
import blogService from '../services/blogs'

const LoginForm = () => {
	const dispatch = useDispatch()

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const handleLogin = async event => {
		event.preventDefault()

		try {
			const user = await loginServices.login({
				username,
				password,
			})

			window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
			blogService.setToken(user.accessToken)
			dispatch(loginUser(user))

			//clear all input values in the form
			setUsername('')
			setPassword('')
		} catch (exception) {
			dispatch(showNotification('ERR_Wrong credentials')),
				setTimeout(() => {
					dispatch(hideNotification())
					setUsername('')
					setPassword('')
				}, 5000)
		}
	}

	return (
		<div>
			<h2>Log in to application</h2>

			<form onSubmit={handleLogin}>
				<div>
					username
					<input
						id='username'
						type='text'
						value={username}
						name='Username'
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>

				<div>
					password
					<input
						id='password'
						type='password'
						value={password}
						name='Password'
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>

				<button id='login-button' type='submit'>
					login
				</button>
			</form>
		</div>
	)
}

// LoginForm.propTypes = {
// 	username: PropTypes.string.isRequired,
// 	password: PropTypes.string.isRequired,
// 	handleSubmit: PropTypes.func.isRequired,
// }

export default LoginForm
