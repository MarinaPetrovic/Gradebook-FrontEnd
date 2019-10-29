import React, { Component } from 'react';
import {routes} from "../../routes";
import { MDBNavLink } from "mdbreact";

export class NavigationItemComponent extends Component  {   


    callback = () => { 
    };

    render() {
        let content = (<button className="bp3-button bp3-minimal" onClick={this.callback}>{this.props.label}</button>);

        if(this.props.route) {
            content = <MDBNavLink to={routes[this.props.route]}>{this.props.label}</MDBNavLink>;
        }

        return (content);
    }
    
}