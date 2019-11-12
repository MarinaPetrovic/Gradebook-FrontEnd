import React, { Component } from "react";
import { GET_ALL_COURSES, CREATE_NEW_COURSE } from "../server/relativeURLs";
import { CLASS_NAME_TRANSLATION_MAPPER } from "../enums";

export class ShowCourses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetchInProgress: true,
            rows: [],
            courseId: 0,
            courseName: "",
            teacherId: 0,
            teacherName: "",
        }
        this.fetchData();
    }

    fetchData = async () => {
        this.props.state.shouldShowSpinner(true);
        let promise = await fetch(GET_ALL_COURSES, {
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
        ID: "courseId",
        COURSENAME: "courseName",
        TEACHER_ID: "teacherId",
        TEACHER: "teacherName"
    };

    columns = [this.ColumnEnum.ID, this.ColumnEnum.COURSENAME, this.ColumnEnum.TEACHER_ID, this.ColumnEnum.TEACHER];

    mapper = {
        [this.ColumnEnum.ID]: "courseId",
        [this.ColumnEnum.COURSENAME]: "courseName",
        [this.ColumnEnum.TEACHER_ID]: "teacherId",
        [this.ColumnEnum.TEACHER]: "teacherName"
    };

    onClickSave = (event) => {
        const row = this.state.rows[event.target.id];
        console.log(row);
        alert("Ne postoji endpoint za update");
    }

    onClickDelete = (event) => {

    }

    onInputChange = (event) => {
        const rowId = event.target.id;
        const prop = event.target.name;
        const value = event.target.value;
        this.props.rows[rowId][prop] = value;

        this.setState({
            rows: this.props.rows
        });
    };

    placeholder = "Opciono"

    createNewInputHandler = (event) => {
        const prop = event.target.name;
        const value = event.target.value;

        this.setState({
            [prop]: value,
        });
    };

    createNewTeaching = () => {
        this.setState({
            isFetchInProgress: true,
        });

        fetch(CREATE_NEW_COURSE, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

                Authorization: 'Bearer ' + localStorage.getItem("token"),
            },
            body: JSON.stringify({
                courseId: this.state.courseId,
                courseName: this.state.courseName,
                teacherId: this.state.teacherId,
                teacherName: this.state.teacherName,
            })
        }).then((response) => response.json()).then(() => {
            this.fetchData();
            this.setState({
                courseId: "",
                courseName: "",
                teacherId: "",
                teacherName: "",
            });
        });
    };


    render() {
        return (
            <div>{this.state.isFetchInProgress ? null : (
                <div className="table-container" style={{ backgroundColor: "#EBEBEB", color: "#000000" }}>
                    <table id="users" style={{ "width": "100%" }}>
                        <thead>
                            <tr>
                                <th>Id predmeta</th>
                                <th>Naziv predmeta</th>
                                <th>Id nastavnika</th>
                                <th>Korisničko ime nastavnika</th>
                                <th colSpan="2"></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input name="courseId" onChange={this.createNewInputHandler} /></td>
                                <td><input name="courseName" placeholder="Opciono" onChange={this.createNewInputHandler} /></td>
                                <td><input name="teacherId" onChange={this.createNewInputHandler} /></td>
                                <td><input name="teacherName" placeholder="Opciono" onChange={this.createNewInputHandler} /></td>
                                <td colSpan="2"><button id="" className="bp3-button" onClick={this.createNewTeaching}>Dodaj novi predmet</button></td>
                            </tr>
                            {this.state.rows.map((row, row_index) => {
                                return <tr key={row_index}>
                                    {this.columns.map((column, index) => {
                                        let prop = this.mapper[column];
                                        return <td key={index}><input id={row_index} disabled={column === this.ColumnEnum.ID || column === this.ColumnEnum.TEACHER_ID} name={prop} onChange={this.onInputChange} value={CLASS_NAME_TRANSLATION_MAPPER[row[prop]] || row[prop] || ""} /></td>
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