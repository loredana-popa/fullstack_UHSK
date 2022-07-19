import { useState } from 'react'

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
 
  // Anecdotes -> Votes(list of vote)
  // vote is key-value pair where:
  //         key is index in anecdote , value is Number
  // 
  const initializeVotes = (anecdotes) => {
    return Array(anecdotes.length).fill(0)  
  }

  const [votes, setVotes] = useState(initializeVotes(anecdotes))

  function generateNumber() {
    const max = anecdotes.length - 1;
    const min = 0;
    const  randomNumber= Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber
  }

  function getNewAnecdote() {
   setSelected(generateNumber())
  }


  // update votes when the vote button is clicked (increase votes by one)
  const updateVotes = (selected, votes) => {
    let copyVotes = [...votes]
    copyVotes[selected] += 1
    setVotes(copyVotes)
  } 

  
  console.log(selected)
  console.log(votes)

  return (
    <div>
      {anecdotes[selected]}
      <div> has {votes[selected]} votes</div>
      <button onClick={() => updateVotes(selected, votes)}>vote</button>
      <button onClick={() => getNewAnecdote()}>next anecdote</button>
    </div>
  )
}

export default App