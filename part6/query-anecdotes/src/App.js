import { useQuery } from 'react-query'
import axios from 'axios'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes } from './requests'

const App = () => {

  const handleVote = (anecdote) => {
    console.log('vote')
  }


  const result = useQuery(
    'anecdotes',
    getAnecdotes,
    {
      retry: false
    }
  )

  console.log(result)

  if( result.isLoading ) {
    return <div>loading data ...</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to {result.error.message}</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
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
  )
}

export default App
