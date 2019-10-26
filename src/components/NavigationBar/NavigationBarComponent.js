import React, { Component } from 'react';
import { NavigationItemComponent as NavigationItem } from "../NavigationItem/NavigationItemComponent";
import {
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavItem,
    MDBContainer,
    MDBFormInline,
} from "mdbreact";

export class NavigationBarComponent extends Component {
    constructor(props) {
        super(props);
    }

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
                        <MDBNavbarNav right>
                            <MDBNavItem>
                                {this.props.state.isLoggedIn && <NavigationItem label={this.props.state.fullName} route={"profile"} />}
                            </MDBNavItem>
                            <MDBNavItem>
                                <NavigationItem label={"Home"} route={"login"} />
                            </MDBNavItem>
                            <MDBNavItem>
                                {this.props.state.isLoggedIn && <NavigationItem label={"Logout"} route={"login"} />}
                            </MDBNavItem>
                        </MDBNavbarNav>
                    </MDBContainer>
                </MDBNavbar>

                {/*<nav className="bp3-navbar .modifier">
                    <div className="bp3-navbar-group bp3-align-left">
                        <div className="bp3-navbar-heading">Elektronski dnevnik</div>
                        {/*<input class="bp3-input" placeholder="Search files..." type="text" />
                    </div>
                    <div className="bp3-navbar-group bp3-align-right">
                        {this.props.state.isLoggedIn && <NavigationItem label={this.props.state.fullName} route={"profile"} />}
                        <NavigationItem label={"Home"} route={"login"} />
                        <span className="bp3-navbar-divider"></span>
                        {this.props.state.isLoggedIn && <NavigationItem label={"Logout"} route={"login"} />}
                    </div>
                </nav>*/}
            </div>
        )
    }

}