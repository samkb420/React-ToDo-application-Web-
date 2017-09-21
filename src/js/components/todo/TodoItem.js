import React from 'react';
import {partial} from './libs/TodoHelper'

export const TodoItem = (props) => {
	const removeHandler = partial(props.removeHandler, props.id)
	return (
		<li>
			<span className='delete-item'><a href='#' onClick={removeHandler}>x</a></span>
			<input type="checkbox" onChange={() => props.switchHandler(props.id)} 
				checked={props.isComplete}/>
			{props.name}
        </li>
    )
}

TodoItem.propTypes = {
	name: React.PropTypes.string.isRequired,
	isComplete: React.PropTypes.bool,
	id: React.PropTypes.number.isRequired,
	removeHandler: React.PropTypes.func.isRequired,
	switchHandler: React.PropTypes.func.isRequired
}
