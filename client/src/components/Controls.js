import React from 'react';
import './Controls.css';
import { socket } from './client.js';

function Controls(props){

  function dealMeIn(e) {
    socket.emit('deal');
  }

  function hit(e) {
    socket.emit('hit');
  }

  function stand(e) {
    socket.emit('stand');
  }

  const isSeated = props.players.some((player) => player.id === props.id);

  if(isSeated) {
  return (
    <div style={{"display": "flex",
                 "marginTop": "15px",
                 "justifyContent": "center"}}>
      <button onClick={hit} className="btn btn-lg btn-success mr-1"> hit </button>
      <button onClick={stand} className="btn btn-lg btn-danger ml-1"> stand </button>
    </div>
  );
  } else {
    return (
      <div style={{"display": "flex",
                   "marginTop": "15px",
                   "justifyContent": "center"}}>
        <button onClick={dealMeIn} className="btn btn-lg btn-primary"> deal me in </button>
      </div>
    );
  }
}

export default Controls;
