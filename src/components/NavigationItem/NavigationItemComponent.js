import React, { Component } from 'react';
import { routes } from "../../routes";
import { MDBNavLink } from "mdbreact";

export class NavigationItemComponent extends Component {
    callback = () => {
        if (this.props.route === routes.login) {
            localStorage.clear("token");
            this.props.state.logoutHandler();
        }
    };

    render() {
        let content = (<button className="bp3-button bp3-minimal" onClick={this.callback}>{this.props.label}</button>);

        if (this.props.route) {
            content = <MDBNavLink onClick={this.callback} to={this.props.route}>{this.props.label}</MDBNavLink>;
        }

        return (content);
    }

}