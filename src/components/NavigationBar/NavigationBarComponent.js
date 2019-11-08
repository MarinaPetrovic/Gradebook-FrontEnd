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
import { StudentPanel } from "../NavigationPanels/StudentPanel";
import { ParentPanel } from "../NavigationPanels/ParentPanel";
import { TeacherPanel } from "../NavigationPanels/TeacherPanel";
import { routes } from '../../routes';

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
                                        <NavigationItem label={this.props.state.fullName} route={routes.profile} />
                                    </MDBNavItem>
                                    {
                                        this.props.state.isAdmin && (
                                        <AdminPanel></AdminPanel>
                                    )}
                                    {
                                        this.props.state.isParent && (
                                        <ParentPanel></ParentPanel>
                                    )}
                                    {
                                        this.props.state.isParent && (
                                        <StudentPanel></StudentPanel>
                                    )}
                                    {
                                        this.props.state.isParent && (
                                        <TeacherPanel></TeacherPanel>
                                    )}
                                    <MDBNavItem>
                                        <NavigationItem state={this.props.state} label={"Logout"} route={routes.login} />
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