/*
 * @Author: Summer Lee
 * @Date: 2022-03-04 10:28:50
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-03-04 14:39:03
 */
import React, { useState } from 'react'

const Header = ({ title }) => (
  <h1>{title}</h1>
)

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const Display = ({ good, neutral, bad }) => (
  <div>
    <h2>Statistics</h2>
    <p>good {good}</p> 
    <p>neutral {neutral}</p>
    <p>bad {bad}</p>
  </div>
)

const App = () => {
  const [ good, setGood ] =useState(0)
  const [ neutral, setNeutral ] = useState(0)
  const [ bad, setBad ] = useState(0)

  const setToValue = (newClick) => {
    if (newClick === 'good') {
      setGood(good + 1)
    } else if (newClick === 'neutral') {
      setNeutral(neutral + 1)
    } else {
      setBad(bad + 1)
    }
  }

  const title = 'give feedback'

  return (
    <>
      <Header title={title} />
      <Button handleClick={() => setToValue('good')} text="good" />
      <Button handleClick={() => setToValue('neutral')} text="neutral" />
      <Button handleClick={() => setToValue('bad')} text="bad" />
      <Display good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App