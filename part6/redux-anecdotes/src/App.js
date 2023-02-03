import AnecdoteList from './components/AnectoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import FilterAnecdots from './components/FilterAnecdotes'
import anecdoteService from './services/anecdotes'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    anecdoteService
      .getAll().then(anecdotes => dispatch(setAnecdotes(anecdotes)))
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <FilterAnecdots />
      <AnecdoteList  />
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  )
}

export default App