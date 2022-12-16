const Notification = ({message}) => {
    const errorStyle ={
        color: 'red',
        padding: '10px 0px',
        fontWeight: 'bold',
        fontSize: '20px'
    }
    
    if (message === null) {
        return null
    }
    
    return (
        <div style={errorStyle}>{message}</div>
    )
}

export default Notification

