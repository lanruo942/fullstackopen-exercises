/*
 * @Author: Summer Lee
 * @Date: 2022-07-04 02:02:37
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-05 17:24:54
 */
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = () => {
	return (
		<div>
			<h2>Anecdotes</h2>
			<Notification />
			<Filter />
			<AnecdoteList />
			<AnecdoteForm />
		</div>
	)
}

export default App