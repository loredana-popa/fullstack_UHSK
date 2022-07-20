import { useState } from 'react'

const Display = ({ title, anecdote, votes }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{anecdote}</p>
      <div>has {votes} votes</div>
    </div>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
 
  // generate an initial list for the votes
  const initializeVotes = (anecdotes) => {
    return Array(anecdotes.length).fill(0)  
  }

  const [votes, setVotes] = useState(initializeVotes(anecdotes))

  // generate a random number
  function generateNumber() {
    const max = anecdotes.length - 1;
    const min = 0;
    const  randomNumber= Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber
  }

  // update the state of the selected anecdote
  function getNewAnecdote() {
   setSelected(generateNumber())
  }

  // update votes : increment by 1
  const handleClickVote= (selected, votes) => {
    let copyVotes = [...votes]
    copyVotes[selected] += 1
    setVotes(copyVotes)
  } 

  //get the max vote in the votes array
  const maxVote =  Math.max(...votes)

  //get index in the votes array of the max vote 
  const indexMaxVote = votes.indexOf(maxVote)

  return (
    <div>
      <Display
        title = 'Anecdote of the day'
        anecdote = {anecdotes[selected]} 
        votes = {votes[selected]} />
  
      <Button 
        handleClick={() => handleClickVote(selected, votes)}
        text='vote'/>
        
      <Button 
        handleClick={() => getNewAnecdote()}
        text='new anecdote'/>

      <Display
        title = 'Anecdote with most votes'
        anecdote = {anecdotes[indexMaxVote]} 
        votes = {maxVote}
         />

    </div>
  )
}

export default App