import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";

import { GroupActions } from './../actions'


class GroupComp extends Component {

    render() {
        // console.log('GroupComp: render', this.props)
        const active = (this.props.isCurrGroup) ? 'active' : ''
        // eslint-disable-next-line
        return (
            <li className='group-item'>
                <input type='button' className={active} value={this.props.text} onClick={() => this.props.handleSelect(this.props.id)}/>
                <span className='delete-item'><a href='#' onClick={() => this.props.handleRemove(this.props.id)}>x</a></span>
            </li>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    // console.log('group:mapStateToProps', state, ownProps)
    return Object.assign({}, state, {
        ...ownProps
    })
}

const mapDispatchToProps = (dispatch) => ({
    handleRemove: bindActionCreators(GroupActions.removeGroup, dispatch),
    handleSelect: bindActionCreators(GroupActions.setCurrentGroup, dispatch)
})

export const Group = connect(mapStateToProps, mapDispatchToProps)(GroupComp)
