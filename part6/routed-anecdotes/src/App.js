import { useState } from 'react'
import { 
  Routes, 
  Route, 
  Navigate, 
} from 'react-router-dom'

import { useField } from './hooks'

import Menu from './components/Menu'
import About from './components/About'
import Footer from './components/Footer'
import AnecdoteList from './components/AnecdoteList'
import Anecdote from './components/Anecdote'

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()

    props.addNew({
      content : content.value,
      author : author.value,
      info : info.value,
      votes: 0
    })
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>

        <div>
          author
          <input {...author}/>
        </div>

        <div>
          url for more info
          <input {...info} />
        </div>

        <button>create</button>
      </form>
    </div>
  )

}

const Notification = ({ notification }) => {

  return <div>{notification}</div>
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')
  const [isCreated, setIsCreated] = useState(false)

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setIsCreated(true)
    setNotification(`a new anecdote: ${anecdote.content} was created!`)

    setTimeout(() => {
      setIsCreated(false)
    }, 1000)
    
    setTimeout(() => {
      setIsCreated(false)
      setNotification('')
    }, 5000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification notification={notification}/>

      <Routes>
        <Route path="/anecdotes/:id" element={<Anecdote anecdotes={anecdotes} />} />
        <Route path="/anecdotes" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/about" element={<About />} />
        <Route path="/create" element={isCreated ? <Navigate replace to="/" /> : <CreateNew addNew={addNew}/>} />
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />

      </Routes>

      <Footer />
    </div>

  )
}

export default App
