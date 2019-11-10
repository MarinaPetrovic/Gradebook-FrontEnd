import React, { Component } from "react";
import { MDBNavItem, MDBNavbarNav } from "mdbreact";
import { NavigationItemComponent as NavigationItem } from "../NavigationItem/NavigationItemComponent";
import { routes } from "../../routes";

export class TeacherPanel extends Component { 
    render() {
        return (
            <div>
                <MDBNavbarNav >               
                <MDBNavItem >
                    <NavigationItem label={"Predmeti"} route={routes.showTeacherReport} />
                </MDBNavItem>                 
                </MDBNavbarNav>
            </div>
        )
    }
}