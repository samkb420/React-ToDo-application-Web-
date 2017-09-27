import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import {connect } from "react-redux";
import { Item } from './Item'
import { ItemActions, GroupActions } from '../actions'

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
    console.log('ItemsList:render', this.props)
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

    const shareImgSrc = (this.props.isShared)
        ? 'https://freeiconshop.com/wp-content/uploads/edd/share-outline-filled.png'
        : 'http://sleep.urbandroid.org/wp-content/uploads/share-256.png'
    return (
      <div>
        {this.props.groupName && (
          <div>
            <p className="App-intro"><b>{this.props.groupName}</b> list
              <a href='#' onClick={() => this.props.toggleShareGroup(this.props.currGroupId)}>
                <img
                    alt="share"
                    src={shareImgSrc}
                    width='20'
                    height='20' />
              </a>
            </p>
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
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log('ItemsList:mapStateToProps', state.groupsReducer.groups)
  const currGroupId = state.groupsReducer.currGroupId
  const groups = state.groupsReducer.groups
  var groupName
  var isShared = false;
  if (currGroupId && groups.findIndex(gr => gr.id === currGroupId) !== -1) {
    const currGroup = state.groupsReducer.groups.find(gr => gr.id === currGroupId)
      groupName = currGroup.text
      isShared = currGroup.isShared
  }

  return {
    items: (state.groupsReducer.currGroupId) ? state.itemsReducer.filter(it => it.groupId === state.groupsReducer.currGroupId) : [],
    groupName,
    currGroupId,
    isShared
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addItem: bindActionCreators(ItemActions.addItem, dispatch),
    fetchItems: bindActionCreators(ItemActions.fetchAllItems, dispatch),
    toggleShareGroup: bindActionCreators(GroupActions.toggleSharing, dispatch)
  }
}

export const ItemsList = connect(mapStateToProps, mapDispatchToProps)(ItemsListComp)
