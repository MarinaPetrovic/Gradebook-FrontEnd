import React, { Component } from 'react';
import { NavigationItemComponent as NavigationItem } from "../NavigationItem/NavigationItemComponent";

export class NavigationBarComponent extends Component {
    constructor(props) {
        super(props);   
        console.log(props);    
    }

    render() {
        return (
            <div>
                <nav className="bp3-navbar .modifier">
                    <div className="bp3-navbar-group bp3-align-left">
                        <div className="bp3-navbar-heading">Elektronski dnevnik</div>
                        {/*<input class="bp3-input" placeholder="Search files..." type="text" />*/}
                    </div>
                    <div className="bp3-navbar-group bp3-align-right"> 
                        <NavigationItem label={this.props.state.fullName} route={"login"} callback={() => this.props.state.goToProfile()} /> 
                        <NavigationItem label={"Home"} route={"login"} />
                        <span className="bp3-navbar-divider"></span>                    
                        {this.props.state.isLoggedIn && <NavigationItem label={"Logout"} route={"login"} />}
                    </div>
                </nav>
            </div>
        )
    }
    
}