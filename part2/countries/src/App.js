import {useState, useEffect} from 'react'
import axios from 'axios'

const Filter = ({ onChange, value}) => {
  return (
    <div>
    find countries:
    <input onChange={onChange} value={value}></input>
  </div>
  )
}

const Countrie = ({ countrie }) => {
  return(
    <p>{countrie.name.common}</p>
  )
}

//generate an HTML list element for each value in a given object
const ListItem = ({ obj }) => {
  const values= Object.values(obj)
  return(
    values.map((value, i) =>
     <li key={i}>{value}</li>)
  )
}

const CountrieDetails = ({ countrie }) => {
  
  return (
    <div>
      <h1>{countrie.name.common}</h1>
      <div>capital: {countrie.capital}</div>
      <div>area: {countrie.area}</div>
      <h2>languages:</h2>
      <ul>
        <ListItem obj={countrie.languages}/>
      </ul>
      
      <img src={countrie.flags.png} alt="flag img"></img>
    </div>
  )
}


function App() {
  const [countries, setCountries] = useState([])
  const [searchText, setSearchText] = useState ('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response =>
        setCountries(response.data))
  }, [])

  const handleChange= (event) => {
    setSearchText(event.target.value)
  }
  
  function searchCountrie(countrie) {
    if (countrie.name.common.toLowerCase().match(searchText.toLowerCase()) !==null) {
      return countrie
    } 
  }
   let resultArray =[...countries];
   resultArray = countries.filter(searchCountrie)
   

  return (
    <div >
    <Filter onChange={handleChange} value={searchText}/>
    {(resultArray.length === 1 )
      
      ? <CountrieDetails countrie={resultArray[0]}/> 
      
     : (resultArray.length > 10) 
        ? "Too many matches, specify another filter"
      : resultArray.map(countrie => 
            <Countrie key={countrie.name.common}
                       countrie={countrie}/>)}
    </div>
  )
}

export default App;
