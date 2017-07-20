import React from 'react';
import ReactDOM from 'react-dom';

class Input extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <form onSubmit={(e) => this.props.handleSubmit(e)}>
        <input type="text" placeholder="New Item" value={this.props.text} onChange={(e) => this.props.handleTyping(e)}/>
        <input type="submit" value="Create Todo Item" />
      </form>
    )
  }
}

export default Input;
