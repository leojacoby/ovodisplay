import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn, SizePerPageDropDown} from 'react-bootstrap-table';
import '../assets/stylesheets/base.scss';
import '../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css';


class Table extends Component {
  constructor(props) {
    super(props);
    // this.onToggleDropDown = this.onToggleDropDown.bind(this);
    this.renderSizePerPageDropDown = this.renderSizePerPageDropDown.bind(this);
  }
  // onToggleDropDown(toggleDropDown) {
  //   // do your stuff here
  //   toggleDropDown();
  // }

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
                        data={this.props.data}
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
    data: PropTypes.object,
};

export default Table;
