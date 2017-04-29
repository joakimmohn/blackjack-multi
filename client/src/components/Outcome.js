import React, { Component } from 'react';
import './Outcome.css';

function Outcome(props) {

  return(
    <strong style={{"color": "#184702"}}>
      {props.result}
    </strong>
  )
}

export default Outcome;
