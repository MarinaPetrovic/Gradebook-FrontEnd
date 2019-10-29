import React, { Component } from 'react';
import { Classes } from '@blueprintjs/core';
import { MDBRow, MDBCol } from "mdbreact";
import { LOGIN, GET_USER_DATA, GET_ADMIN_DATA, GET_TEACHER_DATA, GET_STUDENT_DATA, GET_PARENT_DATA } from "../../../server/relativeURLs";
import { ROLE } from "../../../enums";


const urls = {
    [ROLE.admin]: GET_ADMIN_DATA,
    [ROLE.parent]: GET_PARENT_DATA,
    [ROLE.teacher]: GET_TEACHER_DATA,
    [ROLE.student]: GET_STUDENT_DATA
};

const userIdProps = {
    [ROLE.admin]: "adminId",
    [ROLE.parent]: "parenId",
    [ROLE.teacher]: "teacherId",
    [ROLE.student]: "studentId"
};

export class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            displayErrorForUserName: false,
            displayErrorForPassword: false,
        };
    }

    handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;

        this.setState({
            [name]: target.value
        });
    }

    changeErrorState = (property, value) => {
        this.setState({
            [property]: value
        });
    };

    getData = async ({ userId, role, token }) => {

        let promise = await fetch(`${urls[role]}${userId}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        });

        let response = await promise.json();
        const user = response.filter((item) => item[userIdProps[role]] === userId);
        this.props.state.setUserData(user[0]);
    }

    login = async () => {
        let isUsernameValid = true, isPassworValid = true;

        this.changeErrorState("displayErrorForUserName", false);
        this.changeErrorState("displayErrorForPassword", false);

        if (this.state.username === "") {
            isUsernameValid = false;
            this.changeErrorState("displayErrorForUserName", true);
        }

        if (this.state.password === "") {
            isPassworValid = false;
            this.changeErrorState("displayErrorForPassword", true);
        }

        if (isUsernameValid && isPassworValid) {
            let promise = await fetch(LOGIN, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `grant_type=password&username=${this.state.username}&password=${this.state.password}`
            });

            let response = await promise.json();

            let token = response.access_token;

            if (token) {
                localStorage.setItem("token", token);

                let promise = await fetch(GET_USER_DATA, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + token,
                    },
                });

                let response = await promise.json();
                const userId = response.userId;
                this.props.state.onLoginHandler(true);
                this.props.state.setFullName(response.firstName, response.lastName);

                await this.getData({ role: response.role, userId, token });

                this.props.history.push("/dashboard");
            }
        }
    };

    render() {
        return (
            <div>
                <MDBRow>
                    <MDBCol md={3}>Korisničko ime:</MDBCol>
                    <MDBCol md={3}><input name="username" type="text" className={Classes.INPUT} onChange={this.handleInputChange} />
                        {this.state.displayErrorForUserName && <span>Polje je obavezno!</span>}</MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md={3}>Lozinka:</MDBCol>
                    <MDBCol md={3}><input name="password" type="password" className={Classes.INPUT} onChange={this.handleInputChange} />
                        {this.state.displayErrorForPassword && <span>Polje je obavezno!</span>}</MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md={3}></MDBCol>
                    <MDBCol md={3}><button className="bp3-button" onClick={this.login}>Prijavi se</button></MDBCol>
                </MDBRow>
            </div>
        )
    }
}