import React, { Component } from 'react';
import { Label, Classes } from '@blueprintjs/core';
import { LOGIN, GET_USER_DATA } from "../../../server/relativeURLs";

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
                
                this.props.state.onLoginHandler(true);
                this.props.state.setFullName(response.firstName, response.lastName);
                
                console.log(response);
                this.props.history.push("/dashboard");
            }
        }
    };

    render() {
        return (
            <div>
                <Label className="bp3-inline .modifier">
                    Korisničko ime:
                <input name="username" type="text" className={Classes.INPUT} onChange={this.handleInputChange} />
                    {this.state.displayErrorForUserName && <span>Polje je obavezno!</span>}
                </Label>
                <Label className="bp3-inline .modifier">
                    Lozinka:
                <input name="password" type="password" className={Classes.INPUT} onChange={this.handleInputChange} />
                    {this.state.displayErrorForPassword && <span>Polje je obavezno!</span>}
                </Label>
                <button className="bp3-button" onClick={this.login}>Prijavi se</button>
            </div>
        )
    }
}