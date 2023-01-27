import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { hideNotification, showNotification } from "../reducers/notificationReducer";


const AnecdoteForm= (props) => {
  const dispatch = useDispatch()

  const addAnecdote = (e) => {
    e.preventDefault()

    const content = e.target.anecdote.value
    e.target.anecdote.value = ''

    dispatch(createAnecdote(content))
    dispatch(showNotification(`NEW_${content}`))
    setTimeout(()=> {
      dispatch(hideNotification('HIDE'))
    }
    ,5000)
  }

  return (
    <form onSubmit={addAnecdote}>
      <div><input name='anecdote'/></div>
      <button type='submit'>create</button>
    </form>
  )
    
}

export default AnecdoteForm