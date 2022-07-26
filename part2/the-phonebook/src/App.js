
import { useState } from 'react'

const Person = ({ person }) =>{
  return (
    <div>{person.name}</div>
  )
}
  

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 

  const [newName, setNewName] = useState('')

  const addPerson = (event) =>{
    event.preventDefault()
    const personObject ={
      name: newName
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
  }
    

  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
                  value={newName} 
                  onChange ={handlePersonChange}
                />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
  
      {persons.map(person =>
        <Person key={person.name} person={person}/>
      )}
    
    
    </div>
  )
}

export default App