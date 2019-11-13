import React, { Component } from "react";
import TableWithUsers from "../../TableWithUsers";
import { GET_ALL_ADMINS, UPDATE_ADMIN_USER } from "../../../server/relativeURLs";
import { ROLE } from "../../../enums";

export class ShowAdminUsersForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isFetchInProgress: true,
        };
        
        this.fetchData();
    }

    rows = [];

    fetchData = async () => {
        this.props.state.shouldShowSpinner(true);
        let promise = await fetch(GET_ALL_ADMINS, {
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
    };

    //Kolene koje ce da se prikazu
    columns = [this.ColumnEnum.ID, this.ColumnEnum.FIRSTNAME, this.ColumnEnum.LASTNAME, this.ColumnEnum.USERNAME, this.ColumnEnum.GENDER, this.ColumnEnum.EMAIL, this.ColumnEnum.PHONE];

    //Mapira kolonu na property iz reda
    mapper = {
        [this.ColumnEnum.ID]: "adminId",
        [this.ColumnEnum.FIRSTNAME]: "firstName",
        [this.ColumnEnum.LASTNAME]: "lastName",
        [this.ColumnEnum.USERNAME]: "userName",
        [this.ColumnEnum.GENDER]: "gender",
        [this.ColumnEnum.EMAIL]: "email",
        [this.ColumnEnum.PHONE]: "phone",
    };

    //Properties iz reda se mapiraju u model za update
    modelMapper = (row) => {
        return {
            id: row.adminId,
            firstName: row.firstName,
            lastName: row.lastName,
            userName: row.userName,
            gender: row.gender,
            email: row.email,
            phoneNumber: row.phone
        }
    };

    onSaveCallback = async (row) => {
        let data = this.modelMapper(row);
         await fetch(UPDATE_ADMIN_USER + row.adminId, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem("token"),
            },
            body: JSON.stringify(data),
        });
     };

    onDeleteCallback = () => { 
        this.setState({
            isFetchInProgress: true,
        });
        
        this.fetchData();
    };

    render() {
        const component = !this.state.isFetchInProgress ?
            (<div className="text-center border border-light p-5" style={{ backgroundColor: "#EBEBEB", color: "#000000" }}>
                <TableWithUsers id="table_with_users"
                    columns={this.columns}
                    mapper={this.mapper}
                    rows={this.rows}
                    columnEnum={this.ColumnEnum}
                    onSaveCallback={this.onSaveCallback}
                    onDeleteCallback={this.onDeleteCallback}
                    userType={ROLE.admin}
                ></TableWithUsers>
            </div>) : null;

        return component;
    }
}
