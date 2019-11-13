import React, { Component } from "react";
import { GET_ALL_STUDENTS_GRADES, GET_STUDENT_GRADES } from "../../server/relativeURLs";
import { CLASS_NAME_TRANSLATION_MAPPER } from "../../enums";

export class ShowStudentGradesForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showGrid: false,
            isFetchInProgress: true,
            children: [],
            grades: [],
            courses: {},
        };

        this.fetchChildren();
    }


    fetchChildren = () => {
        this.props.state.shouldShowSpinner(true);
        fetch(GET_STUDENT_GRADES + this.props.state.parentId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem("token"),
            },
        }).then((response) => response.json()).then((response) => {

            this.props.state.shouldShowSpinner(false);
            this.setState({
                children: response,
            });
        });
    };

    getStudentGrades = async (event) => {
        const studentId = event.target.id;
        const url = GET_ALL_STUDENTS_GRADES(studentId);
        
        this.props.state.shouldShowSpinner(true);
        this.setState({
            isFetchInProgress: true,     
            showGrid: false,
        });

        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem("token"),
            },
        }).then((response) => response.json()).then((response) => {
            let courses = {};
            response.courses.forEach((course) => {
                courses[course.courseId] = course.courseName;
            });

            this.setState({
                courses: courses,
                grades: response.grades,
                isFetchInProgress: false,
                showGrid: true,
            });

            this.props.state.shouldShowSpinner(false);
        });
    };

    getAverage = (allGrades, semester, courseId) => {
        const grades = allGrades.filter((grade) => grade.courseId === +courseId && grade.schoolTerm === +semester).map((grade) => grade.gradePoint);
        const length = grades.length;
        let sum = 0;

        grades.forEach((grade) => {
            sum = sum + +grade;
        });

        return sum / length ? (sum / length).toFixed(2) : 0;
    };

    render() {
        return (
            <div>
                {!this.state.children.length ? null : (
                    <div>
                        <table>
                            <tbody>
                                <tr>
                                    {this.state.children.map((student, index) => <td key={index}><button className="bp3-button" id={student.studentId} key={index} onClick={this.getStudentGrades}>{student.firstName} {student.lastName}</button></td>)}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}

                {this.state.showGrid && (
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
                            {this.state.isFetchInProgress ? null : Object.keys(this.state.courses).map((key, index) => {
                                return (
                                    <tr key={index}>
                                        <td key={`${index}_1`}>{CLASS_NAME_TRANSLATION_MAPPER[this.state.courses[+key]]}</td>
                                        <td key={`${index}_2`}>{this.state.grades.filter((grade) => grade.schoolTerm === 1 && grade.courseId === +key).map(grade => grade.gradePoint).join(", ")}</td>
                                        <td key={`${index}_3`}>{this.getAverage(this.state.grades, 1, key)}</td>
                                        <td key={`${index}_4`}>{this.state.grades.filter((grade) => grade.schoolTerm === 2 && grade.courseId === +key).map(grade => grade.gradePoint).join(", ")}</td>
                                        <td key={`${index}_5`}>{this.getAverage(this.state.grades, 2, key)}</td>
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
