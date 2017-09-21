import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import {connect } from "react-redux";
import { Item } from './Item'
import { addItemAction } from '../actions'

class ItemsListComp extends Component {

  state = {
    newItemName: ''
  }

  render() {
    const handleSubmit = (e) => {
      e.preventDefault()
      if (this.state.newItemName === '') {
        console.log('ItemsListComp:handleSubmit: newItemName is empty')
      } else {
        this.props.handleAddItem(this.state.newItemName)
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

        {this.props.items.map(it =>
          <Item key={it.id} id={it.id}/>
        )}
      </ul>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log('ItemsList:mapStateToProps', state, ownProps)
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
