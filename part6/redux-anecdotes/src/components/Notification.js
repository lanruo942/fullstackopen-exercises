/*
 * @Author: Summer Lee
 * @Date: 2022-07-04 02:47:57
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-05 17:13:42
 */
import { useSelector } from 'react-redux'

const Notification = () => {
	const notification = useSelector(state => state.notification)

	const style = {
		border: 'solid',
		padding: 10,
		borderWidth: 1
	}

	return (
		<div>
			{notification !== null ?
				<div style={style}>
					{notification}
				</div> :
				<></>
			}
		</div>
	)
}

export default Notification