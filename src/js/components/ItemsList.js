import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import {connect } from "react-redux";
import { Item } from './Item'
import { addItemAction } from '../actions'
import fire from '../../fire';

class ItemsListComp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newItemName: '',
      items: []
    }
  }

  componentWillMount() {
    let messagesRef = fire.database().ref('items').orderByKey()
    messagesRef.on('child_added', snapshot => {
      let item = snapshot.val()
      // console.log('itemsList:componentWillMount: added item:', item)
      this.setState({
        items: [
          ...this.state.items,
          {
            id: item.id,
            text: item.text,
            completed: item.completed
          }
        ]
      })
    })
  }

  render() {
    const handleSubmit = (e) => {
      e.preventDefault()
      if (this.state.newItemName === '') {
        // console.log('ItemsListComp:handleSubmit: newItemName is empty')
      } else {
        //pushing into firebase
        fire.database().ref('items').push({
          id: Math.floor(Math.random()*100000),
          text: this.state.newItemName,
          completed: false
        })
        // this.props.handleAddItem(this.state.newItemName)
        this.setState({
          newItemName: ''
        })
      }
    }

    const handleChange = (e) => {
      this.setState({
        newItemName: e.target.value
      })
    }

    return (
      <ul>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={handleChange}
            value={this.state.newItemName}/>
        </form>

        {this.state.items.map(it =>
          <Item key={it.id} {...it}/>
        )}
      </ul>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  // console.log('ItemsList:mapStateToProps', state, ownProps)
  return {
    items: state.itemsReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleAddItem: bindActionCreators(addItemAction, dispatch)
  }
}

export const ItemsList = connect(mapStateToProps, mapDispatchToProps)(ItemsListComp)
