import React, { Component } from 'react'

export default class Admin extends Component {
    componentDidMount(){
        alert(this.props.location.state.token)
    }
    render() {
        return (
            <div>
                Admin!
            </div>
        )
    }
}