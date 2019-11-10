import React, { Component } from "react";
import { GET_TEACHERS_REPORT } from "../../server/relativeURLs";
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

        console.log(model);
    };

    setGrade = (event) => {
        const index = event.target.id;
        const semester = event.target.attributes.semester.value
        this.grades[`${index}_${semester}`] = event.target.value;
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
                                        <p>{CLASS_NAME_TRANSLATION_MAPPER[course.courseName]}</p>
                                        {course.classRooms.map((classRoom, index) => {
                                            return (
                                                <div key={index}>
                                                    <p>
                                                        {classRoom.classRoomName}
                                                    </p>
                                                    <table className="text-center border border-light p-5">
                                                        <thead>
                                                            <tr>
                                                                <th>Ime i prezime</th>
                                                                <th>Prvo polugodiste</th>
                                                                <th>Dodaj ocenu</th>
                                                                <th>Drugo polugodiste</th>
                                                                <th>Dodaj ocenu</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {classRoom.students.map((student, index) => {
                                                                return (
                                                                    <tr key={index}>
                                                                        <td>{`${student.firstName} ${student.lastName}`}</td>
                                                                        <td>{student.grades.filter((grade) => grade.note === course.courseName && grade.semester === 1).map((grade) => grade.gradePoint).join(" ")}</td>
                                                                        <td>
                                                                            <input id={index} semester="1" onChange={this.setGrade} />
                                                                            <button
                                                                                id={index}
                                                                                semester="1"
                                                                                studentid={student.studentId}
                                                                                classroomid={classRoom.classRoomId}
                                                                                courseid={course.courseId}
                                                                                notes={course.courseName}
                                                                                onClick={this.addGrade}>Dodaj</button>
                                                                        </td>
                                                                        <td>{student.grades.filter((grade) => grade.note === course.courseName && grade.semester === 2).map((grade) => grade.gradePoint).join(" ")}</td>

                                                                        <td>
                                                                            <input id={index} semester="2" onChange={this.setGrade} />
                                                                            <button semester="2" onClick={this.addGrade}>Dodaj</button>
                                                                        </td>
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