import React from 'react';
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {

  const handleClick = (e) => {
    e.preventDefault()
    const elValue = e.target.value

    store.dispatch({
      type: `${elValue}`
    })
  }


  return (
    <div>
      <button onClick={handleClick} value='GOOD'>good</button>
      <button onClick={handleClick} value='OK'>ok</button>
      <button onClick={handleClick} value='BAD'>bad</button>
      <button onClick={handleClick} value='ZERO'>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
