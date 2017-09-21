import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";

import { removeItemAction, toggleItemAction } from './../actions'


class ItemComp extends Component {

  render() {
    console.log('ItemComp: render', this.props)
    // eslint-disable-next-line
    return (
      <li>
  			<span className='delete-item'><a href='#' onClick={() => this.props.handleRemove(this.props.id)}>x</a></span>
  			<input type="checkbox" onChange={() => this.props.handleToggle(this.props.id)}
  				checked={this.props.completed}/>
  			{this.props.text}
      </li>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  console.log('Item:mapStateToProps', state, ownProps)
  const item = state.itemsReducer.find(it => it.id === ownProps.id)
  return {
    ...item
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleRemove: bindActionCreators(removeItemAction, dispatch),
  handleToggle: (id) => {
    console.log('handleToggle')
    return dispatch(toggleItemAction(id))
  }
})

export const Item = connect(mapStateToProps, mapDispatchToProps)(ItemComp)
