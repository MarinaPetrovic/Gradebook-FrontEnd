import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { routes } from "../routes";
import { ROLE } from "../enums";
import { DELETE_ADMIN_USER, DELETE_PARENT_USER, DELETE_STUDENT_USER, DELETE_TEAHER_USER } from "../server/relativeURLs";

class TableWithUsers extends Component {
  constructor(props) {
    super(props);
    this.redirectToCreateNewForm = this.redirectToCreateNewForm.bind(this);
    this.state = {
      rows: this.props.rows
    }
  }

  onClickSave = (event) => {
    const row = this.state.rows[event.target.id];
    this.props.onSaveCallback(row);
  }

  DELETE_MAPPER = {
    [ROLE.admin]: DELETE_ADMIN_USER,
    [ROLE.parent]: DELETE_PARENT_USER,
    [ROLE.student]: DELETE_STUDENT_USER,
    [ROLE.teacher]: DELETE_TEAHER_USER,
  };

  ID_MAPPER = {
    [ROLE.admin]: "adminId",
    [ROLE.parent]: "parentId",
    [ROLE.student]: "studentId",
    [ROLE.teacher]: "teacherId",
  }

  onClickDelete = (event) => {
    const rowId = event.target.id;
    const userId = this.props.rows[rowId][this.ID_MAPPER[this.props.userType]];
    const url = this.DELETE_MAPPER[this.props.userType] + userId;

    fetch(url, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

                Authorization: 'Bearer ' + localStorage.getItem("token"),
            }
        }).then((response) => response.json()).then(() => {
          this.props.onDeleteCallback();
        });
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

  getCssClass = (column) => {

    if (this.props.columnEnum.GENDER && column === this.props.columnEnum.GENDER) {
      return "column-gender";
    }
    if (this.props.columnEnum.CLASSROOM && column === this.props.columnEnum.CLASSROOM) {
      return "column-classRoom";
    }
    if (this.props.columnEnum.ID && column === this.props.columnEnum.ID) {
      return "column-id";
    }
    return "";
  }

  redirectToCreateNewForm = async () => {
    this.props.history.push({
      pathname: routes.create,
      state: { role: this.props.userType }
    });
  }

  render() {
    return (
      <div>
        <button className="margin-bottom bp3-button" onClick={this.redirectToCreateNewForm}>Kreiraj novog korisnika</button>
        <table id="users">
          <thead>
            <tr>
              {this.props.columns.map((column, index) => <th key={index}>{column}</th>)}
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.rows.map((row, row_index) => {
              return <tr key={row_index}>
                {this.props.columns.map((column, index) => {
                  let prop = this.props.mapper[column];
                  if (index === 0 || column === this.props.columnEnum.USERNAME) {
                    let _class = this.getCssClass(column);
                    return <td key={index}><input className={_class} id={row_index} disabled={true} value={row[prop] || ""} /></td>
                  }
                  let _class = this.getCssClass(column);
                  return <td key={index}><input className={_class} id={row_index} name={prop} onChange={this.onInputChange} value={row[prop] || ""} /></td>
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

export default withRouter(TableWithUsers);
