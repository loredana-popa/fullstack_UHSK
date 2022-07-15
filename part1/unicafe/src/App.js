import { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Stats = ({statText, statValue }) => {
  return (
    <div>
      <p> {statText} {statValue}</p>
    </div>
  )
  
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)


  const handleGoodClick = () => {
    setGood(good + 1)
    setAll(all + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(all + 1) 
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setAll(all + 1)
  }

  const calcAverage = () => (good * 1 + neutral * 0 + bad * (-1)) / all
  const calcPositive = () => ((good * 100) / all)
 

  return (
    <div>
      <h1>give feedback</h1>
      
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />


      <Stats statText="good" statValue={good}/>
      <Stats statText="neutral" statValue={neutral}/>
      <Stats statText="bad" statValue={bad}/>
      <Stats statText="all" statValue={all}/>
      <Stats statText="average" statValue={calcAverage()}/>
      <Stats statText="positive" statValue={calcPositive()}/>
    </div>
  )
}

export default App