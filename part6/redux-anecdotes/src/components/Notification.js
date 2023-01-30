import { useSelector } from 'react-redux'

const Notification = (props) => {

  const notification = useSelector(state => state.notification)
  const styleShow =  {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const style = notification !== '' ? styleShow : {display:''}

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification