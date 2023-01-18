const Notification = ({ message }) => {
    const successStyle = {
        color: 'green',
        borderBlock: '2px solid green',
        backgroundColor: 'lightgray',
        fontWeight: 'bold',
        fontSize: '20px',
        padding: '10px'
    }

    const errorStyle ={
        color: 'red',
        fontWeight: 'bold',
        fontSize: '20px'
    }

    const messageStyle = message.status === 'success' ? successStyle : errorStyle

    if (message.text === null) {
        return null
    }

    return (
        <div className='message' style={messageStyle}>{message.text}</div>
    )

}

export default Notification

