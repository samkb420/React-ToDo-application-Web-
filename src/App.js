import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {TodoForm, TodoList, Footer} from './components/todo';
import {addTodo, generateUniqueId, removeTodo, switchTodo, getTodos} from './components/todo/libs/TodoHelper';

class App extends Component {
  // ES6 syntax: defining class property
  //#11
  state = {
    todos: [
      {id: 1, name: 'Learn JSX', isComplete: true},
      {id: 2, name: 'Learn JS', isComplete: false},
      {id: 3, name: 'Learn React', isComplete: false}
    ],
    currentTodo: '',
    errorMsg: ''
  }

  //#17: why we define static field in child Component
	static contextTypes = {
	    route: React.PropTypes.string
	}

  //ES6 syntax: defining function-field
  //#11
  handleState = (e) => {
    //#4 2.40 - why we cannot set dirrectly? why we use setState() method,
    // is it React method?
    this.setState({
      currentTodo: e.target.value
    })
  }

  handleSubmit = (e) => {
    //To prevent submit the form from get which refreshs the page
    e.preventDefault()

    const newItem = {id: generateUniqueId(), name: this.state.currentTodo, isComplete: false}
    this.setState({
      todos: addTodo(this.state.todos, newItem),
      currentTodo: '',
      errorMsg: ''
    })
  }

  handleErrorSubmit = (e) => {
    //To prevent submit the form from get which refreshs the page
    e.preventDefault()

    this.setState({
      errorMsg: 'Empty submit form'
    })
  }

  removeHandler = (id, e) => {
    e.preventDefault()

    this.setState({
      todos: removeTodo(this.state.todos, id)
    })
  }

  switchHandler = (id) => {
    const newTodos = switchTodo(this.state.todos, id)
    this.setState({
      todos: newTodos
    })
  }

  render() {
    const handleSubmit = this.state.currentTodo ? this.handleSubmit : this.handleErrorSubmit;
    const shownTodos = this.state.todos;
    //getTodos(this.context.route, this.state.todos);

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          hello you
        </p>
        <div className="Todo-App">
          {this.state.errorMsg && <span className="error">{this.state.errorMsg}</span>}
          <TodoForm
            handleState={this.handleState}
            handleSubmit={handleSubmit}
            currentTodo={this.state.currentTodo}/>
          <TodoList todos={shownTodos} removeHandler={this.removeHandler} switchHandler={this.switchHandler}/>
          <Footer/>
        </div>
      </div>
    );
  }
}

export default App;
