import React, { Component } from "react";
import { GET_GRADES_FOR_STUDENT } from "../server/relativeURLs";
import { CLASS_NAME_TRANSLATION_MAPPER } from "../enums";

export class ShowGradesForStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetchInProgress: true,            
            grades: [],
            courses: {},
        };
        this.fetchData();
    }

    rows = [];

    fetchData = async () => {
        this.props.state.shouldShowSpinner(true);
        let promise = await fetch(GET_GRADES_FOR_STUDENT, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem("token"),
            },
        });

        this.rows = await promise.json();

        let courses = [];

        this.rows.forEach((row) => {
            if(!courses.includes(row.courseName) && row.studentId === this.props.state.studentId) {
                courses.push(row.courseName);
            }
        });

        this.props.state.shouldShowSpinner(false);
        this.setState({
            courses: courses,
            isFetchInProgress: false,
        });
    };

    getAverage = (allGrades, semester, courseName) => {
        const grades = allGrades.filter((grade) => grade.studentId === this.props.state.studentId && grade.courseName === courseName && grade.semester === semester).map((grade) => grade.gradePoint);
        const length = grades.length;
        let sum = 0;

        grades.forEach((grade) => {
            sum = sum + +grade;
        });

        return sum / length ? (sum / length).toFixed(2) : 0;
    };

    render () {
        return (
            <div>
                {this.state.isFetchInProgress ? null : (
                    <div className="text-center border border-light p-5" style={{ backgroundColor: "#EBEBEB", color: "#000000" }}>
                    <table id="users">
                        <thead>
                            <tr>
                                <th>Naziv predmeta</th>
                                <th>Ocene u prvom polugodištu</th>
                                <th>Prosek u prvom polugodištu</th>
                                <th>Ocene u drugom polugodištu</th>
                                <th>Prosek u drugom polugodištu</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.isFetchInProgress ? null : this.state.courses.map((course, index) => {
                                return (
                                    <tr key={index}>
                                        <td key={`${index}_1`}>{CLASS_NAME_TRANSLATION_MAPPER[course]}</td>
                                        <td key={`${index}_2`}>{this.rows.filter((grade) => grade.studentId === this.props.state.studentId && grade.semester === 1 && grade.courseName === course).map(grade => grade.gradePoint).join(", ")}</td>
                                        <td key={`${index}_3`}>{this.getAverage(this.rows, 1, course)}</td>
                                        <td key={`${index}_4`}>{this.rows.filter((grade) => grade.studentId === this.props.state.studentId &&  grade.semester === 2 && grade.courseName === course).map(grade => grade.gradePoint).join(", ")}</td>
                                        <td key={`${index}_5`}>{this.getAverage(this.rows, 2, course)}</td>
                                    </tr>)
                            })}
                        </tbody>
                    </table>
                </div>
                )}
            </div>            
        )
    }
}
