import AnecdoteList from './components/AnectoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import FilterAnecdots from './components/FilterAnecdotes'

const App = () => {

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