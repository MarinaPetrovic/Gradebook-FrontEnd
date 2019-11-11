import React, { Component } from "react";
import TableWithUsers from "../../TableWithUsers";
import { GET_ALL_STUDENTS, UPDATE_STUDENT_USER } from "../../../server/relativeURLs";
import { ROLE } from "../../../enums";

export class ShowStudentUsersForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isFetchInProgress: true,
        };
    }

    rows = {};

    fetchData = async () => {        
        this.props.state.shouldShowSpinner(true);
        let promise = await fetch(GET_ALL_STUDENTS, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem("token"),
            },
        });

        this.rows = await promise.json();

        this.props.state.shouldShowSpinner(false);
        
        this.setState({
            isFetchInProgress: false,
        });
    };

    ColumnEnum = {
        ID: "ID",
        FIRSTNAME: "Ime",
        LASTNAME: "Prezime",
        USERNAME: "Korisničko ime",
        GENDER: "Pol",
        EMAIL: "Imejl",
        PHONE: "Broj telefona",
        PLACEOFBIRTH: "Mesto rođenja",
        DATEOFBIRTH: "Datum rođenja",
        CLASSROOM: "Odeljenje",
    };

    columns = [this.ColumnEnum.ID, this.ColumnEnum.FIRSTNAME, this.ColumnEnum.LASTNAME, this.ColumnEnum.USERNAME, this.ColumnEnum.GENDER, this.ColumnEnum.EMAIL, this.ColumnEnum.PHONE, this.ColumnEnum.PLACEOFBIRTH, this.ColumnEnum.DATEOFBIRTH, this.ColumnEnum.CLASSROOM];

    mapper = {
        [this.ColumnEnum.ID]: "studentId",
        [this.ColumnEnum.FIRSTNAME]: "firstName",
        [this.ColumnEnum.LASTNAME]: "lastName",
        [this.ColumnEnum.USERNAME]: "userName",
        [this.ColumnEnum.GENDER]: "gender",
        [this.ColumnEnum.EMAIL]: "email",
        [this.ColumnEnum.PHONE]: "phone",
        [this.ColumnEnum.PLACEOFBIRTH]: "placeOfBirth",
        [this.ColumnEnum.DATEOFBIRTH]: "dateOfBirth",
        [this.ColumnEnum.CLASSROOM]: "classRoom",
    };

    modelMapper = (row) => {
        return {
            id: row.studentId,
            firstName: row.firstName,
            lastName: row.lastName,
            userName: row.userName,
            gender: row.gender,
            email: row.email,
            phoneNumber: row.phone,
            placeOfBirth: row.placeOfBirth,
            dateOfBirth: row.dateOfBirth
        }
    };
    
    onSaveCallback = async (row) => {
        let data = this.modelMapper(row);
         await fetch(UPDATE_STUDENT_USER + row.studentId, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem("token"),
            },
            body: JSON.stringify(data),
        });
     };

    onDeleteCallback = (id) => { };

    componentDidMount() {
        this.fetchData();
    }

    render() {
        const component = !this.state.isFetchInProgress ?
            (<div className="text-center border border-light p-5" style={{ backgroundColor: "#EBEBEB", color: "#000000" }}>
                <TableWithUsers
                    columns={this.columns}
                    mapper={this.mapper}
                    rows={this.rows}
                    columnEnum={this.ColumnEnum}
                    onSaveCallback={this.onSaveCallback}
                    onDeleteCallback={this.onDeleteCallback}
                    userType={ROLE.student}
                ></TableWithUsers>
            </div>) : null;

        return component;
    }
}