import React, { Component } from 'react';
import { MDBRow, MDBCol } from "mdbreact";
import { Classes } from '@blueprintjs/core';

export class ProfileForm extends Component {
    constructor(props) {
        super(props);
        
        this.state = { 
            isTeacher: false,
            isStudent: true,            
        };
    }

    render(){
        return  (
        <div>
            <MDBRow>
                <MDBCol md={3}>Korisničko ime:</MDBCol>
                <MDBCol md={3}><input type="text" className={Classes.INPUT} readOnly value={this.props.state.userName}/></MDBCol>
            </MDBRow>
            <MDBRow>
                <MDBCol md={3}>Ime:</MDBCol>
                <MDBCol md={3}><input type="text" className={Classes.INPUT} readOnly value={this.props.state.firstName}/></MDBCol>
            </MDBRow>
            <MDBRow>
                <MDBCol md={3}>Prezime:</MDBCol>
                <MDBCol md={3}><input type="text" className={Classes.INPUT} readOnly value={this.props.state.lastName}/></MDBCol>
            </MDBRow>
            <MDBRow>
                <MDBCol md={3}>Pol:</MDBCol>
                <MDBCol md={3}><input type="text" className={Classes.INPUT} readOnly value={this.props.state.gender}/></MDBCol>
            </MDBRow>
            <MDBRow>
                <MDBCol md={3}>Email:</MDBCol>
                <MDBCol md={3}><input type="text" className={Classes.INPUT} readOnly value={this.props.state.email}/></MDBCol>
            </MDBRow>
            <MDBRow>
                <MDBCol md={3}>Telefon:</MDBCol>
                <MDBCol md={3}><input type="text" className={Classes.INPUT} readOnly value={this.props.state.phone}/></MDBCol>
            </MDBRow>
            { this.state.isTeacher && (
            <div>
            <MDBRow>
                <MDBCol md={3}>Titula:</MDBCol>
                <MDBCol md={3}><input type="text" className={Classes.INPUT} readOnly value={this.props.state.title}/></MDBCol>
            </MDBRow>
            <MDBRow>
                <MDBCol md={3}>Obrazovanje:</MDBCol>
                <MDBCol md={3}><input type="text" className={Classes.INPUT} readOnly value={this.props.state.degree}/></MDBCol>
            </MDBRow>
            </div>)}
            { this.state.isStudent && (
            <div>
            <MDBRow>
                <MDBCol md={3}>Mesto rođenja:</MDBCol>
                <MDBCol md={3}><input type="text" className={Classes.INPUT} readOnly value={this.props.state.placeOfBirth}/></MDBCol>
            </MDBRow>
            <MDBRow>
                <MDBCol md={3}>Datum rođenja:</MDBCol>
                <MDBCol md={3}><input type="text" className={Classes.INPUT} readOnly value={this.props.state.dateOfBirth}/></MDBCol>
            </MDBRow>
            <MDBRow>
                <MDBCol md={3}>Odeljenje:</MDBCol>
                <MDBCol md={3}><input type="text" className={Classes.INPUT} readOnly value={this.props.state.classRoom}/></MDBCol>
            </MDBRow>
            </div>)}
        </div>
        );
    }
}