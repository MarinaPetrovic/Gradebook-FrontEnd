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
                                                                        <td>4, 5, 1</td>
                                                                        <td>
                                                                            <input id={index} />
                                                                            <button>Dodaj</button>
                                                                        </td>
                                                                        <td>1</td>
                                                                        <td>
                                                                            <input id={index} />
                                                                            <button>Dodaj</button>
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