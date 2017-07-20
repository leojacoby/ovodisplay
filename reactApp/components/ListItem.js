import React from 'react';
import ReactDOM from 'react-dom';

class ListItem extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <li>
        <button style={{ marginRight: "1em" }} _id={this.props._id} onClick={(e) => this.props.handleRemove(this.props._id)}>X</button>
        <button style={{ marginRight: "1em" }} _id={this.props._id} onClick={(e) => this.props.handleCompletion(this.props._id)}>✓</button>
        {this.props.completed ? <strike>{this.props.item}</strike> : this.props.item}
      </li>
    )
  }
}

export default ListItem;
