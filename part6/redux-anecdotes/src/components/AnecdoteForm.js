import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { hideNotification, showNotification } from "../reducers/notificationReducer";
import anecdoteService from '../services/anecdotes'


const AnecdoteForm= (props) => {
  const dispatch = useDispatch()

  const addAnecdote = async (e) => {
    e.preventDefault()

    const content = e.target.anecdote.value
    e.target.anecdote.value = ''

    const newAnecdote = await anecdoteService.createNew(content)

    dispatch(createAnecdote(newAnecdote))
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