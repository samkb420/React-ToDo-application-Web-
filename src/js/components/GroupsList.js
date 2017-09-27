import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import {connect } from "react-redux";
import { GroupActions } from '../actions'
import { Group } from './Group'

class GroupListComp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newGroupName: ''
        }
    }

    componentDidMount() {
        this.props.fetchGroups();
    }

    render () {
        const handleSubmit = (e) => {
            e.preventDefault()
            if (this.state.newGroupName === '') {
                console.log('GroupListComp:handleSubmit: newGroupName is empty')
            } else {
                this.props.createGroup(this.state.newGroupName)
                this.setState({
                    newGroupName: ''
                })
            }
        }

        const handleChange = (e) => {
            this.setState({
                newGroupName: e.target.value
            })
        }
        console.log('groupList: render: groups=', this.props.groups)

        return (
            <ul>
                {this.props.groups.map(gr =>
                    <Group key={gr.id} {...gr} isCurrGroup={this.props.currGroupId === gr.id} />
                )}
                <form onSubmit={handleSubmit}>
                    add group
                    <input
                        type="text"
                        onChange={handleChange}
                        value={this.state.newGroupName}/>
                </form>
            </ul>
        )
    }

}

const mapStateToProps = (state, ownProps) => {
    console.log('GroupsList:mapStateToProps', state, ownProps)
    return {
        groups: state.groupsReducer.groups,
        currGroupId: state.groupsReducer.currGroupId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createGroup: bindActionCreators(GroupActions.createGroup, dispatch),
        fetchGroups: bindActionCreators(GroupActions.fetchAllGroups, dispatch)
    }
}

export const GroupsList = connect(mapStateToProps, mapDispatchToProps)(GroupListComp)
