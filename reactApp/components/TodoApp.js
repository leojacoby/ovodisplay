import React from 'react';
import ReactDOM from 'react-dom';
import List from './List.js';
import Input from './Input.js';

import axios from 'axios';
const dbUrl = "http://localhost:3000/db";



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      text: ''
    }
  }
  componentDidMount() {
    axios.get(dbUrl)
      .then((todoItems) => {
        console.log('todoItems passed in', todoItems.data, typeof todoItems.data)
        this.setState({items: todoItems.data});
      })
  }
  handleTyping(e) {
    this.setState({text: e.target.value})
  }
  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      items: this.state.items.concat({
        text: this.state.text,
        completed: false,
        _id: this.state.text + Date.now()
      }),
      text: ''
    }, () => {
      axios.post(dbUrl+'/add', {
        todoItem: this.state.items[this.state.items.length - 1]
      })
      .then((response) => {
        console.log("success posting")
      })
      .catch((error) => {
        console.log("error posting")
      })
    })

  }
  handleRemove(_id) {
    this.state.items.forEach((item, index) => {
      if (item._id === _id) {
        var newItems = this.state.items.slice()
        newItems.splice(index, 1);
        this.setState({items: newItems})
        axios.post(dbUrl+'/remove', {
          _id: _id
        })
      }
    })
  }
  handleCompletion(_id) {
    this.state.items.forEach((item, index) => {
      if (item._id === _id) {
        axios.post(dbUrl+'/complete', {
          _id: _id,
          status: item.completed
        });
        var updatedItem = Object.assign({}, item, {completed: !item.completed})
        var newItems = this.state.items.slice()
        newItems[index] = updatedItem
        this.setState({items: newItems})

      }
    })
  }
  render() {
    return (
      <div>
        <h2>Your List of Shit to Get Done</h2>
        <Input items={this.state.items} text={this.state.text} handleTyping={this.handleTyping.bind(this)} handleSubmit={this.handleSubmit.bind(this)}/>
        <List items={this.state.items} handleRemove={this.handleRemove.bind(this)} handleCompletion={this.handleCompletion.bind(this)}/>
      </div>
    )
  }
}

export default App;
