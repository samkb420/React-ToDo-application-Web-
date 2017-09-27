import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import {connect } from "react-redux";
import { Item } from './Item'
import { ItemActions } from '../actions'

class ItemsListComp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newItemName: ''
    }
  }

  componentDidMount() {
    this.props.fetchItems();
  }
  // componentWillMount() {
  //   let messagesRef = fire.database().ref('items').orderByKey()
  //   messagesRef.on('child_added', snapshot => {
  //     let item = snapshot.val()
  //     // console.log('itemsList:componentWillMount: added item:', item)
  //     this.setState({
  //       items: [
  //         ...this.state.items,
  //         {
  //           id: item.id,
  //           text: item.text,
  //           completed: item.completed
  //         }
  //       ]
  //     })
  //   })
  // }

  render() {
    const handleSubmit = (e) => {
      e.preventDefault()
      if (this.state.newItemName === '') {
        console.log('ItemsListComp:handleSubmit: newItemName is empty')
      } else {
        this.props.addItem({
          // id: Math.floor(Math.random()*100000),
          text: this.state.newItemName,
          completed: false
        })
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
    addItem: bindActionCreators(ItemActions.addItem, dispatch),
    fetchItems: bindActionCreators(ItemActions.fetchAllItems, dispatch)
  }
}

export const ItemsList = connect(mapStateToProps, mapDispatchToProps)(ItemsListComp)
