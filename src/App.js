import React, { Component } from 'react';
import './App.css';
import { NavigationBarComponent } from './components/NavigationBar/NavigationBarComponent';
import { LoginForm } from './components/Forms/LogIn/Form';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { routes } from "./routes";
import { ProfileForm } from "./components/Forms/Profile/Form";
import { MDBView, MDBMask, MDBContainer } from "mdbreact";
import { ROLE } from "./enums";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: !!localStorage.getItem("token"),
      isAdmin: false,
      isTeacher: false,
      isStudent: false,
      isParent: false,
      userID: 0,
      firstName: "",
      lastName: "",
      userName: "",
      gender: "",
      email: "",
      phone: "",
      title: "",
      degree: "",
      placeOfBirth: "",
      dateOfBirth: "",
      classRoom: "",
      fullName: "",
      setFullName: (firstName, lastName) => {
        this.setState({
          fullName: `${firstName} ${lastName}`
        });
      },
      onLoginHandler: (value) => {
        this.setState({
          isLoggedIn: value,
          // userID: 0, TODO
        });
      },
      logoutHandler: () => {
        this.setState({
          isLoggedIn: false,
        });
      },
      setLoggedInUser: (role) => {
        this.setState({
          isAdmin: false,
          isTeacher: false,
          isStudent: false,
          isParent: false,
        });
        
        if (role === ROLE.admin) {
          this.setState({
            isAdmin: true,
          })
        }

        if (role === ROLE.student) {
          this.setState({
            isAdmin: true,
          })
        }

        if (role === ROLE.teacher) {
          this.setState({
            isAdmin: true,
          })
        }

        if (role === ROLE.parent) {
          this.setState({
            isAdmin: true,
          })
        }
      },
      setUserData: (response) => {
        this.setState({
          firstName: response.firstName,
          lastName: response.lastName,
          userName: response.userName,
          gender: response.gender,
          email: response.email,
          phone: response.phone,
          title: response.title,
          degree: response.degree,
          placeOfBirth: response.placeOfBirth,
          dateOfBirth: response.dateOfBirth,
          classRoom: response.classRoom,
        });
      }
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
                <Route exact path={routes.login} render={props => (<LoginForm {...props} state={this.state} />)} />
                <Route exact path={routes.dashboard} render={props => (<LoginForm {...props} state={this.state} />)} />
                <Route exact path={routes.profile} render={props => (<ProfileForm {...props} state={this.state} />)} />

                <Route exact path={routes.create} render={props => (<ProfileForm {...props} state={this.state} />)} />

              </MDBContainer>
            </MDBMask>
          </MDBView>
        </Router >
      </div>
    );
  }
}
