import React, { Component } from 'react';
import './App.css';
import Table from './components/Table.js';
import Controls from './components/Controls.js';
import {socket} from './components/client.js';

class App extends Component {

  constructor() {
    super();
    this.state = {players: [],
                  inGamePlayers: [],
                  waitingPlayers: [],
                  turn: "",
                  dealer: [],
                  result: ""};
  }

  componentDidMount() {

    const that = this;

    socket.on('connect', function() {
      that.setState({id: socket.id});
      console.log(socket.id + " ...Connected!");

      socket.on('game', function(game) {
        console.log(game)
        that.setState(game);
      });
    });

}

  render() {
    return (
      <div className="App">
        <Table id={this.state.id}
               players={this.state.inGamePlayers}
               dealer={this.state.dealer}
               dealerScore={this.state.dealerScore}
               turn={this.state.turn}
               result={this.state.result}/>
        <Controls turn={this.state.turn}
                  id={this.state.id}
                  players={this.state.inGamePlayers}/>
      </div>
    );
  }
}

export default App;
