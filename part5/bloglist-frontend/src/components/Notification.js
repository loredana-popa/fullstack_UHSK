import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector((state) => state)

  const successStyle = {
    color: 'green',
    borderBlock: '2px solid green',
    backgroundColor: 'lightgray',
    fontWeight: 'bold',
    fontSize: '20px',
    padding: '10px',
  }

  const errorStyle = {
    color: 'red',
    fontWeight: 'bold',
    fontSize: '20px',
  }

  const messageStyle = message.status === 'success' ? successStyle : errorStyle

  if (message.status === null) {
    return null
  }

  return (
    <div className='message' style={messageStyle}>
      {message.content}
    </div>
  )
}

export default Notification
