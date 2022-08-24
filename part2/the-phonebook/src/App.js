
import { useState, useEffect } from 'react';
import axios from 'axios';
import personService from './services/persons';


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

const Person = ({ person , removePerson}) =>{
  return (
    <div>
      {person.name} {person.number}
      <button onClick={removePerson}>delete</button>
    </div>

  )
}
  

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] =useState('')
  const [searchText, setSearchText] =useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    personService
    .create(personObject)
    .then(returnedObject => {
      setPersons(persons.concat(returnedObject))
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

  const removePerson = (id, person) => {
    if (window.confirm(`Delete ${person.name} from your list?`)) {
      personService
      .remove(id, person)
      .then(
        setPersons(persons.filter(p => p.id !== id))
      )
    }
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
          person={person} 
          removePerson={()=> removePerson(person.id, person)}/>
      )}
    
    
    </div>
  )
}

export default App