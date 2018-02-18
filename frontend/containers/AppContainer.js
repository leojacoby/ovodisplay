import PropTypes from 'prop-types';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import Table from '../components/Table';
import axios from 'axios';
// import './App.css';


class AppContainer extends Component {
    constructor() {
      super();
      this.state = {players: []};
    }
    componentWillMount() {
      axios.get('http://localhost:3000/db')
        .then(response => {
          this.setState({players: response.data});
        });
    }
    render() {
      console.log(this.state.players[0]);
      return (
        <div>
            <Table data={this.state.players}/>
        </div>
      );
    }
}

// AppContainer.propTypes = {
//     name: PropTypes.string,
// };
//
// const mapStateToProps = (state) => {
//     return {
//         name: state.name
//     };
// };
//
// const mapDispatchToProps = (/* dispatch */) => {
//     return {
//     };
// };

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(AppContainer);

export default AppContainer;
