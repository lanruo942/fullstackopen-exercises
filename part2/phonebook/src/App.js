/*
 * @Author: Summer Lee
 * @Date: 2022-03-06 16:24:41
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-03-07 14:37:24
 */
import React, { useState } from 'react'
import { nanoid } from 'nanoid'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    {
      id: nanoid(),
      name: 'Arto Hellas',
      number: '040-1234567'
    }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addName = (event) => {
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
      return element.name === trimName
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

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>name: <input value={newName} onChange={handleNameChange}/></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      <table>
        <tbody>
          {persons.map(person => 
            <Person key={person.id} person={person} />  
          )}
        </tbody>
      </table>
    </>
  )
}

export default App