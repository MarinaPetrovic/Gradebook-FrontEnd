import React, { Component } from "react";
import { MDBNavItem } from "mdbreact";
import { NavigationItemComponent as NavigationItem } from "../NavigationItem/NavigationItemComponent";

export class AdminPanel extends Component {
    render() {
        return (
            <div>
                <MDBNavItem>
                    <NavigationItem label={"Kreiraj novog"} route={"create"} />
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
            </div>
        )
    }
}
