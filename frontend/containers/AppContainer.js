import PropTypes from 'prop-types';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import Table from '../components/Table';
import axios from 'axios';
import { newWeightings } from '../actions/index';

// import './App.css';


class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {players: []};
  }
  componentWillMount() {
    axios.get('http://localhost:3000/db', {
        params: {
          weightings: this.props.weightings
        }
      })
      .then(response => {
        this.setState({players: response.data});
      })
      .catch(error => {
        console.log("error", error);
      });
  }
  render() {
    console.log(this.state.players);
    return (
    <div>
        <Table data={this.state.players}/>
        {/* <WeightingEditor weightings={weightings} onChange/> */}
    </div>
    );
  }
}

AppContainer.propTypes = {
    weightings: PropTypes.object,
    players: PropTypes.array,
    onNewWeightings: PropTypes.func
};

const mapStateToProps = (state) => {
    //console.log("state.weightings", state.weightings);
    // console.log("state", state);
    return {
        weightings: state.weightings,
        players: state.players
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
      onNewWeightings: (weightings) => dispatch(newWeightings(weightings))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppContainer);

// export default AppContainer;
