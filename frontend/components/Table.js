import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn, SizePerPageDropDown} from 'react-bootstrap-table';
import axios from 'axios';
import { connect } from 'react-redux';
// import deepCopy from 'immutability-helper';
import '../assets/stylesheets/base.scss';
import '../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css';


class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {players: []};
    this.renderSizePerPageDropDown = this.renderSizePerPageDropDown.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    console.log('will receive props');
    axios.get('https://ovo-interactive.herokuapp.com/db', {
        params: {
          weightings: nextProps.weightings
        }
      })
      .then(response => {
        this.setState({players: response.data}, () => {
          console.log('players received');
        });
      })
      .catch(error => {
        console.log("error", error);
      });
  }
  renderSizePerPageDropDown(props) {
    return (
      <div className="btn-group pagination">
        {
          [ 10, 25, 50 ].map((n, idx) => {
            const isActive = (n === props.currSizePerPage) ? 'active' : null;
            return (
              <button key={ idx }
                      type="button"
                      className={ `btn btn-info ${isActive}` }
                      onClick={ () => props.changeSizePerPage(n) }>{ n }
              </button>
            );
          })
        }
      </div>
    );
  }

  render() {
    const options = {
      sizePerPageDropDown: this.renderSizePerPageDropDown,
      // defaultSortName: 'ovo',  // default sort column name
      // defaultSortOrder: 'desc',  // default sort order
      page: 1,
      prePage: '⟵',
      nextPage: '⟶',
      firstPage: '⟸',
      lastPage: '⟹'
    };
    return (
      <div className="data-table">
        <BootstrapTable ref="table"
                        data={this.state.players}
                        options={options}
                        striped hover pagination>
          {/* <TableHeaderColumn isKey dataField="_id">
            ID
          </TableHeaderColumn> */}
          <TableHeaderColumn isKey dataField="rank" width="15%">
            Rank
          </TableHeaderColumn>
          <TableHeaderColumn dataField="name" width="50%">
            Name
          </TableHeaderColumn>
          <TableHeaderColumn dataField="ovo" width="35%">
            OVO
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

Table.propTypes = {
    weightings: PropTypes.object,
};

const mapStateToProps = (state) => {
    return {
        weightings: state.weightings
    };
};

const mapDispatchToProps = (/* dispatch */) => {
    return {
      // onNewWeightings: (weightings) => dispatch(newWeightings(weightings))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    undefined,
    {pure: false}
)(Table);

// export default Table;
