import {useState, useEffect} from 'react'
import axios from 'axios';

const Filter = ({ onChange, value}) => {
  return (
    <div>
    find countries:
    <input onChange={onChange} value={value}></input>
  </div>
  )
}

const Countrie = ({ countrie, toggleShow}) => {
  return(
    <div>
      {countrie.name.common}
      <button onClick={toggleShow}>show</button>
    </div> 
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

const WeatherDetails = ({ countrie }) => {
  const [weatherData, setWeatherData] = useState({})
  const keyAPI = process.env.REACT_APP_API_KEY
  const lat = countrie.latlng[0];
  const lng = countrie.latlng[1];
  const apiUrl =  `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${keyAPI}&units=metric`
  
 
  useEffect(() => {
    console.log('weather conditions')
    axios
      .get(apiUrl)
      .then(response =>
          setWeatherData(response.data.list[0])
          )
  }, [])

  // console.log ('weatherData is', weatherData)

  let cityWeather = {
    temp: 0,
    windSpeed: 0,
    conditions: { id : 0, main: '', description : '', icon : ''}
  }


  function updateCityWeather() {
    if (Object.keys(weatherData).length !== 0) {
      cityWeather.temp = weatherData.main.temp
      cityWeather.windSpeed = weatherData.wind.speed 
      cityWeather.conditions = weatherData.weather[0]

    }
  }
  updateCityWeather()
  // console.log('cityWeather is', cityWeather) 

  const icon  = cityWeather.conditions.icon
  const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`

  return (
    <div>
      <h1>Weather in {countrie.capital}</h1>
      <div>temperature {cityWeather.temp} Celcius</div>
      <img src={iconURL} alt='weather icon'/>
      <div>wind {cityWeather.windSpeed} m/s</div>
    </div>
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

      <WeatherDetails countrie ={countrie}/>

    </div>
  )
}


function App() {
  const [countries, setCountries] = useState([])
  const [searchText, setSearchText] = useState ('')
  const [show, setShow] = useState({})
 
  

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

const toggleShow = (countrie) => {
  let name = countrie.name.common
  let copyArr ={}
  copyArr[name] = true
  setShow({...copyArr})
}

  return (
    <div >
    <Filter onChange={handleChange} value={searchText}/>
    {(resultArray.length === 1 )
      
      ? <CountrieDetails countrie={resultArray[0]}/> 
      
     : (resultArray.length > 10) 
        ? "Too many matches, specify another filter"
      : resultArray.map(countrie => 
        show[countrie.name.common]
        ? <CountrieDetails 
            key={countrie.name.common} 
            countrie={countrie}
          /> 
        : <Countrie 
            key={countrie.name.common}
            countrie={countrie}
            toggleShow={() => toggleShow(countrie)}
          />

      )}
    </div>
  )
}

export default App;
