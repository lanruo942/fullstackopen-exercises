/*
 * @Author: Summer Lee
 * @Date: 2022-03-09 17:07:22
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-03-11 14:39:09
 */
import React, { useState, useEffect} from 'react'
import axios from 'axios'
import { nanoid } from 'nanoid'

const Language = ({ language }) => (
  <li>{language}</li>
)

const DisplayCountry = ({ country }) => {
  const name = country.name.common
  const capital = country.capital
  const population = country.population
  const languages = Object.values(country.languages)
  const flag = country.flags

  return (
    <div>
      <h1>{name}</h1>
      <p>capital {capital}</p>
      <p>population {population}</p>
      <h2>languages</h2>
      <ul>
        {languages.map(language =>
          <Language key={language} language={language} />
        )}
      </ul>
      <img src={flag.png} alt={name} />
    </div>
  )
}

const DisplayWeather = ({ city }) => {
  const api_key = process.env.REACT_APP_API_KEY
  const [weathers, setWeathers] = useState({
    temp: 0,
    icon: '',
    wind: '' 
  })

  useEffect(() => {
    axios
      .get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${api_key}`)
      .then(response => {
        const lat = response.data[0].lat
        const lon = response.data[0].lon

        axios
          .get(`http://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${lat}&lon=${lon}&appid=${api_key}`)
          .then(response => {
            if (Object.keys(response.data).length) {
              const weathersObj = {}
              weathersObj['temp'] = (5 / 9 * (response.data.main.temp - 32)).toFixed(2)
              weathersObj['icon'] = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
              weathersObj['wind'] = `${response.data.wind.speed} mph degrees ${response.data.wind.deg}`

              setWeathers(weathersObj)

              // Prevent memory leaks
              return () => setWeathers({})
            }
          })
      })
  }, [api_key, city])

  return (
    <div>
      <h2>Weather in {city}</h2>
      <p>temperature: {weathers.temp} Celsius</p>
      <img src={weathers.icon} alt="" />
      <p>wind: {weathers.wind}</p>
    </div>
  )
}

const DisplayLine = ({ result, handleShow }) => (
  <div>
    {result.name.common}
    <button onClick={() => handleShow(result)}>show</button>
  </div>
)

const Display = ({ results, handleShow }) => {
  const reLength = results.length
  if (reLength > 10) {
    return (
      <div>Too many matches, specify another filter.</div>
    )
  } else if (reLength === 1) {
    return (
      <div>
        <DisplayCountry country={results[0]} />
        <DisplayWeather city={results[0].capital} />
      </div>
    )
  } else {
    return (
      <div>
        {results.map(result => 
          <DisplayLine key={result.id} result={result} handleShow={handleShow} />
        )}
      </div>
    )
  }
}

const Filter = ({ newSearch, handleSearch }) => (
  <div>
    find countries&nbsp;
    <input id="search-name" value={newSearch} onInput={handleSearch}/>
  </div>
)

const App = () => {
  const [countries, setCountries] = useState([])
  const [results, setResults] = useState([])
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])
  
  const handleSearch = (event) => {    
    const search = event.target.value.trim().toLowerCase()
    const list = countries
      .filter(country => country.name.common.toLowerCase().indexOf(search) !== -1)
      .map(v => ({ ...v, id: nanoid() }))

    setNewSearch(event.target.value)
    setResults(list)
  }

  const handleShow = (result) => {
    setNewSearch(result.name.common)
    setResults(new Array(result))
  }

  return (
    <>
      <Filter newSearch={newSearch} handleSearch={handleSearch} />
      <Display results={results} handleShow={handleShow} />
    </>
  )
}

export default App