import React, { Component } from 'react';
import './App.css';
import { NavigationBarComponent } from './components/NavigationBar/NavigationBarComponent';
import { LoginForm } from './components/Forms/LogIn/Form';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { routes } from "./routes";
import { ProfileForm } from "./components/Forms/Profile/Form";
import { MDBView, MDBMask, MDBContainer, MDBRow } from "mdbreact";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: !!localStorage.getItem("token"),
      fullName: "",
      setFullName: (firstName, lastName) => {
        this.setState({
          fullName: `${firstName} ${lastName}`
        });
      },
      onLoginHandler: (value) => {
        this.setState({
          isLoggedIn: value,
        });
      },
    };
  }

  render() {
    return (
      <div id="apppage">
        <Router>
          <NavigationBarComponent props={this.props} state={this.state} />
          <MDBView>
            <MDBMask className="d-flex justify-content-center align-items-center gradient">
              <MDBContainer>
                <MDBRow>
                  <Route exact path={routes.login} render={props => (<LoginForm {...props} state={this.state} />)} />
                  <Route exact path={routes.dashboard} render={props => (<LoginForm {...props} state={this.state} />)} />
                  <Route exact path={routes.profile} render={props => (<ProfileForm {...props} state={this.state} />)} />
                </MDBRow>
              </MDBContainer>
            </MDBMask>
          </MDBView>
        </Router >
      </div>
    );
  }
}
