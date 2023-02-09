import { useDispatch, useSelector } from "react-redux"
import { updateAnecdote } from "../reducers/anecdoteReducer"
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
  
  const anecdotes = useSelector(state => {
    const filterText = state.filter
    var filteredAnecdotes = state.anecdotes.filter(function (a) {
      return a.content.includes(filterText)
    })

    return filteredAnecdotes
  })
    
  // console.log(anecdotes)

  const voted = (anecdote) => {
    console.log('step1', anecdote)
  
    dispatch(updateAnecdote(anecdote.id, anecdote))
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