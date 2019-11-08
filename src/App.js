import React, { Component, Fragment } from 'react';
import './App.css';
import { NavigationBarComponent } from './components/NavigationBar/NavigationBarComponent';
import { LoginForm } from './components/Forms/LogIn/Form';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { routes } from "./routes";
import { ProfileForm } from "./components/Forms/Profile/Form";
import { MDBView, MDBMask, MDBContainer } from "mdbreact";
import { ROLE } from "./enums";
import CreateNewForm from './components/Forms/CreateNew/Form';
import { ShowAdminUsersForm } from './components/Forms/ShowAdminUsers/Form';
import { ShowTeacherUsersForm } from './components/Forms/ShowTeacherUsers/Form';
import { ShowStudentUsersForm } from './components/Forms/ShowStudentUsers/Form';
import { ShowParentUsersForm } from './components/Forms/ShowParentUsers/Form';
import { ShowStudentGradesForm } from "./components/Forms/ShowStudentGradesForm";


export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: !!localStorage.getItem("token"),
      isAdmin: false,
      isTeacher: false,
      isStudent: false,
      isParent: false,
      adminID: 0,
      studentID: 0,
      parentID: 0,
      teacherId: 0,
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
            isStudent: true,
          })
        }

        if (role === ROLE.teacher) {
          this.setState({
            isTeacher: true,
          })
        }

        if (role === ROLE.parent) {
          this.setState({
            isParent: true,
          })
        }
      },

      setUserData: (response) => {
        this.setState({
          adminID: response.adminID,
          studentID: response.studentID,
          parentID: response.parentID,
          teacherID: response.teacherID,
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
                <Fragment>
                  <Route exact path={routes.login} render={props => (<LoginForm {...props} state={this.state} />)} />
                  <Route exact path={routes.dashboard} render={props => (<LoginForm {...props} state={this.state} />)} />
                  <Route exact path={routes.profile} render={props => (<ProfileForm {...props} state={this.state} />)} />
                  <Route exact path={routes.showAdmins} render={props => (<ShowAdminUsersForm {...props} state={this.state} />)} />
                  <Route exact path={routes.create} render={props => (<CreateNewForm {...props} state={this.state} />)} />
                  <Route exact path={routes.showTeachers} render={props => (<ShowTeacherUsersForm {...props} state={this.state} />)} />
                  <Route exact path={routes.showStudents} render={props => (<ShowStudentUsersForm {...props} state={this.state} />)} />
                  <Route exact path={routes.showParents} render={props => (<ShowParentUsersForm {...props} state={this.state} />)} />
                  <Route exact path={routes.showGrades} render={props => (<ShowStudentGradesForm {...props} state={this.state} />)} />
                </Fragment>
              </MDBContainer>
            </MDBMask>
          </MDBView>
        </Router >
      </div>
    );
  }
}
