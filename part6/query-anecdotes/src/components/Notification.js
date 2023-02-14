import { useContext } from "react"
import NotificationContext from "../NotificationContext"

  const Notification = () => {
    const [notification, notificationDispatch] = useContext(NotificationContext)

  const styleShow = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const styleHide = {
    display:''
  }
  
 const style = notification !== '' ? styleShow : styleHide

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
