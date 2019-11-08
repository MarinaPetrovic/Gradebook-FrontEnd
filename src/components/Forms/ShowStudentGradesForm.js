import React, { Component } from "react";
import { GET_ALL_STUDENTS_GRADES } from "../../server/relativeURLs";

const CLASS = {
    MATH: "Mathematics",
    PHYSICS: "Physics",
    SERBIAN: "Serbian language and literature",
    GERMAN: "German language",
    ENGLISH: "English language"
};
export class ShowStudentGradesForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetchInProgress: true,
        };

        this.fetchData();
    }

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

        let gradesFirstSemester = {};
        userGradesFirstSemester.forEach((item) => {
            gradesFirstSemester[item.courseName] = gradesFirstSemester[item.courseName] ? gradesFirstSemester[item.courseName] + `${item.gradePoint}, ` : `${item.gradePoint}, `;
        });

        let gradesSecondSemester = {};
        userGradesSecondSemester.forEach((item) => {
            gradesSecondSemester[item.courseName] = gradesSecondSemester[item.courseName] ? gradesSecondSemester[item.courseName] + `${item.gradePoint}, ` : `${item.gradePoint}, `;
        });
        console.log(gradesFirstSemester);
        console.log(gradesSecondSemester);
        this.setState({
            isFetchInProgress: false,
        });


    };
    render() {
        return (
            <div className="text-center border border-light p-5" style={{ backgroundColor: "#EBEBEB", color: "#000000" }}>

            </div>
        )
    }
}
