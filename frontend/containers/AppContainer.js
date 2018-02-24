import PropTypes from 'prop-types';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import Table from '../components/Table';
import WeightingEditor from '../components/WeightingEditor';
// import axios from 'axios';
// import { newWeightings } from '../actions/index';
import "../assets/stylesheets/base.scss";


// import './App.css';


class AppContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log("app container rendering", this.props.weightings);
    return (
        <div className={"main"}>
            <Table /* className="data-table" */ /* weightings={this.props.weightings}*/ />
            <WeightingEditor /* className={"weighting-editor"} */ />
        </div>
    );
  }
}

AppContainer.propTypes = {
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
    mapDispatchToProps
)(AppContainer);

// export default AppContainer;
