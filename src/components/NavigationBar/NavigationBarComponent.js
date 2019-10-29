import React, { Component } from 'react';
import { NavigationItemComponent as NavigationItem } from "../NavigationItem/NavigationItemComponent";
import {
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavItem,
    MDBContainer,
} from "mdbreact";
import { AdminPanel } from "../NavigationPanels/AdminPanel";

export class NavigationBarComponent extends Component {

    render() {
        return (
            <div>
                <MDBNavbar
                    color="primary-color"
                    dark
                    expand="md"
                    fixed="top"
                    scrolling
                    transparent
                >
                    <MDBContainer>
                        <MDBNavbarBrand>
                            <strong className="white-text">Elektronski dnevnik</strong>
                        </MDBNavbarBrand>
                        {
                            this.props.state.isLoggedIn && (
                                <MDBNavbarNav right>
                                    <MDBNavItem>
                                        <NavigationItem label={this.props.state.fullName} route={"profile"} />
                                    </MDBNavItem>
                                    <AdminPanel></AdminPanel>
                                    <MDBNavItem>
                                        <NavigationItem label={"Logout"} route={"login"} />
                                    </MDBNavItem>
                                </MDBNavbarNav>
                            )
                        }
                    </MDBContainer>
                </MDBNavbar>
            </div>
        )
    }

}