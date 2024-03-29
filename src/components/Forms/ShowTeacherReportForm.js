import React, { Component } from "react";
import { GET_TEACHERS_REPORT, ADD_NEW_MARK } from "../../server/relativeURLs";
import { CLASS_NAME_TRANSLATION_MAPPER } from "../../enums";

export class ShowTeacherReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetchInProgress: true,
        };

        this.fetchData();
    }
    grades = {};
    courses = {};
    fetchData = async () => {
        this.props.state.shouldShowSpinner(true);
        let promise = await fetch(GET_TEACHERS_REPORT(this.props.state.teacherId), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem("token"),
            },
        });

        let response = await promise.json();
        this.courses = response.courses;
        this.setState({
            isFetchInProgress: false,
        });
        this.props.state.shouldShowSpinner(false);
    }

    addGrade = (event) => {
        const index = event.target.id;
        const semester = event.target.attributes.semester.value;

        let model = {
            semester,
            assignmentDate: new Date(),
            notes: event.target.attributes.notes.value,
            gradePoint: this.grades[`${index}_${semester}`],
            studentId: event.target.attributes.studentid.value,
            classRoomId: event.target.attributes.classroomid.value,
            courseId: event.target.attributes.courseid.value,
            teacherId: this.props.state.teacherId,
        };

        fetch(ADD_NEW_MARK + model.teacherId, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem("token"),
            },
            body: JSON.stringify(model),
        }).then((response) => response.json()).then(() => {
            this.setState({
                isFetchInProgress: true,
            });

            this.fetchData();
        });

        console.log(model);
    };

    setGrade = (event) => {
        const index = event.target.id;
        const semester = event.target.attributes.semester.value
        this.grades[`${index}_${semester}`] = event.target.value;
    };

    getAverage = (student, course, semester) => {
        const grades = student.grades.filter((grade) => grade.notes === course.courseName && grade.semester === semester).map((grade) => grade.gradePoint);
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
                {this.state.isFetchInProgress ? null : (
                    <div className={"teacher-report-table"}>
                        {
                            this.courses.map((course, index) => {
                                return (
                                    <div key={index}>
                                        <h3>{CLASS_NAME_TRANSLATION_MAPPER[course.courseName]}</h3>
                                        {course.classRooms.map((classRoom, index) => {
                                            return (
                                                <div key={index}>
                                                    <h4>{classRoom.classRoomName}</h4>
                                                    <table  id="users" className="text-center border border-light p-5">
                                                        <thead>
                                                            <tr>
                                                                <th>Ime i prezime</th>
                                                                <th>Prvo polugodiste</th>                                                                
                                                                <th colSpan="2">Dodaj ocenu</th>
                                                                <th>Prosek u prvom polugodistu</th>
                                                                <th>Drugo polugodiste</th>
                                                                <th colSpan="2">Dodaj ocenu</th>
                                                                <th>Prosek u drugom polugodistu</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {classRoom.students.map((student, index) => {
                                                                return (
                                                                    <tr key={index}>
                                                                        <td>{`${student.firstName} ${student.lastName}`}</td>
                                                                        <td>{student.grades.filter((grade) => grade.notes === course.courseName && grade.semester === 1).map((grade) => grade.gradePoint).join(", ")}</td>
                                                                        <td><input id={index} semester="1" onChange={this.setGrade} /></td>
                                                                        <td>
                                                                            <button
                                                                                id={index}
                                                                                semester="1"
                                                                                studentid={student.studentId}
                                                                                classroomid={classRoom.classRoomId}
                                                                                courseid={course.courseId}
                                                                                notes={course.courseName}
                                                                                onClick={this.addGrade}>Dodaj</button>
                                                                        </td>
                                                                        <td>{this.getAverage(student, course , 1)}</td>
                                                                        <td>{student.grades.filter((grade) => grade.notes === course.courseName && grade.semester === 2).map((grade) => grade.gradePoint).join(", ")}</td>
                                                                        <td><input id={index} semester="2" onChange={this.setGrade} /></td>
                                                                        <td>
                                                                            <button
                                                                                id={index}
                                                                                semester="2"
                                                                                studentid={student.studentId}
                                                                                classroomid={classRoom.classRoomId}
                                                                                courseid={course.courseId}
                                                                                notes={course.courseName}
                                                                                onClick={this.addGrade}>Dodaj</button>
                                                                        </td>
                                                                        <td>{this.getAverage(student, course , 2)}</td>
                                                                    </tr>)
                                                            })}
                                                        </tbody>
                                                    </table>
                                                </div>)
                                        })}
                                    </div>
                                )
                            })
                        }
                    </div>

                )}
            </div>
        )
    }
}