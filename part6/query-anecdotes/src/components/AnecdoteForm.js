import { useContext } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import NotificationContext from '../NotificationContext'
import { createAnecdote } from '../requests'

const AnecdoteForm = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext)

  const queryClient = useQueryClient() 

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value

    event.target.anecdote.value = ''

    newAnecdoteMutation.mutate({ content, votes: 0 })
    notificationDispatch({
      type: 'ADDED',
      payload: `you added : ${content}`
    })
    setTimeout(()=> {
      notificationDispatch({
        type: 'HIDE'
      })
    }
    ,5000)
  }


  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
