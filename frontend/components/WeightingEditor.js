import PropTypes from 'prop-types';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import update from 'react-addons-update';
import { newWeightings } from '../actions/index';
import Slider from 'rc-slider';
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider);

// import handle from './Handle';
// import Tooltip from 'rc-tooltip';
import '../assets/stylesheets/base.scss';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

const defaultWeightings = {"obp": 30,
                    "slg": 30,
                    "soRate": 7,
                    "bbRate": 4,
                    "sbPct": 5,
                    "sb": 6,
                    "ba": 7,
                    "hrRate": 8,
                    "rbi": 3 };

// const createSliderWithTooltip = Slider.createSliderWithTooltip;
// const Range = createSliderWithTooltip(Slider.Range);


class WeightingEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {weightings: defaultWeightings};
    // this.onSubmit = this.onSubmit.bind(this);
    this.onSliderChange = this.onSliderChange.bind(this);
    props.onNewWeightings(this.state.weightings);
  }
  onSliderChange(value, stat) {
    // const prevValue = this.state.weightings[stat];
    var newStatWeighting = {};
    newStatWeighting[stat] = value;
    const adjustedWeightings = Object.assign(this.state.weightings, newStatWeighting);
    // console.log(newStatWeighting);
    // this.setState({weightings: adjustedWeightings, budget: this.state.budget + (prevValue - value)});
    console.log("weightings about to update");
    // var weightSum = 0;
    // Object.keys(adjustedWeightings).forEach(statKey => {
    //   weightSum = weightSum + adjustedWeightings[statKey];
    // });
    // const weightFactor = 100 / weightSum;
    // var proportionalWeightings = {};
    // Object.keys(adjustedWeightings).forEach(statKey => {
    //   proportionalWeightings[statKey] = adjustedWeightings[statKey] * weightFactor;
    // });
    // console.log("adjustedWeightings", adjustedWeightings);
    // console.log("proportionalWeightings", proportionalWeightings);
    // console.log("weightFactor", weightFactor);
    this.props.onNewWeightings(adjustedWeightings/* proportionalWeightings */);
  }
  render() {
    console.log("Weighting editor rendering...");
    return (
      <div className="weighting-editor">
        <label>OBP</label>
        <Range disabledmin={0} max={100} onAfterChange={(value) => this.onSliderChange(value, "obp")} defaultValue={this.state.weightings.obp} />
        <br/>
        <label>SLG</label>
        <Range disabledmin={0} max={100} onAfterChange={(value) => this.onSliderChange(value, "slg")} defaultValue={this.state.weightings.slg} />
        <br/>
        <label>SO Rate</label>
        <Range disabledmin={0} max={100} onAfterChange={(value) => this.onSliderChange(value, "soRate")} defaultValue={this.state.weightings.soRate} />
        <br/>
        <label>HR Rate</label>
        <Range disabledmin={0} max={100} onAfterChange={(value) => this.onSliderChange(value, "hrRate")} defaultValue={this.state.weightings.hrRate} />
        <br/>
        <label>BB Rate</label>
        <Range disabledmin={0} max={100} onAfterChange={(value) => this.onSliderChange(value, "bbRate")} defaultValue={this.state.weightings.bbRate} />
        <br/>
        <label>SB</label>
        <Range disabledmin={0} max={100} onAfterChange={(value) => this.onSliderChange(value, "sb")} defaultValue={this.state.weightings.sb} />
        <br/>
        <label>SB%</label>
        <Range disabledmin={0} max={100} onAfterChange={(value) => this.onSliderChange(value, "sbPct")} defaultValue={this.state.weightings.sbPct} />
        <br/>
        <label>BA</label>
        <Range disabledmin={0} max={100} onAfterChange={(value) => this.onSliderChange(value, "ba")} defaultValue={this.state.weightings.ba} />
        <br/>
        <label>RBI</label>
        <Range disabledmin={0} max={100} onAfterChange={(value) => this.onSliderChange(value, "rbi")} defaultValue={this.state.weightings.rbi} />
        <br/>
        {/* <label>Weighting points remaining: {this.state.budget}</label> */}
        <br/>
      </div>
    );
  }
}

WeightingEditor.propTypes = {
    onNewWeightings: PropTypes.func
};

const mapStateToProps = (/* state */) => {
    return {
        // weightings: state.weightings
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
