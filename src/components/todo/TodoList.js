import React from 'react';
import {TodoItem} from './TodoItem';

export const TodoList = (props) => (
		<div className="Todo-List">
      <ul>
        {props.todos.map(todo =>
        	//#6 6:40: I wonder why we set key here directly and
        	// it cannot be applied inside TodoItem
          <TodoItem key={todo.id} removeHandler={props.removeHandler} switchHandler={props.switchHandler} {...todo}/>
        )}
      </ul>
    </div>
	)

TodoList.propTypes = {
	todos: React.PropTypes.array.isRequired,
	removeHandler: React.PropTypes.func.isRequired,
	switchHandler: React.PropTypes.func.isRequired
}
