import React, { Component } from "react";
import { MDBNavItem, MDBNavbarNav } from "mdbreact";
import { NavigationItemComponent as NavigationItem } from "../NavigationItem/NavigationItemComponent";
import { routes } from "../../routes";

export class StudentPanel extends Component {    
    render() {
        return (
            <div>
                <MDBNavbarNav >               
                <MDBNavItem >
                    <NavigationItem label={"Ocene"} route={routes.showGradesToStudent} />
                </MDBNavItem>                 
                </MDBNavbarNav>
            </div>
        )
    }
}