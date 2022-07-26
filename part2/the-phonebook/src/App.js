
import { useState } from 'react'

const Person = ({ person }) =>{
  return (
    <div>{person.name} {person.number}</div>
  )
}
  

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])



  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] =useState('')
  const [searchText, setSearchText] =useState('')

  const addPerson = (event) =>{
    event.preventDefault()
    const personObject ={
      name: newName,
      number: newNumber
    }
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
      <div>
        filter shown with
       <input value={searchText} onChange = {handleTextChange}/>
      </div>
      <h2>add new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
                  value={newName} 
                  onChange ={handlePersonChange}
                />
        </div>
        <div>
        number: <input 
                value={newNumber} 
                onChange ={handleNumberChange}
              />
      </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
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