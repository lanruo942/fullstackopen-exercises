/*
 * @Author: Summer Lee
 * @Date: 2022-03-09 17:07:22
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-03-10 19:41:44
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
      <DisplayCountry country={results[0]} />
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

  const getCountries = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }

  useEffect(getCountries, [])
  
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