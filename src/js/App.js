import React, { Component } from 'react';
import logo from './../logo.svg';
import './../css/App.css';
import { ItemsList } from './components/ItemsList'
// import {TodoForm, TodoList, Footer} from './components/todo';
// import {addTodo, generateUniqueId, removeTodo, switchTodo, getTodos} from './components/todo/libs/TodoHelper';
import { bindActionCreators } from 'redux'
import {connect } from "react-redux";
// import { incrementAction, decrementAction } from './actions'
// import { addItem, toggleItem, removeItem } from './actions'

class AppComp extends Component {
  // // ES6 syntax: defining class property
  // //#11
  state = {
    todos: [
      {id: 1, name: 'Learn JSX', isComplete: true},
      {id: 2, name: 'Learn JS', isComplete: false},
      {id: 3, name: 'Learn React', isComplete: false}
    ],
    currentTodo: '',
    errorMsg: ''
  }
  //
  // //#17: why we define static field in child Component
	// static contextTypes = {
	//     route: React.PropTypes.string
	// }
  //
  //ES6 syntax: defining function-field
  //#11
  handleState = (e) => {
    //#4 2.40 - why we cannot set dirrectly? why we use setState() method,
    // is it React method?
    this.setState({
      currentTodo: e.target.value
    })
  }
  //
  // handleSubmit = (e) => {
  //   //To prevent submit the form from get which refreshs the page
  //   e.preventDefault()
  //
  //   const newItem = {id: generateUniqueId(), name: this.state.currentTodo, isComplete: false}
  //   this.setState({
  //     todos: addTodo(this.state.todos, newItem),
  //     currentTodo: '',
  //     errorMsg: ''
  //   })
  // }
  //
  // handleErrorSubmit = (e) => {
  //   //To prevent submit the form from get which refreshs the page
  //   e.preventDefault()
  //
  //   this.setState({
  //     errorMsg: 'Empty submit form'
  //   })
  // }
  //
  // removeHandler = (id, e) => {
  //   e.preventDefault()
  //
  //   this.setState({
  //     todos: removeTodo(this.state.todos, id)
  //   })
  // }
  //
  // switchHandler = (id) => {
  //   const newTodos = switchTodo(this.state.todos, id)
  //   this.setState({
  //     todos: newTodos
  //   })
  // }

  render() {
    // const handleSubmit = this.state.currentTodo ? this.handleSubmit : this.handleErrorSubmit;
    // const shownTodos = this.state.todos;
    //getTodos(this.context.route, this.state.todos);
    console.log('app:render:props', this.props)
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
          <span>
            <button onClick={this.props.increment}>+</button>
            {this.props.counter}
            <button onClick={this.props.decrement}>-</button>
          </span>
          <ItemsList />
        </div>
      </div>
    );
  }
}

// {this.state.errorMsg && <span className="error">{this.state.errorMsg}</span>}
// <TodoForm
//   handleState={this.handleState}
//   handleSubmit={handleSubmit}
//   currentTodo={this.state.currentTodo}/>
// <TodoList todos={shownTodos} removeHandler={this.props.removeHandler} switchHandler={this.props.handleToggleItem}/>
// <Footer/>

const mapStateToProps = (state, ownProps) => {
  console.log('app:mapStateToProps:state', state)
  return {
      // currentTodo: '',
      // errorMsg: '',
      // counter: state.couterResucer.counter
    }
}

const mapDispatchToProps = (dispatch) => {
  const actions = {
    // increment: incrementAction,
    // decrement: decrementAction
    increment: () => ({type:''}),
    decrement: () => ({type:''})
  }
  return bindActionCreators(actions, dispatch)
  // return {
    // increment: () => dispatch(incrementAction),
    // decrement: () => dispatch(decrementAction)
    // handleAddItem: (text) => dispatch(addItem(text)),
    // handleToggleItem: (id) => dispatch(toggleItem(id)),
    // handleRemoveItem: (id) => dispatch(removeItem(id))
  // }
}

const App = connect(mapStateToProps, mapDispatchToProps)(AppComp)
export default App;
