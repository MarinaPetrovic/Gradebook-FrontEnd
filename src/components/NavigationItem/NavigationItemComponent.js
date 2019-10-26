import React, { Component } from 'react';
import {routes} from "../../routes";
import { Link } from 'react-router-dom';
import {
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavItem,
    MDBNavLink,
    MDBNavbarToggler,
    MDBCollapse,
    MDBCard,
    MDBMask,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBView,
    MDBContainer,
    MDBFormInline,
    MDBAnimation,
    MDBCardBody
  } from "mdbreact";

export class NavigationItemComponent extends Component  {
    constructor(props) {
        super(props)
    }

    callback = () => { };


    render() {
        let content = (<button className="bp3-button bp3-minimal" onClick={this.callback}>{this.props.label}</button>);

        if(this.props.route) {
            content = <MDBNavLink to={routes[this.props.route]}>{this.props.label}</MDBNavLink>;
        }

        return (content);
    }
    
}