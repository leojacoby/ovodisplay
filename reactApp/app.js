import React from 'react';
import ReactDOM from 'react-dom';

var dummyData = [
  "Go to the store",
  "Win a World Series",
  "Get married",
  "Finish Horizons",
  "Lead a Betsy Devos group riot",
  "Blackmail Kamran with his girlfriend's photo"
]

// Application
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      text: ''
    }
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
        id: this.state.text + Date.now()
      }),
      text: ''
    })
  }
  handleCompletion(e, id) {
    console.log('in handleCompletion function')
    this.state.items.forEach((item, index) => {
      console.log('looping...')
      if (item.id === id) {
        console.log('found it')
        var updatedItem = Object.assign({}, item, {completed: !item.completed})
        var newItems = this.state.items.slice()
        newItems[index] = updatedItem
        console.log(newItems[1])
        this.setState({items: newItems})
      }
    })
  }
  render() {
    console.log('rendering...')
    return (
      <div>
        <h2>Your List of Shit to Get Done</h2>
        <Input items={this.state.items} text={this.state.text} handleTyping={this.handleTyping.bind(this)} handleSubmit={this.handleSubmit.bind(this)}/>
        <List items={this.state.items} handleCompletion={this.handleCompletion.bind(this)}/>
      </div>
    )
  }
}

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

class List extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <ul>
        {this.props.items.map(item => {
          return <ListItem
            key={item.id}
            id={item.id}
            item={item.text}
            completed={item.completed}
            handleCompletion={this.props.handleCompletion}
          />
        })}
      </ul>
    )
  }
}

class ListItem extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <li>
        <button style={{ marginRight: "1em" }} id={this.props.id} onClick={(e) => this.props.handleCompletion(e, this.props.id)}>✓</button>
        {this.props.completed ? <strike>{this.props.item}</strike> : this.props.item}
      </li>
    )
  }
}

ReactDOM.render(<App/>,
    document.getElementById('root'))
