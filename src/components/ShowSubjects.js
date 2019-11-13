import React, { Component } from "react";
import { GET_ALL_SUBJECTS, CREATE_NEW_SUBJECT } from "../server/relativeURLs";
import { CLASS_NAME_TRANSLATION_MAPPER } from "../enums";

export class ShowSubjects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetchInProgress: true,
            rows: [],
            id: 0,
            name: "",            
        }
        this.fetchData();
    }

    fetchData = async () => {
        this.props.state.shouldShowSpinner(true);
        let promise = await fetch(GET_ALL_SUBJECTS, {
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
        ID: "id",
        COURSENAME: "name"        
    };

    columns = [this.ColumnEnum.ID, this.ColumnEnum.COURSENAME];

    mapper = {
        [this.ColumnEnum.ID]: "id",
        [this.ColumnEnum.COURSENAME]: "name"
    };

    onClickSave = (event) => {
        const row = this.state.rows[event.target.id];        
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

    createNewInputHandler = (event) => {
        const prop = event.target.name;
        const value = event.target.value;

        this.setState({
            [prop]: value,
        });
    };

    createNewSubject = () => {
        this.setState({
            isFetchInProgress: true,
        });

        fetch(CREATE_NEW_SUBJECT, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

                Authorization: 'Bearer ' + localStorage.getItem("token"),
            },
            body: JSON.stringify({
                courseId: this.state.courseId,
                courseName: this.state.courseName                
            })
        }).then((response) => response.json()).then(() => {
            this.fetchData();
            this.setState({
                id: "",
                name: ""
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
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td><input name="name"  onChange={this.createNewInputHandler} /></td>                               
                                <td><button className="bp3-button" onClick={this.createNewSubject}>Dodaj novi predmet</button></td>
                            </tr>
                            
                            {this.state.rows.map((row, row_index) => {
                                return <tr key={row_index}>
                                    {this.columns.map((column, index) => {
                                        let prop = this.mapper[column];
                                        return <td key={index}><input id={row_index} disabled={column === this.ColumnEnum.ID } name={prop} onChange={this.onInputChange} value={CLASS_NAME_TRANSLATION_MAPPER[row[prop]] || row[prop] || ""} /></td>
                                    })}
                                    <td><button id={row_index} className="bp3-button" onClick={this.onClickSave}>Sačuvaj izmene</button></td>                                    
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            )}</div>
        )
    }
}