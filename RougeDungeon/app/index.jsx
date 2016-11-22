import ReactBootstrap from 'react-bootstrap';
import {Panel} from 'react-bootstrap';
import {Accordion} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {ButtonToolbar} from 'react-bootstrap';
import {Modal} from 'react-bootstrap';
import {Input} from 'react-bootstrap';
import {ListGroup} from 'react-bootstrap';
import {ListGroupItem} from 'react-bootstrap';
import {OverlayTrigger} from 'react-bootstrap';
import {FormGroup} from 'react-bootstrap';
import {FormControl} from 'react-bootstrap';
import {ControlLabel} from 'react-bootstrap';
import React from 'react';


var Player = React.createClass({
  render: function() {
    return (
      <div id="player">

      </div>
    )
  }
})

var Tile = React.createClass({
  render: function() {
    return (
    <div className={"tile " + this.props.display} style={{top: this.props.y+'px', left: this.props.x+'px'}} />
    )
  }
})

var Application = React.createClass({
getInitialState: function() {
  return {
    size: 600,
    board: [],
    layout: ['wall', 'open', 'open', 'open', 'open'],
    player: [0, 0],
  }
},
bindKeys: function() {
  document.onkeydown = function(e) {
    let keyCode = e.keyCode;
    switch (keyCode) {
      case 37:
        // Left
      break;
      case 38:
        // Up
      break;
      case 39:
        // Right
      break;
      case 40:
        // Down
      break;
    }
  }
},
returnPlayer: function(x, y) {
  return <Player x={x} y={y} />
},
layMapOut: function() {
  for (var y = 0; y < this.state.size; y += 50) {
    for (var x = 0; x < this.state.size; x += 50) {
      let num = Math.floor(Math.random() * this.state.layout.length);
      this.state.board.push({"x": x, "y": y, "display": this.state.layout[num]})
    }
  }
  this.setState({board: this.state.board})
},
componentWillMount: function() {
  this.bindKeys();
  this.layMapOut();
},
render: function() {
  return (
  <div className="map">
    {this.state.board.map(function(tile, index) {
      return <Tile key={index} y={tile.y} x={tile.x} display={tile.display}/>
    })}
  </div>
  )
}
})

module.exports = Application
