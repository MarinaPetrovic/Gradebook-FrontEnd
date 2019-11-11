import React, { Component } from 'react';
import { MDBRow, MDBCol } from "mdbreact";
import { Classes } from '@blueprintjs/core';
import { ROLE } from "../../../enums";
import { withRouter } from 'react-router-dom';
import { CREATE_ADMIN_USER, CREATE_PARENT_USER, CREATE_TEACHER_USER, CREATE_STUDENT_USER } from "../../../server/relativeURLs";

class CreateNewForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Role: this.props.location.state.role || "",
            FirstName: "",
            LastName: "",
            UserName: "",
            Password: "",
            ConfirmPassword: "",
            Gender: "",
            Email: "",
            Phone: "",
            Title: "",
            Degree: "",
            PlaceOfBirth: "",
            DateOfBirth: "",
            ClassRoom: "",
            serverError: "",
        };

        this.goBack = this.goBack.bind(this);
    }

    goBack = () => {
        this.props.history.goBack();
    };

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

        const url = urls[this.state.Role];

        let body = {};

        for (let prop in this.state) {
            if (this.state[prop]) {
                body[prop] = this.state[prop];
            }
        }

        fetch(url, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem("token"),
            },
            body: JSON.stringify(body),
        }).then((response) => response.json()).then((response) => {
            if (response.code !== 200) {
                this.setState({
                    serverError: response.statusText,
                });
            }

            this.goBack();
        });
    };

    render() {
        return (
            <div>
                <MDBRow>
                    <MDBCol md={3}>Korisničko ime:</MDBCol>
                    <MDBCol md={3}><input type="text" name={"UserName"} className={Classes.INPUT} onChange={this.handleInputChange} /></MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md={3}>Lozinka:</MDBCol>
                    <MDBCol md={3}><input type="password" name={"Password"} className={Classes.INPUT} onChange={this.handleInputChange} /></MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md={3}>Ponovi lozinku:</MDBCol>
                    <MDBCol md={3}><input type="password" name={"ConfirmPassword"} className={Classes.INPUT} onChange={this.handleInputChange} /></MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md={3}>Tip korisnika:</MDBCol>
                    <MDBCol md={3}>
                        <input type="text" className={Classes.INPUT} readOnly={true} value={this.state.Role} />
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md={3}>Ime:</MDBCol>
                    <MDBCol md={3}><input type="text" name={"FirstName"} className={Classes.INPUT} onChange={this.handleInputChange} /></MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md={3}>Prezime:</MDBCol>
                    <MDBCol md={3}><input type="text" name={"LastName"} className={Classes.INPUT} onChange={this.handleInputChange} /></MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md={3}>Pol:</MDBCol>
                    <MDBCol md={3}><input type="text" name={"Gender"} className={Classes.INPUT} onChange={this.handleInputChange} /></MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md={3}>Email:</MDBCol>
                    <MDBCol md={3}><input type="text" name={"Email"} className={Classes.INPUT} onChange={this.handleInputChange} /></MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md={3}>Telefon:</MDBCol>
                    <MDBCol md={3}><input type="text" name={"Phone"} className={Classes.INPUT} onChange={this.handleInputChange} /></MDBCol>
                </MDBRow>
                {this.state.role === ROLE.teacher && (
                    <div>
                        <MDBRow>
                            <MDBCol md={3}>Titula:</MDBCol>
                            <MDBCol md={3}><input type="text" name={"Title"} className={Classes.INPUT} onChange={this.handleInputChange} /></MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol md={3}>Obrazovanje:</MDBCol>
                            <MDBCol md={3}><input type="text" name={"Degree"} className={Classes.INPUT} onChange={this.handleInputChange} /></MDBCol>
                        </MDBRow>
                    </div>)}
                {this.state.role === ROLE.student && (
                    <div>
                        <MDBRow>
                            <MDBCol md={3}>Mesto rođenja:</MDBCol>
                            <MDBCol md={3}><input type="text" name={"PlaceOfBirth"} className={Classes.INPUT} onChange={this.handleInputChange} /></MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol md={3}>Datum rođenja:</MDBCol>
                            <MDBCol md={3}><input type="text" name={"DateOfBirth"} className={Classes.INPUT} onChange={this.handleInputChange} /></MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol md={3}>Odeljenje:</MDBCol>
                            <MDBCol md={3}><input type="text" name={"ClassRoom"} className={Classes.INPUT} onChange={this.handleInputChange} /></MDBCol>
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

export default withRouter(CreateNewForm);