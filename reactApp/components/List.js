import React from 'react';
import ReactDOM from 'react-dom';
import ListItem from './ListItem.js'

class List extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <ul>
        {this.props.items.map(item => {
          return <ListItem
            key={item._id}
            _id={item._id}
            item={item.text}
            completed={item.completed}
            handleRemove={this.props.handleRemove}
            handleCompletion={this.props.handleCompletion}
          />
        })}
      </ul>
    )
  }
}

export default List;
