import React, { Component } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
import ChatList from './ChatList';
import ChatBox from './ChatBox';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      username: '',
      chats: []
    };
  }

  componentDidMount() {
    const username = window.prompt('Username: ', 'Anonymous');
    this.setState({ username });
    const pusher = new Pusher('5ce01ba62feee7d08f63', {
      cluster: 'ap2',
      encrypted: true
    });
    const channel = pusher.subscribe('chat');
    console.log('sathish kumar s',channel);
    channel.bind('message', data => {
      this.setState({ chats: [...this.state.chats, data], test: '' });
    });
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleTextChange(e) {
    if (e.keyCode === 13) {
      const payload = {
        username: this.state.username,
        message: this.state.text
      };
      axios.defaults.headers.common['Authorization'] = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vd3d3LmRldi53aGl0ZS1sb3R1cy5jb20vYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE1NDk4OTAwMjcsImV4cCI6NzU0OTg5MDAyNywibmJmIjoxNTQ5ODkwMDI3LCJqdGkiOiJWUG1RRThCemsyM3NSMDRvIiwic3ViIjoyNTg4MDEsImluIjoiODlmYzliYWFlMDJkZmIyMGM3ZTY4NWNhNDAxYzgzNzdiOWI0YmI3NWRiY2Y2NDBmNmJkMGI1YzMzYzk1ZTAwNCJ9.1oANX0WroAWBj21ymiP2sNEzH_07h3iAHq80KGN9cjU';
      axios.post('www.dev.testapi.com/message', payload);
    } else {
      this.setState({ text: e.target.value });
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Chatting App</h1>
        </header>
        <section>
          <ChatList chats={this.state.chats} />
          <ChatBox
            text={this.state.text}
            username={this.state.username}
            handleTextChange={this.handleTextChange}
          />
        </section>
      </div>
    );
  }
}

export default App;
