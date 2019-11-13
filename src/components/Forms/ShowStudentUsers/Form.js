import React, { Component } from "react";
import TableWithUsers from "../../TableWithUsers";
import { GET_ALL_STUDENTS, UPDATE_STUDENT_USER, ENROLL_STUDENT, GET_ALL_CLASSROOMS } from "../../../server/relativeURLs";
import { ROLE } from "../../../enums";

export class ShowStudentUsersForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isFetchInProgress: true,
            selectedStudentId: "",
            selectedClassroomId: "",
        };
        
        this.fetchData();
    }

    rows = {};
    classrooms = [];
    fetchData = async () => {
        this.props.state.shouldShowSpinner(true);
        fetch(GET_ALL_STUDENTS, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem("token"),
            },
        }).then((response) => response.json()).then((response) => {

            this.rows = response;

            fetch(GET_ALL_CLASSROOMS, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem("token"),
                },
            }).then((response) => response.json()).then((response) => {
                this.classrooms = response;
                this.props.state.shouldShowSpinner(false);
                this.setState({
                    isFetchInProgress: false,
                });
            });

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

    onDeleteCallback = (id) => {
        this.setState({
            isFetchInProgress: true,
        });

        this.fetchData();
    };

    onChangeDropdown = (event) => {
        const prop = event.target.name;

        this.setState({
            [prop]: event.target.value
        });
    };

    enrollStudent = () => {
        fetch(ENROLL_STUDENT(this.state.selectedClassroomId), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem("token"),
            },
            body: JSON.stringify({
                studentId: this.state.selectedStudentId,
                classRoomId: this.state.selectedClassroomId
            })
        }).then((response) => response.json()).then(() => {
            this.props.state.shouldShowSpinner(true);
            this.setState({
                isFetchInProgress: true,
            });
            this.fetchData();
        });
    };



    render() {
        const component = !this.state.isFetchInProgress ?
            (<div className="student-container">
                <div>
                    <h4>Dodaj učenika u odeljenje</h4>
                    <table style={{ "width": "100%" }}>
                        <tbody>
                            <tr>
                                <td>
                                    <div>
                                        <select className="browser-default custom-select" name="selectedStudentId" onChange={this.onChangeDropdown}>
                                            <option>Izaberi učenika</option>
                                            {this.rows.map((row, index) => {
                                                return <option key={index} value={row.studentId}>{row.firstName} {row.lastName}</option>
                                            })}
                                        </select>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <select className="browser-default custom-select" name="selectedClassroomId" onChange={this.onChangeDropdown}>
                                            <option>Izaberi odeljenje</option>
                                            {this.classrooms.map((classroom, index) => {
                                                return <option key={index} value={classroom.classRoomId}>{classroom.name}</option>
                                            })}
                                        </select>
                                    </div>
                                </td>
                                <td><button style={{ "width": "100%" }} className="bp3-button" onClick={this.enrollStudent}>Dodaj</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="table-container text-center border border-light p-5" style={{ backgroundColor: "#EBEBEB", color: "#000000" }}>
                    <TableWithUsers
                        columns={this.columns}
                        mapper={this.mapper}
                        rows={this.rows}
                        columnEnum={this.ColumnEnum}
                        onSaveCallback={this.onSaveCallback}
                        onDeleteCallback={this.onDeleteCallback}
                        userType={ROLE.student}
                    ></TableWithUsers>
                </div>
            </div>) : null;

        return component;
    }
}