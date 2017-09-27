import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";

import { GroupActions } from './../actions'


class GroupComp extends Component {

    render() {
        // console.log('GroupComp: render', this.props)
        const active = (this.props.isCurrGroup) ? 'active' : ''
        // eslint-disable-next-line
        var groupName = this.props.isShared ? this.props.text + '(shared)' : this.props.text
        return (
            <li className='group-item'>
                <input type='button' className={active} value={groupName} onClick={() => this.props.handleSelect(this.props.id)}/>
                {!this.props.isShared && (
                    <span className='delete-item'><a href='#' onClick={() => this.props.handleRemove(this.props.id)}>x</a></span>
                )}

            </li>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    // console.log('group:mapStateToProps', state, ownProps)
    return Object.assign({}, state, {
        ...ownProps,
        isShared: ownProps.isShared && ownProps.uid !== state.authReducer.user.uid
    })
}

const mapDispatchToProps = (dispatch) => ({
    handleRemove: bindActionCreators(GroupActions.removeGroup, dispatch),
    handleSelect: bindActionCreators(GroupActions.setCurrentGroup, dispatch)
})

export const Group = connect(mapStateToProps, mapDispatchToProps)(GroupComp)
