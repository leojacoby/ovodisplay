import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

console.log("get fronted!");

class PlayerRow extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.player.name}</td>
        <td>{this.props.player.ovo}</td>
      </tr>
    );
  }
}


PlayerRow.propTypes = {
  player: PropTypes.object
};

class PlayerRows extends React.Component {
  constructor() {
    super();
    this.state = {players: []};
  }
  componentWillMount() {
    axios.get('http://localhost:3000/db')
    .then(response => {
      console.log('response', response.data);
      this.setState({players: response.data});
      console.log('state set');
    });
  }
  render() {
    var rows = [];
    this.state.players.forEach(player => {
      rows.push(<PlayerRow key={player.id} player={player}/>);
    });
    return (
    <tbody>
      {rows}
    </tbody>
  );
  }
}

const Table = () => {
  return (
      <table className="table table-bordered table-responsive">
        <thead>
          <th>Name</th>
          <th>OVO</th>
        </thead>
        <tbody>
          <PlayerRows/>
        </tbody>
      </table>
      // <div>
      //   <BootstrapTable data={this.state.players} options={this.options} pagination={true} search={true}>
      //     <TableHeaderColumn dataField="id" isKey dataSort>ID</TableHeaderColumn>
      //     <TableHeaderColumn dataField="name" dataSort>Name</TableHeaderColumn>
      //     <TableHeaderColumn dataField="obp" dataSort>OBP</TableHeaderColumn>
      //     <TableHeaderColumn dataField="hrRate" dataSort>HR Rate</TableHeaderColumn>
      //     <TableHeaderColumn dataField="soRate" dataSort>SO Rate</TableHeaderColumn>
      //     <TableHeaderColumn dataField="ovo" dataSort>OVO</TableHeaderColumn>
      //   </BootstrapTable>
      // </div>
      // <table>
      //   <tr>
      //     <th>Name</th>
      //     <th>Hits</th>
      //     <th>Homeruns</th>
      //   </tr>
      //   {this.state.players.map(player => {
      //
      //     return (
      //       <tr>
      //         <td>{player.name}</td>
      //         <td>{player.h}</td>
      //         <td>{player.hr}</td>
      //       </tr>
      //     )
      //   })}
      // </table>
  );
};

export default Table;
