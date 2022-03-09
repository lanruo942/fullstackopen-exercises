/*
 * @Author: Summer Lee
 * @Date: 2022-03-06 16:24:41
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-03-09 16:21:09
 */
import React, { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [results, setResults] = useState([])
  
  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }

  useEffect(hook, [])

  const addPerson = (event) => {
    event.preventDefault()
    
    const trimName = newName.trim()
    const trimNumber = newNumber.trim()

    if (trimName === '') {
      return window.alert('Please enter your name.')
    }

    if (trimNumber === '') {
      return window.alert('Please enter your number.')
    }

    const isExist = persons.find(element => {
      return element.name.toLowerCase() === trimName.toLowerCase()
    })

    if (isExist) {
      window.alert(`${trimName} is already added to phonebook`)
    } else {
      const nameObject = {
        id: nanoid(),
        name: trimName,
        number: trimNumber
      }

      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNewSearch = (event) => {
    const newSearch = event.target.value.trim().toLowerCase()
    const list = persons.filter(person => person.name.toLowerCase().indexOf(newSearch) !== -1)

    if (list.length === 0) {
      setResults([])
    } else {
      setResults(list)
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <>
      <h2>Phonebook</h2>
      <Filter handleNewSearch={handleNewSearch} />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={persons} results={results} />
    </>
  )
}

export default App