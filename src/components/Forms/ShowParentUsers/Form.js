import React, { Component } from "react";
import TableWithUsers from "../../TableWithUsers";
import { GET_ALL_PARENTS, UPDATE_PARENT_USER, GET_PARENT_USER_DATA } from "../../../server/relativeURLs";
import { ROLE } from "../../../enums";

export class ShowParentUsersForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetchInProgress: true,
            rows: [],
        };
        
        this.fetchData();
    }

    fetchData = async () => { 
        this.props.state.shouldShowSpinner(true);
        let rows = [];

        //Vraca nepotpunu listu roditelja
        fetch(GET_ALL_PARENTS, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem("token"),
            },
        })
            .then(response => response.json())
            .then((response) => {
                //Za svakog roditelja pozvati fetch ponovo da bi se dobili potpuni podaci
                response.forEach((parent) => {
                    fetch(GET_PARENT_USER_DATA + parent.parentId, {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            Authorization: 'Bearer ' + localStorage.getItem("token"),
                        },
                    })
                        .then(response => response.json())
                        .then((response) => {
                            rows.push(response);
                            this.setState({
                                rows: rows,
                            });
                        }).then(() => {
                            setTimeout(() => {
                                this.props.state.shouldShowSpinner(false);
                                this.setState({
                                    isFetchInProgress: false,
                                });
                            }, 2000)

                        });
                });
            })
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

    columns = [this.ColumnEnum.ID, this.ColumnEnum.FIRSTNAME, this.ColumnEnum.LASTNAME, this.ColumnEnum.USERNAME, this.ColumnEnum.GENDER, this.ColumnEnum.EMAIL, this.ColumnEnum.PHONE];

    mapper = {
        [this.ColumnEnum.ID]: "parentId",
        [this.ColumnEnum.FIRSTNAME]: "firstName",
        [this.ColumnEnum.LASTNAME]: "lastName",
        [this.ColumnEnum.USERNAME]: "userName",
        [this.ColumnEnum.GENDER]: "gender",
        [this.ColumnEnum.EMAIL]: "email",
        [this.ColumnEnum.PHONE]: "phoneNumber",
    };

    modelMapper = (row) => {
        return {
            id: row.parentId,
            firstName: row.firstName,
            lastName: row.lastName,
            userName: row.userName,
            gender: row.gender,
            email: row.email,
            phoneNumber: row.phoneNumber
        }
    };

    onSaveCallback = async (row) => {
        let data = this.modelMapper(row);
        await fetch(UPDATE_PARENT_USER + row.parentId, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem("token"),
            },
            body: JSON.stringify(data),
        });
    };

    onDeleteCallback = (id) => {
        this.setState({
            isFetchInProgress: true,
        });
        
        this.fetchData();
     };

    render() {
        const component = !this.state.isFetchInProgress ?
            (<div className="table-container text-center border border-light p-5" style={{ backgroundColor: "#EBEBEB", color: "#000000" }}>
                <TableWithUsers id="table_with_users"
                    columns={this.columns}
                    mapper={this.mapper}
                    rows={this.state.rows}
                    columnEnum={this.ColumnEnum}
                    onSaveCallback={this.onSaveCallback}
                    onDeleteCallback={this.onDeleteCallback}
                    userType={ROLE.parent}
                ></TableWithUsers>
            </div>) : null;

        return component;
    }
}