import React, { Component } from "react";

export class TableWithUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: this.props.rows
    }
  }
  onClickSave = (event) => {
    const row = this.state.rows[event.target.id];
    this.props.onSaveCallback(row);
  }

  onClickDelete = (event) => {
    const rowId = event.target.id;    
    this.props.onDeleteCallback(rowId);
    this.props.rows.splice(rowId, rowId + 1);
    this.setState({
      rows: this.props.rows
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

    console.log(this.state.rows);
  };

  render() {
    return (
      <table style={{width: "100%"}}>
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
                if(column === "adminId") {
                  return <td key={index}><input readOnly value={row[prop]}/></td>
                }
                return <td key={index}><input id={row_index} name={prop} onChange={this.onInputChange} value={row[prop]}/></td>
              })}
              <td><button id={row_index} className="bp3-button" onClick={this.onClickSave}>Sacuvaj</button></td>
              <td><button id={row_index} className="bp3-button" onClick={this.onClickDelete}>Obrisi</button></td>
            </tr>
          })}
        </tbody>
      </table>
    )
  }
}
