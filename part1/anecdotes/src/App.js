/*
 * @Author: Summer Lee
 * @Date: 2022-03-04 16:09:06
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-03-04 19:53:31
 */
import React, { useState } from 'react'

const Display = ({ votes }) => (
  <div>
    <h2>Anecdote of the day</h2>
    <p>has {votes} votes</p>
  </div>
)

const Vote = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const Button = ({ handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
)

const MostVotes = ({ anecdote, votes }) => (
  <div>
    <h2>Anecdote with most votes</h2>
    <p>{anecdote}</p>
    <p>has {votes} votes</p>
  </div>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(new Uint8Array(anecdotes.length))
  const [mostVote, setMostVote] = useState(0)

  const randomNum = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)

    return Math.floor(Math.random() * (max - min)) + min
  }

  const setToVote = (selected) => {
    const copy = [...vote]
    copy[selected] += 1
    setVote(copy)

    const isLargeNumber = (value) => value >= Math.max.apply(Math, copy)
    setMostVote(copy.findIndex(isLargeNumber))
  }

  const setToValue = (value) => {
    setSelected(value)
  }

  return (
    <>
      {anecdotes[selected]}
      <br />
      <Display votes={vote[selected]} />
      <Vote handleClick={() => setToVote(selected)} text="vote" />
      <Button handleClick={() => setToValue(randomNum(0, anecdotes.length))} text="next anecdote" />
      <MostVotes anecdote={anecdotes[mostVote]} votes={vote[mostVote]} />
    </>
  )
}

export default App