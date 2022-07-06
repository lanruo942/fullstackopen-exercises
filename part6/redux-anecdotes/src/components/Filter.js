/*
 * @Author: Summer Lee
 * @Date: 2022-07-05 17:17:39
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-07 02:20:38
 */
import { connect } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const Filter = (props) => {
	const handleChange = (event) => {
		props.filterChange(event.target.value)
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

const mapDispatchToProps = {
	filterChange
}

export default connect(null, mapDispatchToProps)(Filter)