import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";

import { ItemActions } from './../actions'


class ItemComp extends Component {

  render() {
    console.log('ItemComp: render', this.props)
    // eslint-disable-next-line
    return (
      <li>
  			<span className='delete-item'><a href='#' onClick={() => this.props.handleRemove(this.props.id)}>x</a></span>
  			<input type="checkbox" onChange={() => this.props.handleToggle(this.props.id, this.props.completed)}
  				checked={this.props.completed}/>
  			{this.props.text}
      </li>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  console.log('item:mapStateToProps', state, ownProps)
  return ownProps
}

const mapDispatchToProps = (dispatch) => ({
  handleRemove: bindActionCreators(ItemActions.removeItem, dispatch),
  handleToggle: bindActionCreators(ItemActions.toggleItem, dispatch)
  // handleToggle: (id) => {
  //   // console.log('handleToggle', id)
  //   return dispatch(ItemActions.toggleItemAction(id))
  // }
})

export const Item = connect(mapStateToProps, mapDispatchToProps)(ItemComp)
