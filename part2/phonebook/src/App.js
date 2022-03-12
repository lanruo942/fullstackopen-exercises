/*
 * @Author: Summer Lee
 * @Date: 2022-03-06 16:24:41
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-03-12 22:09:35
 */
import React, { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [results, setResults] = useState([])

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

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
      if (window.confirm(`${trimName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(isExist.id, { ...isExist, number: trimNumber})
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== isExist.id ? person : returnedPerson))
            setResults(results.map(result => result.id !== isExist.id ? result : returnedPerson))
            setNewName('')
            setNewNumber('')
          })
      }
    } else {
      const personObject = {
        name: trimName,
        number: trimNumber,
        id: nanoid()
      }
      
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handleNewSearch = (event) => {
    const newSearch = event.target.value.trim().toLowerCase()
    const list = persons.filter(person => person.name.toLowerCase().indexOf(newSearch) !== -1)

    if (newSearch === '' || list.length === 0) {
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

  const delPersonOf = id => {
    if (window.confirm(`Delete ${persons.find(n => n.id === id).name} ?`)) {
      personService
        .delPerson(id)
        .then(response => {
          if (response.status === 200) {
            setPersons(persons.filter(n => n.id !== id))
            setResults(results.filter(n => n.id !== id))
          }
        })
    }
  }

  return (
    <>
      <h2>Phonebook</h2>
      <Filter handleNewSearch={handleNewSearch} />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={persons} results={results} delPersonOf={delPersonOf} />
    </>
  )
}

export default App