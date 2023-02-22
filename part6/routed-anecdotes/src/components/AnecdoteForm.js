import { useField } from '../hooks'

const AnecdoteForm = (props) => {
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

  const resetHandle = (event) => {
    event.preventDefault()
    content.onReset()
    author.onReset()
    info.onReset()
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
        <input type='button' value='reset' onClick={resetHandle}/>
      </form>
    </div>
  )

}

export default AnecdoteForm