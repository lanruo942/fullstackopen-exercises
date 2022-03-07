/*
 * @Author: Summer Lee
 * @Date: 2022-03-06 16:24:41
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-03-07 12:41:02
 */
import React, { useState } from 'react'
import { nanoid } from 'nanoid'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    {
      id: nanoid(),
      name: 'Arto Hellas'
    }
  ])
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()

    const nameObject = {
      id: nanoid(),
      name: newName
    }

    setPersons(persons.concat(nameObject))
    setNewName('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
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