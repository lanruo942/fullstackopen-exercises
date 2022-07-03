/*
 * @Author: Summer Lee
 * @Date: 2022-07-04 02:02:37
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-04 02:51:36
 */
import { useSelector, useDispatch } from 'react-redux'
import { vote } from './reducers/anecdoteReducer'
import NewAnecdotes from './components/NewAnecdotes'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(vote(anecdote))}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <NewAnecdotes />
    </div>
  )
}

export default App