/*
 * @Author: Summer Lee
 * @Date: 2022-07-04 02:47:57
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-07 02:17:02
 */
import { connect } from 'react-redux'

const Notification = (props) => {
	const style = {
		border: 'solid',
		padding: 10,
		borderWidth: 1
	}

	return (
		<div>
			{props.notification !== null ?
				<div style={style}>
					{props.notification}
				</div> :
				<></>
			}
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		notification: state.notification
	}
}

export default connect(mapStateToProps)(Notification)