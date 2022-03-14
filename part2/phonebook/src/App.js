/*
 * @Author: Summer Lee
 * @Date: 2022-03-06 16:24:41
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-03-13 15:05:56
 */
import React, { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/notification/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [results, setResults] = useState([])
  const [alertMessage, setAlertMessage] = useState(null)
  const [alertLevel, setAlertLevel] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const resetAlertMessage = () => {
    setTimeout(() => {
      setAlertMessage(null)
    }, 5000);
  }

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
        const changePerson = { ...isExist, number: trimNumber }
        
        personService
          .update(isExist.id, changePerson)
          .then(returnedPerson => {
            setAlertLevel('success')
            setAlertMessage(`Updated ${returnedPerson.name}`)
            resetAlertMessage()
            setPersons(persons.map(person => person.id !== isExist.id ? person : returnedPerson))
            setResults(results.map(result => result.id !== isExist.id ? result : returnedPerson))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setAlertLevel('error')
            setAlertMessage(`Information of ${changePerson.name} has already been removed from server`)
            resetAlertMessage()
            setPersons(persons.filter(person => person.id !== isExist.id))
            setResults(results.filter(result => result.id !== isExist.id))
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
          setAlertLevel('success')
          setAlertMessage(`Added ${returnedPerson.name}`)
          resetAlertMessage()
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
    const person = persons.find(n => n.id === id)
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .delPerson(id)
        .then(response => {
          if (response.status === 200) {
            setPersons(persons.filter(n => n.id !== id))
            setResults(results.filter(n => n.id !== id))
          }
        })
        .catch(error => {
          setAlertLevel('error')
          setAlertMessage(`Information of ${person.name} has already been removed from server`)
          resetAlertMessage()
          setPersons(persons.filter(n => n.id !== id))
          setResults(results.filter(n => n.id !== id))
        })
    }
  }

  return (
    <>
      <h2>Phonebook</h2>
      <Notification level={alertLevel} message={alertMessage} />
      <Filter handleNewSearch={handleNewSearch} />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={persons} results={results} delPersonOf={delPersonOf} />
    </>
  )
}

export default App