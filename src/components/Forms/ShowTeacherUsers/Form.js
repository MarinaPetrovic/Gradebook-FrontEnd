import React, { Component } from "react";
import TableWithUsers from "../../TableWithUsers";
import { GET_ALL_TEACHERS, UPDATE_TEACHER_USER } from "../../../server/relativeURLs";
import { ROLE } from "../../../enums";

export class ShowTeacherUsersForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isFetchInProgress: true,
        };
    }

    rows = {};

    fetchData = async () => {
        this.props.state.shouldShowSpinner(true);
        let promise = await fetch(GET_ALL_TEACHERS, {
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
        TITLE: "Radno mesto",
        DEGREE: "Obrazovanje",
    };

    columns = [this.ColumnEnum.ID, this.ColumnEnum.FIRSTNAME, this.ColumnEnum.LASTNAME, this.ColumnEnum.USERNAME, this.ColumnEnum.GENDER, this.ColumnEnum.EMAIL, this.ColumnEnum.PHONE, this.ColumnEnum.DEGREE];

    mapper = {
        [this.ColumnEnum.ID]: "teacherId",
        [this.ColumnEnum.FIRSTNAME]: "firstName",
        [this.ColumnEnum.LASTNAME]: "lastName",
        [this.ColumnEnum.USERNAME]: "userName",
        [this.ColumnEnum.GENDER]: "gender",
        [this.ColumnEnum.EMAIL]: "email",
        [this.ColumnEnum.PHONE]: "phone",
        [this.ColumnEnum.TITLE]: "title",
        [this.ColumnEnum.DEGREE]: "degree",
    };

    modelMapper = (row) => {
        return {
            id: row.teacherId,
            firstName: row.firstName,
            lastName: row.lastName,
            userName: row.userName,
            gender: row.gender,
            email: row.email,
            phoneNumber: row.phone,
            title: row.title,
            degree: row.degree
        }
    };
    
    onSaveCallback = async (row) => {
        let data = this.modelMapper(row);
        await fetch(UPDATE_TEACHER_USER + row.teacherId, {
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
                    userType={ROLE.teacher}
                ></TableWithUsers>
            </div>) : null;

        return component;
    }
}