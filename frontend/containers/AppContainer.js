import PropTypes from 'prop-types';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import Table from '../components/Table';
import WeightingEditor from '../components/WeightingEditor';
import axios from 'axios';
import { newWeightings } from '../actions/index';
import "../assets/stylesheets/base.scss";


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
  componentWillUpdate() {
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
    return (
    <div className={"main"}>
        <Table /* className="data-table" */ data={this.state.players}/>
        <WeightingEditor /* className={"weighting-editor"} */ />
    </div>
    );
  }
}

AppContainer.propTypes = {
    weightings: PropTypes.object,
    players: PropTypes.array,
};

const mapStateToProps = (state) => {
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
