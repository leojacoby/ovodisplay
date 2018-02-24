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
    console.log("***constructor");
    super(props);
    this.state = {players: []};
    this.weightings = Object.assign({}, props.weightings);
    this.players = false;
    // this.onToggleDropDown = this.onToggleDropDown.bind(this);
    this.renderSizePerPageDropDown = this.renderSizePerPageDropDown.bind(this);
  }
  componentWillMount() {
    console.log("***component will mount");
    axios.get('http://localhost:3000/db', {
        params: {
          weightings: this.props.weightings
        }
      })
      .then(response => {
        this.setState({players: response.data, shouldUpdate: true}, () => {
          console.log('state set', this.state.players);
          this.players = true;
        });
      })
      .catch(error => {
        console.log("error", error);
      });
  }
  componentDidMount() {
    console.log('***component did mount');
  }
  componentWillReceiveProps(nextProps) {
    console.log("***componentWillReceiveProps", nextProps);
    // this.setState({shouldUpdate: true});
    // console.log("props recieved and state set", this.state.shouldUpdate);
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log("***shouldComponentUpdate");
    console.log("this.players", this.players);
    console.log("old weight", this.weightings);
    console.log("new weight", nextProps.weightings);
    console.log("old weight keys", Object.keys(this.weightings));
    // if this.players is false ==> update
    if (!this.players) {
      console.log("we need players! updating...");
      return true;
    }
    // if old and new weights are difference ==> update
    var returnValue = false;
    Object.keys(this.weightings).forEach(stat => {
      if (this.weightings[stat] !== nextProps.weightings[stat]) {
        // this.weightings = nextProps.weightings;
        returnValue = true;
      }
      console.log("old", stat, this.weightings[stat]);
      console.log("new", stat, nextProps.weightings[stat]);
    });
    // else ==> nah
    if (returnValue) {
      console.log("weightings don't match: updating...");
    } else {
      console.log("not today bud");
    }
    return returnValue;
  }
  componentWillUpdate() {
    console.log("***component will update");
    axios.get('http://localhost:3000/db', {
        params: {
          weightings: this.props.weightings
        }
      })
      .then(response => {
        this.setState({players: response.data, shouldUpdate: false});
      })
      .catch(error => {
        console.log("error", error);
      });
  }
  componentDidUpdate() {
    console.log("***component did update");
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
    console.log("***rendering...");
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
    console.log("mapping state to props");
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
