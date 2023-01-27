import { useDispatch, useSelector } from "react-redux"
import { increaseVotesFor } from "../reducers/anecdoteReducer"
import { showNotification, hideNotification } from "../reducers/notificationReducer"



const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )

}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  // console.log(anecdotes)

  const voted = (anecdote) => {
  
    dispatch(increaseVotesFor(anecdote.id))
    dispatch(showNotification(`VOTED_${anecdote.content}`))
    setTimeout(()=> {
      dispatch(hideNotification('HIDE'))
    }
    ,5000)
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => voted(anecdote)}
        />
      )}

    </div>
  )
}

export default AnecdoteList