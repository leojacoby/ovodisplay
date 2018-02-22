import PropTypes from 'prop-types';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { newWeightings } from '../actions/index';
import Slider from 'rc-slider';
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider);

// import handle from './Handle';
// import Tooltip from 'rc-tooltip';
import '../assets/stylesheets/base.scss';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

const dummyWeightings = {"obp": 0.0,
                    "slg": 0.6,
                    "soRate": 0.0,
                    "bbRate": 0.2,
                    "sbPct": 0.5,
                    "sb": 7.5,
                    "ba": 0.7,
                    "hrRate": 0.2,
                    "rbi": 0.3 };

// const createSliderWithTooltip = Slider.createSliderWithTooltip;
// const Range = createSliderWithTooltip(Slider.Range);


const WeightingEditor = ({weightings, onNewWeightings}) => {
  console.log("weightings", weightings);
  console.log("onNewWeightings", onNewWeightings);
  return (
    <div className="weighting-editor">
      <Range min={0} max={100} defaultValue={10} />
      <button className="btn-primary" onClick={() => onNewWeightings(dummyWeightings)}>submit</button>
    </div>
  );
};

WeightingEditor.propTypes = {
    weightings: PropTypes.object,
    players: PropTypes.array,
    onNewWeightings: PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        weightings: state.weightings
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
)(WeightingEditor);
