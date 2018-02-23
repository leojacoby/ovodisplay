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


class WeightingEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {weightings: props.weightings, budget: 0};
    this.onSubmit = this.onSubmit.bind(this);
    this.onSliderChange = this.onSliderChange.bind(this);
  }
  onSliderChange(value, stat) {
    const prevValue = this.state.weightings[stat];
    var newState = update(this.state, {
      weightings: { obp: {$set: value} }
    });
    newState.budget = this.state.budget + (prevValue - value);
    console.log(newState);
    // this.state.weightings[stat] = value;
    this.setState(newState);
  }
  onSubmit() {
    if (this.state.budget === 0) {
      this.props.onNewWeightings(this.state.weightings);
    }
  }
  render() {
    return (
      <div className="weighting-editor">
        <label>OBP</label>
        <Range disabledmin={0} max={100} onAfterChange={(value) => this.onSliderChange(value, "obp")} defaultValue={this.props.weightings.obp} />
        <br/>
        <label>SLG</label>
        <Range disabledmin={0} max={100} defaultValue={this.props.weightings.slg} />
        <br/>
        <label>SO Rate</label>
        <Range disabledmin={0} max={100} defaultValue={this.props.weightings.soRate} />
        <br/>
        <label>HR Rate</label>
        <Range disabledmin={0} max={100} defaultValue={this.props.weightings.hrRate} />
        <br/>
        <label>BB Rate</label>
        <Range disabledmin={0} max={100} defaultValue={this.props.weightings.bbRate} />
        <br/>
        <label>SB</label>
        <Range disabledmin={0} max={100} defaultValue={this.props.weightings.sb} />
        <br/>
        <label>SB%</label>
        <Range disabledmin={0} max={100} defaultValue={this.props.weightings.sbPct} />
        <br/>
        <label>BA</label>
        <Range disabledmin={0} max={100} defaultValue={this.props.weightings.ba} />
        <br/>
        <label>RBI</label>
        <Range disabledmin={0} max={100} defaultValue={this.props.weightings.rbi} />
        <br/>
        <label>Weighting points remaining: {this.state.budget}</label>
        <br/>
        <button className="btn-primary" onClick={this.onSubmit}>submit</button>
      </div>
    );
  }
}

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
