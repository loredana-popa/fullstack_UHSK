import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useReducer } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateAnecdote } from './requests'
import NotificationContext from './NotificationContext'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "ADDED":
      return state = action.payload
    case "VOTED":
      return state = action.payload
    case "ERROR":
      return state = action.payload
    case "HIDE":
      return state = ''
    default:
      return state 
  }
}

const App = () => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: ++ anecdote.votes })
    notificationDispatch({
      type: 'VOTED',
      payload: `you voted: ${anecdote.content}`
     })
    setTimeout(()=> {
      notificationDispatch({
        type: 'HIDE'
      })
    },5000)
  }

  const result = useQuery(
    'anecdotes',
    getAnecdotes,
    {
      retry: false
    }
  )

  const anecdotes = result.data

  if( result.isLoading ) {
    return <div>loading data ...</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to {result.error.message}</div>
  }

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
    <div>
      <h3>Anecdote app</h3>

      <Notification notification={notification}/>
      <AnecdoteForm notificationDispatch={notificationDispatch}/>

    {anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => handleVote(anecdote)}>vote</button>
        </div>
      </div>
    )}
    </div>

    </NotificationContext.Provider>

  )
}

export default App
