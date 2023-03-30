// import PropTypes from 'prop-types'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Form, FormGroup, Button } from 'react-bootstrap'

import loginServices from '../services/login'
import { loginUser } from '../reducers/logginReducer'
import {
	showNotification,
	hideNotification,
} from '../reducers/notificationReducer'
import blogService from '../services/blogs'

const LoginForm = () => {
	const navigate = useNavigate()
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
			navigate('/')
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

			<Form onSubmit={handleLogin}>
				<FormGroup>
					<Form.Label>username</Form.Label>
					<Form.Control
						type='text'
						name='Username'
						onChange={({ target }) => setUsername(target.value)}
					/>

					<Form.Label>password</Form.Label>
					<Form.Control
						type='password'
						name='Password'
						onChange={({ target }) => setPassword(target.value)}
					/>

					<Button variant='primary' type='submit'>
						login
					</Button>
				</FormGroup>
			</Form>
		</div>
	)
}

// LoginForm.propTypes = {
// 	username: PropTypes.string.isRequired,
// 	password: PropTypes.string.isRequired,
// 	handleSubmit: PropTypes.func.isRequired,
// }

export default LoginForm
