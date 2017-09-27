import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";

import { GroupActions } from './../actions'


class GroupComp extends Component {

    render() {
        console.log('GroupComp: render', this.props)
        // eslint-disable-next-line
        return (
            <li className='group-item'>
                <span className='delete-item'><a href='#' onClick={() => this.props.handleRemove(this.props.id)}>x</a></span>
                {this.props.text}
            </li>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    console.log('group:mapStateToProps', state, ownProps)
    return ownProps
}

const mapDispatchToProps = (dispatch) => ({
    handleRemove: bindActionCreators(GroupActions.removeGroup, dispatch)
})

export const Group = connect(mapStateToProps, mapDispatchToProps)(GroupComp)
