import React from 'react';

export const TodoForm = (props) => (
		<form onSubmit={props.handleSubmit}>
        	<input type="text" 
        		onChange={props.handleState}
        		value={props.currentTodo}/>
    	</form>
	)

//#7 0:30: React mechanism for validating input types
TodoForm.propTypes = {
	currentTodo: React.PropTypes.string.isRequired,
	handleState: React.PropTypes.func.isRequired,
	handleSubmit: React.PropTypes.func.isRequired
}