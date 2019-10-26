import React, { Component } from 'react';
import './App.css';
import { NavigationBarComponent } from './components/NavigationBar/NavigationBarComponent';
import { LoginForm } from './components/Forms/LogIn/Form';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { routes } from "./routes";
import { ProfileForm } from "./components/Forms/Profile/Form";

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
      goToProfile: () => {
        this.props.history.push("/profile");
      },
    };
  }

  render() {
    return (
      <Router>
        <NavigationBarComponent state={this.state}/>
        <div id="content">
          <Route exact path={routes.login} render={props => (<LoginForm {...props} state={this.state} />)} />
          <Route exact path={routes.dashboard} render={props => (<LoginForm {...props} state={this.state} />)} />          
          <Route exact path={routes.profile} render={props => (<ProfileForm {...props} state={this.state} />)} />
        </div>
      </Router >
    );
  }
}
