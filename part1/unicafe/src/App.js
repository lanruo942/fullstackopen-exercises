/*
 * @Author: Summer Lee
 * @Date: 2022-03-04 10:28:50
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-03-04 17:54:35
 */
import React, { useState } from 'react'

const Header = ({ title }) => (
  <h1>{title}</h1>
)

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const StatisticsLine = ({ text, value }) => (
  <tbody>
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  </tbody>
)

const Statistics = ({ good, neutral, bad }) => {
  const all = (good + neutral + bad) ? (good + neutral + bad) : 0
  
  if (all > 0) {
    const average = (good - bad) / all
    const positive = good / all + '%'
    
    return (
      <div>
        <h2>Statistics</h2>
        <table>
          <StatisticsLine text="good" value={good} />
          <StatisticsLine text="neutral" value={neutral} />
          <StatisticsLine text="bad" value={bad} />
          <StatisticsLine text="all" value={all} />
          <StatisticsLine text="average" value={average} />
          <StatisticsLine text="positive" value={positive} />
        </table>
      </div>
    )
  } else {
    return (
      <div>
        <h2>Statistics</h2>
        <p>No feedback given</p>
      </div>
    )
  }
}

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
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App