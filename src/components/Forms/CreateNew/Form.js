import React, { Component } from 'react';
import { MDBRow, MDBCol } from "mdbreact";
import { Classes, Menu, MenuItem, Popover, Position } from '@blueprintjs/core';
import { ROLE } from "../../../enums";


export class CreateNewForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            role: "",
            firstName: "",
            lastName: "",
            userName: "",
            password: "",
            gender: "",
            email: "",
            phone: "",
            title: "",
            degree: "",
            placeOfBirth: "",
            dateOfBirth: "",
            classRoom: "",
        };
    }

    handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;

        this.setState({
            [name]: target.value
        });
    }

    onClickHandler = () => {

    };

    changeRoleHandler = (event) => {
        const Roles = {
            "Nastavnik": ROLE.teacher,
            "Admin": ROLE.admin,
            "Učenik": ROLE.student,
            "Roditelj": ROLE.parent, 
        };

        this.setState({
            role: Roles[event.target.innerText],
        });
    };

    render() {
        return (
            <div>
                <MDBRow>
                    <MDBCol md={3}>Korisničko ime:</MDBCol>
                    <MDBCol md={3}><input type="text" name={"userName"} className={Classes.INPUT} onChange={this.handleInputChange} /></MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md={3}>Lozinka:</MDBCol>
                    <MDBCol md={3}><input type="password" name={"password"} className={Classes.INPUT} onChange={this.handleInputChange} /></MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md={3}>Tip korisnika:</MDBCol>
                    <MDBCol md={3}>
                        <Popover content={
                            <Menu>
                                <MenuItem onClick={this.changeRoleHandler} text="Admin" />
                                <MenuItem onClick={this.changeRoleHandler} text="Nastavnik" />
                                <MenuItem onClick={this.changeRoleHandler} text="Učenik" />
                                <MenuItem onClick={this.changeRoleHandler} text="Roditelj" />
                            </Menu>} position={Position.BOTTOM}>
                            <input type="text" className={Classes.INPUT} placeholder="Izaberi tip korisnika" readOnly value={this.state.role} />
                        </Popover>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md={3}>Ime:</MDBCol>
                    <MDBCol md={3}><input type="text" name={"firstName"} className={Classes.INPUT} onChange={this.handleInputChange} /></MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md={3}>Prezime:</MDBCol>
                    <MDBCol md={3}><input type="text" name={"lastName"} className={Classes.INPUT} onChange={this.handleInputChange} /></MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md={3}>Pol:</MDBCol>
                    <MDBCol md={3}><input type="text" name={"gender"} className={Classes.INPUT} onChange={this.handleInputChange} /></MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md={3}>Email:</MDBCol>
                    <MDBCol md={3}><input type="text" name={"email"} className={Classes.INPUT} onChange={this.handleInputChange} /></MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md={3}>Telefon:</MDBCol>
                    <MDBCol md={3}><input type="text" name={"phone"} className={Classes.INPUT} onChange={this.handleInputChange} /></MDBCol>
                </MDBRow>
                {this.state.role === ROLE.teacher && (
                    <div>
                        <MDBRow>
                            <MDBCol md={3}>Titula:</MDBCol>
                            <MDBCol md={3}><input type="text" name={"title"} className={Classes.INPUT} onChange={this.handleInputChange} /></MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol md={3}>Obrazovanje:</MDBCol>
                            <MDBCol md={3}><input type="text" name={"degree"} className={Classes.INPUT} onChange={this.handleInputChange} /></MDBCol>
                        </MDBRow>
                    </div>)}
                {this.state.role === ROLE.student && (
                    <div>
                        <MDBRow>
                            <MDBCol md={3}>Mesto rođenja:</MDBCol>
                            <MDBCol md={3}><input type="text" name={"placeOfBirth"} className={Classes.INPUT} onChange={this.handleInputChange} /></MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol md={3}>Datum rođenja:</MDBCol>
                            <MDBCol md={3}><input type="text" name={"dateOfBirth"} className={Classes.INPUT} onChange={this.handleInputChange} /></MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol md={3}>Odeljenje:</MDBCol>
                            <MDBCol md={3}><input type="text" name={"classRoom"} className={Classes.INPUT} onChange={this.handleInputChange} /></MDBCol>
                        </MDBRow>
                    </div>)}
                <MDBRow>
                    <MDBCol md={3}></MDBCol>
                    <MDBCol md={3}><button className="bp3-button" onClick={this.onClickHandler}>Sačuvaj korisnika</button></MDBCol>
                </MDBRow>
            </div>
        );
    }
}