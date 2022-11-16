
import { useState, useEffect } from 'react';
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

const Notification = ({ message }) => {

    const styleSuccess = {
      fontSize: 20,
      padding: 4,
      color: 'green',
      borderStyle: 'solid',
      backgroundColor: 'lightgrey'
    }

    const styleError = {
      fontSize: 20,
      padding: 4,
      color: 'red',
      borderStyle: 'solid',
      backgroundColor: 'lightgrey'
    }
    const styleOff = {
      fontSize: 20,
      padding: 4
    }
  

  return (
    <div 
    style={
      message.status === 'sucess' ? styleSuccess 
      : message.status === 'error' ? styleError 
      : styleOff}
    >{message.text}</div>
  )
}
  

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] =useState('')
  const [searchText, setSearchText] =useState('')
  const [successMessage, setSuccessMessage] = useState({text: null, status: null})
  const [errorMessage, setErrorMessage] = useState({text: null, status: null})
  

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  // console.log('render', persons.length, 'persons')

  const createPerson = () => {
    const personObject = {
      name: newName,
      number: newNumber
    }

    personService
    .create(personObject)
    .then(returnedPerson => {
      
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
      setSuccessMessage({
        ...successMessage, 
        text: `Added ${newName}`, 
        status: 'sucess'})

      setTimeout( () => {
        setSuccessMessage({...successMessage, 
          text: null, 
          status: null})
      }, 5000)
    })
    .catch(error => {
      setErrorMessage({
        ...errorMessage,
        text: error.response.data.error,
        status: 'error'
      })
    })
    }
  

  const updatePerson = () => {
    const person = persons.find(p => p.name === newName)
    const changedPerson = {...person, number : newNumber}
    const id = person.id
    
    if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
    
     personService
      .update(id, changedPerson)

      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
        setNewName('')
        setNewNumber('')

        setSuccessMessage({
          ...successMessage, 
          text: `Updated ${newName}`, 
          status: 'sucess'})

        setTimeout( () => {
          setSuccessMessage({
            ...successMessage,
            text: null, 
            status: null})
        }, 5000)
      })

      .catch(error => {
        setErrorMessage({
          ...errorMessage,
          text: `Information of ${newName} has already been removed from server`,
          status : 'error'
        })
        setTimeout(() => {
          setErrorMessage({
            ...errorMessage,
            text: null,
            status: null})
        }, 5000)
        setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const addPerson = () => {
    const isPerson = persons.find(element => {
      if (element.name === newName){
        return true;
      }
      return false;
    });

    isPerson 
    ? updatePerson()
    : createPerson()
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

      <Notification 
        message = {successMessage}
        />

      <Notification 
      message = {errorMessage}
      />
      

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
          key = {person.name}
          person = {person} 
          removePerson = {()=> removePerson(person.id, person)}
          />
      )}
    
    
    </div>
  )
}

export default App