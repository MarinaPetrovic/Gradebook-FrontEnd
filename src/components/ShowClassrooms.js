import React, { Component } from "react";
import { GET_ALL_CLASSROOMS, CREATE_NEW_CLASSROOM } from "../server/relativeURLs";

export class ShowClassrooms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetchInProgress: true,
            rows: [],
            classroomName: "",
            schoolGrade: "",
        }
        this.fetchData();
    }

    fetchData = async () => {
        this.props.state.shouldShowSpinner(true);
        let promise = await fetch(GET_ALL_CLASSROOMS, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

                Authorization: 'Bearer ' + localStorage.getItem("token"),
            },
        });

        let rows = await promise.json();
        this.props.state.shouldShowSpinner(false);
        this.setState({
            isFetchInProgress: false,
            rows: rows,
        });
    };

    ColumnEnum = {
        ID: "classRoomId",
        CLASS: "name",
        GRADE: "schoolGrade",
        NUMBER_OF_STUDENTS: "students",
    };

    columns = [this.ColumnEnum.ID, this.ColumnEnum.CLASS, this.ColumnEnum.GRADE, this.ColumnEnum.NUMBER_OF_STUDENTS];

    mapper = {
        [this.ColumnEnum.ID]: "classRoomId",
        [this.ColumnEnum.CLASS]: "name",
        [this.ColumnEnum.GRADE]: "schoolGrade",
        [this.ColumnEnum.NUMBER_OF_STUDENTS]: "students",
    };

    onClickSave = (event) => {
        const row = this.state.rows[event.target.id];
        console.log(row);
    };

    classromNameChangeHandler = (event) => {
        const classroomName = event.target.value;
        this.setState({
            classroomName,
        });
    };

    schoolGradeChangeHandler = (event) => {
        const schoolGrade = event.target.value;
        this.setState({
            schoolGrade,
        });
    };

    createNewClassroom = () => {
        this.setState({
            isFetchInProgress: true,
        });

        fetch(CREATE_NEW_CLASSROOM, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

                Authorization: 'Bearer ' + localStorage.getItem("token"),
            },
            body: JSON.stringify({
                schoolGrade: this.state.schoolGrade,
                name: this.state.classroomName
            })
        }).then((response) => response.json()).then((response) => {
            //console.log(response);
            this.setState({
                classroomName: "",
                schoolGrade: "",
            });
            this.fetchData();
        });
    };

    onClickDelete = (event) => {

    };

    onInputChange = (event) => {
        const rowId = event.target.id;
        const prop = event.target.name;
        const value = event.target.value;
        this.props.rows[rowId][prop] = value;

        this.setState({
            rows: this.props.rows
        });
    };

    render() {
        return (
            <div>{this.state.isFetchInProgress ? null : (
                <div style={{ backgroundColor: "#EBEBEB", color: "#000000" }}>
                    <table id="users" style={{ "width": "100%" }}>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Odeljenje</th>
                                <th>Razred</th>
                                <th>Broj učenika</th>
                                <th colSpan="2"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td><input name="classroomName" onChange={this.classromNameChangeHandler} /></td>
                                <td><input name="schoolGrade" onChange={this.schoolGradeChangeHandler} /></td>
                                <td></td>
                                <td colSpan="2"><button id="" className="bp3-button" onClick={this.createNewClassroom}>Dodaj novo odeljenje</button></td>
                            </tr>
                            {this.state.rows.map((row, row_index) => {
                                return <tr key={row_index}>
                                    {this.columns.map((column, index) => {
                                        let prop = this.mapper[column];
                                        if (column === this.ColumnEnum.NUMBER_OF_STUDENTS) {
                                            return <td key={index}>{row[prop].length}</td>
                                        }
                                        return <td key={index}><input id={row_index} disabled={column === this.ColumnEnum.ID} name={prop} onChange={this.onInputChange} value={[row[prop]] || row[prop] || ""} /></td>
                                    })}
                                    <td><button id={row_index} className="bp3-button" onClick={this.onClickSave}>Sačuvaj</button></td>
                                    <td><button id={row_index} className="bp3-button" onClick={this.onClickDelete}>Obriši</button></td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            )}</div>
        )
    }
}