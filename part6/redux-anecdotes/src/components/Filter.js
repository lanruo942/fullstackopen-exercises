/*
 * @Author: Summer Lee
 * @Date: 2022-07-05 17:17:39
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-05 17:27:45
 */
import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const Filter = () => {
	const dispatch = useDispatch()

	const handleChange = (event) => {
		dispatch(filterChange(event.target.value))
	}

	const style = {
		marginBottom: 10
	}

	return (
		<div style={style}>
			filter <input type="text" onChange={handleChange} />
		</div>
	)
}

export default Filter