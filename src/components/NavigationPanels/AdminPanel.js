import React, { Component } from "react";
import { MDBNavItem, MDBNavbarNav } from "mdbreact";
import { NavigationItemComponent as NavigationItem } from "../NavigationItem/NavigationItemComponent";

export class AdminPanel extends Component {
    
    render() {
        return (
            <div>
                <MDBNavbarNav >
                <MDBNavItem>
                    <NavigationItem label={"Kreiraj novog"} route={"create"} />
                </MDBNavItem>
                <MDBNavItem >
                    <NavigationItem label={"Admini"} route={"showAdmins"} />
                </MDBNavItem>
                {/* <MDBNavItem>
                    <NavigationItem label={"Nastavnici"} route={"teachers"} />}
                </MDBNavItem>
                <MDBNavItem>
                    <NavigationItem label={"Učenici"} route={"students"} />}
                </MDBNavItem>
                <MDBNavItem>
                    <NavigationItem label={"Roditelji"} route={"parents"} />}
                </MDBNavItem> */}
                </MDBNavbarNav>
            </div>
        )
    }
}
