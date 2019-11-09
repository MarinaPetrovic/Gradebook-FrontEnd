import React, { Component } from "react";
import { GET_ALL_STUDENTS_GRADES } from "../../server/relativeURLs";
import { CLASSNAME, CLASSNAMETRANSLATION } from "../../enums";

export class ShowStudentGradesForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetchInProgress: true,
        };

        this.fetchData();
    }
    gradesFirstSemester = {};
    gradesSecondSemester = {};
    averageFirstSemester = {};
    averageSecondSemester = {};

    fetchData = async () => {
        let promise = await fetch(GET_ALL_STUDENTS_GRADES, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem("token"),
            },
        });

        let response = await promise.json();
        let userGradesFirstSemester = response.filter((item) => item.studentId === this.props.state.studentID && item.semester === 1);
        let userGradesSecondSemester = response.filter((item) => item.studentId === this.props.state.studentID && item.semester === 2);


        userGradesFirstSemester.forEach((item) => {
            this.gradesFirstSemester[item.courseName] = this.gradesFirstSemester[item.courseName] ? this.gradesFirstSemester[item.courseName] + `${item.gradePoint}, ` : `${item.gradePoint}, `;
            this.averageFirstSemester[item.courseName] = this.averageFirstSemester[item.courseName] + item.gradePoint || 0;
        });

        Object.keys(CLASSNAME).forEach((key) => {
            if(this.gradesFirstSemester[CLASSNAME[key]]) {
                this.averageFirstSemester[CLASSNAME[key]] = Math.ceil(this.averageFirstSemester[CLASSNAME[key]] / (this.gradesFirstSemester[CLASSNAME[key]].split(",").length - 1));
            }
        });

        userGradesSecondSemester.forEach((item) => {
            this.gradesSecondSemester[item.courseName] = this.gradesSecondSemester[item.courseName] ? this.gradesSecondSemester[item.courseName] + `${item.gradePoint}, ` : `${item.gradePoint}, `;
        });
        
        Object.keys(CLASSNAME).forEach((key) => {
            if(this.gradesSecondSemester[CLASSNAME[key]]) {
                this.averageSecondSemester[CLASSNAME[key]] = Math.ceil(this.averageSecondSemester[CLASSNAME[key]] / (this.gradesSecondSemester[CLASSNAME[key]].split(",").length - 1));
            }
        });

        this.setState({
            isFetchInProgress: false,
        });
    };

    render() {
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
                                {Object.keys(CLASSNAME).map((key, index) => {
                                    return (
                                        <tr key={index}>
                                            <td key={`${index}_1`}>{CLASSNAMETRANSLATION[key]}</td>
                                            <td key={`${index}_2`}>{this.gradesFirstSemester[CLASSNAME[key]]}</td>
                                            <td key={`${index}_3`}>{this.averageFirstSemester[CLASSNAME[key]]}</td>
                                            <td key={`${index}_4`}>{this.gradesSecondSemester[CLASSNAME[key]]}</td>
                                            <td key={`${index}_5`}>{this.averageSecondSemester[CLASSNAME[key]]}</td>
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
