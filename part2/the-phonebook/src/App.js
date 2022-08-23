
import { useState, useEffect } from 'react';
import axios from 'axios';


const Filter = ({ value, onChange}) => {
  return (
    <div>
      filter shown with: 
      <input value={value} onChange = {onChange}/>
    </div>
  )
}

const PersonForm =({ onSubmit, value, onChange, text}) => {
  return (
    <form onSubmit={onSubmit}>
        <div>
          {text}: <input 
                  value={value} 
                  onChange ={onChange}
                  />
        </div>
      </form>

  )
}

const Person = ({ person }) =>{
  return (
    <div>{person.name} {person.number}</div>
  )
}
  

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] =useState('')
  const [searchText, setSearchText] =useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promis fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')


  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    axios
      .post('http://localhost:3001/persons', personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
        
      })

    const isPerson = persons.find(element => {
      if (element.name === newName){
        return true;
      }
      return false;
    });
   
    isPerson ? 
      alert(newName +' is already added to phonebook')
          :
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
  }
    

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleTextChange = (event) => {
    setSearchText(event.target.value)
  }
  

  function searchPerson(person) {
   if (person.name.toLowerCase().match(searchText.toLowerCase()) !==null) {
     return person
   } 
 }
  let resultArray =[...persons];
  resultArray = persons.filter(searchPerson)
  

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={searchText} onChange = {handleTextChange}/>

      <h2>add new</h2>

      <PersonForm 
        onSubmit={addPerson}
        value ={newName}
        onChange={handlePersonChange}
        text='name'
      />

      <PersonForm 
        value={newNumber}
        onChange={handleNumberChange}
        text='number'
      />

      <div>
        <button type="submit" onClick={addPerson}>add</button>
      </div>

      <h2>Numbers</h2>
  
      {resultArray.map(person =>
        <Person 
          key={person.name}
          person={person} />
      )}
    
    
    </div>
  )
}

export default App