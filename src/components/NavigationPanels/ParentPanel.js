import React, { Component } from "react";
import { MDBNavItem, MDBNavbarNav } from "mdbreact";
import { NavigationItemComponent as NavigationItem } from "../NavigationItem/NavigationItemComponent";
import { routes } from "../../routes";

export class ParentPanel extends Component {    
    render() {
        return (
            <div>
                <MDBNavbarNav >               
                <MDBNavItem >
                    <NavigationItem label={"Učenici"} route={routes.showStudentsForParent} />
                </MDBNavItem>                 
                </MDBNavbarNav>
            </div>
        )
    }
}