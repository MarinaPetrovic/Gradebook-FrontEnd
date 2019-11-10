import React, { Component } from "react";
import { GET_ALL_CLASSROOMS } from "../server/relativeURLs";

export class ShowClassrooms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetchInProgress: true,
            rows: []
        }
        this.fetchData();
    }

    fetchData = async () => {
        let promise = await fetch(GET_ALL_CLASSROOMS, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

                Authorization: 'Bearer ' + localStorage.getItem("token"),
            },
        });

        let rows = await promise.json();

        this.setState({
            isFetchInProgress: false,
            rows: rows,
        });
    };

    ColumnEnum = {
        CLASS: "name",
        GRADE: "schoolGrade"
    };

    columns = [this.ColumnEnum.CLASS, this.ColumnEnum.GRADE];

    mapper = {
        [this.ColumnEnum.CLASS]: "name",
        [this.ColumnEnum.GRADE]: "schoolGrade",

    };

    onClickSave = (event) => {
        const row = this.state.rows[event.target.id];
        this.props.onSaveCallback(row);
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

    render() {
        return (
            <div style={{ backgroundColor: "#EBEBEB", color: "#000000" }}>
                <table style={{ "width": "100%" }}>
                    <thead>
                        <tr>
                            <th style={{ textAlign: "center" }}>Odeljenje</th>
                            <th style={{ textAlign: "center" }}>Razred</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input id="" name="" onChange={this.onInputChange2} /></td>
                            <td><input id="" name="" onChange={this.onInputChange2} /></td>
                            <td><button id="" className="bp3-button">Dodaj novo odeljenje</button></td>
                        </tr>
                    </tbody>
                </table>
                <table id="users" style={{ "width": "100%" }}>
                    <thead>
                        <tr>
                            <th>Odeljenje</th>
                            <th>Razred</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                        {this.state.rows.map((row, row_index) => {
                            return <tr key={row_index}>
                                {this.columns.map((column, index) => {
                                    let prop = this.mapper[column];
                                    return <td key={index}><input id={row_index} name={prop} onChange={this.onInputChange} value={[row[prop]] || row[prop] || ""} /></td>
                                })}
                                <td><button id={row_index} className="bp3-button" onClick={this.onClickSave}>Sačuvaj</button></td>
                                <td><button id={row_index} className="bp3-button" onClick={this.onClickDelete}>Obriši</button></td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}