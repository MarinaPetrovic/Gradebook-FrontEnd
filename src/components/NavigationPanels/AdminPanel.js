import React, { Component } from "react";
import { MDBNavItem, MDBNavbarNav } from "mdbreact";
import { NavigationItemComponent as NavigationItem } from "../NavigationItem/NavigationItemComponent";
import { routes } from "../../routes";

export class AdminPanel extends Component {    
    render() {
        return (
            <div>
                <MDBNavbarNav >               
                <MDBNavItem >
                    <NavigationItem label={"Administartori"} route={routes.showAdmins} />
                </MDBNavItem>
                 <MDBNavItem>
                    <NavigationItem label={"Nastavnici"} route={routes.showTeachers} />
                </MDBNavItem>
                <MDBNavItem>
                    <NavigationItem label={"Učenici"} route={routes.showStudents} />
                </MDBNavItem>
                <MDBNavItem>
                    <NavigationItem label={"Roditelji"} route={routes.showParents} />
                </MDBNavItem>
                <MDBNavItem>
                    <NavigationItem label={"Predavanja"} route={routes.showTeachings} />
                </MDBNavItem>
                <MDBNavItem>
                    <NavigationItem label={"Predmeti"} route={routes.showSubjects} />
                </MDBNavItem>
                <MDBNavItem>
                    <NavigationItem label={"Razredi"} route={routes.showClassrooms} />
                </MDBNavItem>
                </MDBNavbarNav>
            </div>
        )
    }
}
