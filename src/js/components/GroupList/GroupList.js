import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Helper from '../../reducers/Helper'
import { createGroup, removeGroup } from '../../actions'

class GroupListTmp extends Component {
  render() {
    const handleChange = (e) => {
      console.log('input text=', e.target.value)
      this.newGroupName = e.target.value
    }
    const handleSubmit = (e) => {
      e.preventDefault()
      console.log('input text submited=', this.newGroupName)
      this.props.createGroup(this.newGroupName)
    }
    const currGroupId = this.props.currGroupId;
    return (
      <div className='group-list'>
        {this.props.groups.map(group => (
          <span key={group.id}>
            {group.id === currGroupId ? (
              <span>{group.text}</span>
            ) : (
              <a href='#' onClick={() => console.log('group selected', group)} className='group-ref'>{group.text}</a>
            )}
            <button className='group-remove-btn' onClick={() => this.props.removeGroup(group.id)}> x </button>
          </span>
        ))
        }
        <form onSubmit={handleSubmit}>
          <input onChange={handleChange} type='text' />
        </form>

      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
console.log('GroupList:getGroups:', Helper.getGroups(state))
  return Object.assign({}, ownProps,
    {
      groups: Helper.getGroups(state),
      currGroupId: Helper.getCurrGroupId(state)
    })
}

const mapDispatchToProps = (dispatch) => {
  return Object.assign({}, {
    removeGroup: bindActionCreators(removeGroup, dispatch),
    createGroup: bindActionCreators(createGroup, dispatch)
  })
}
export const GroupList = connect(mapStateToProps, mapDispatchToProps)(GroupListTmp)
