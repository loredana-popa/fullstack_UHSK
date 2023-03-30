import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
	const message = useSelector(state => state.notification)

	if (message.status === null) {
		return null
	}

	return message.status === 'success' ? (
		<Alert variant='success'>{message.content}</Alert>
	) : (
		<Alert variant='danger'>{message.content}</Alert>
	)
}

export default Notification
