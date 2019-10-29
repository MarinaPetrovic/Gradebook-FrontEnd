import React, { Component } from 'react';
import { MDBRow, MDBCol } from "mdbreact";
import { Classes, Menu, MenuItem, Popover, Position } from '@blueprintjs/core';
import { ROLE } from "../../../enums";
import { CREATE_ADMIN_USER, CREATE_PARENT_USER, CREATE_TEACHER_USER, CREATE_STUDENT_USER } from "../../../server/relativeURLs";

export class CreateNewForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            role: "",
            firstName: "",
            lastName: "",
            userName: "",
            password: "",
            confirmPassword: "",
            gender: "",
            email: "",
            phone: "",
            title: "",
            degree: "",
            placeOfBirth: "",
            dateOfBirth: "",
            classRoom: "",
            serverError: "",
        };
    }

    handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;

        this.setState({
            [name]: target.value
        });
    }

    onClickHandler = async () => {
        this.setState({
            serverError: "",
        });

        const urls = {
            [ROLE.admin]: CREATE_ADMIN_USER,
            [ROLE.teacher]: CREATE_TEACHER_USER,
            [ROLE.student]: CREATE_STUDENT_USER,
            [ROLE.parent]: CREATE_PARENT_USER,
        };

        const url = urls[this.state.role];

        let body = { userModel: {} };

        for (let prop in this.state) {
            if(this.state[prop]) {
                body.userModel[prop] = this.state[prop];
            }
        }

        let result = await fetch(url, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem("token"),
            },
            body: JSON.stringify(body),
        });


        if (result.code !== 200) {
            this.setState({
                serverError: result.statusText,
            });
        }

        console.log(result);
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
                    <MDBCol md={3}>Ponovi lozinku:</MDBCol>
                    <MDBCol md={3}><input type="password" name={"confirmPassword"} className={Classes.INPUT} onChange={this.handleInputChange} /></MDBCol>
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
                    <MDBCol md={3}>
                        {this.state.serverError &&
                            <MDBRow>
                                {this.state.serverError}
                            </MDBRow>
                        }
                    </MDBCol>
                    <MDBCol md={3}><button className="bp3-button" onClick={this.onClickHandler}>Sačuvaj korisnika</button></MDBCol>
                </MDBRow>
            </div>
        );
    }
}