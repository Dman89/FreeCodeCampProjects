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
      <div id="player" style={{top: this.props.y+'px', left: this.props.x+'px'}}>

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
    layout: ['wall', 'open', 'open', 'open', 'open', 'open', 'open', 'open', 'wall', 'open', 'open', 'enemy'],
    player: [0, 0],
    lastInteraction: {},
  }
},
checkTile: function(x, y) {
  for (var a = 0; a < this.state.board.length; a++) {
    if (this.state.board[a].x == x) {
      if (this.state.board[a].y == y) {
        if (this.state.board[a].display === 'open') {
          this.returnPlayer(x,y)
        }
        else if (this.state.board[a].display === 'enemy') {
          let dmg = 20;
          let GoT = "give";
          if (this.state.board[a].health > 0) {
            this.state.board[a].health -= dmg;
            if (this.state.board[a].health <= 0) {
              this.state.board[a].display = "open";
            }
            let lastInteract = {"name":this.state.board[a].name, "health":this.state.board[a].health, "dmg": dmg, "GoT": GoT,}
            this.setState({board: this.state.board, lastInteraction: lastInteract})
            this.interactionDisplay();
          }
        }
      }
    }
  }
},
bindKeys: function() {
  let that = this;
  document.onkeydown = function(e) {
    let keyCode = e.keyCode;
    switch (keyCode) {
      case 37:
        // Left
        that.checkTile(that.state.player[0]-50,that.state.player[1]);
      break;
      case 38:
        // Up
        that.checkTile(that.state.player[0],that.state.player[1]-50);
      break;
      case 39:
        // Right
        that.checkTile(that.state.player[0]+50,that.state.player[1]);
      break;
      case 40:
        // Down
        that.checkTile(that.state.player[0],that.state.player[1]+50);
      break;
    }
  }
},
returnPlayer: function(x, y) {
  this.setState({
    player: [x,y],
  })
},
interactionDisplay: function() {
  console.log(this.state.lastInteraction)
},
layMapOut: function() {
  for (var y = 0; y < this.state.size; y += 50) {
    for (var x = 0; x < this.state.size; x += 50) {
      let num = Math.floor(Math.random() * this.state.layout.length);
      let health = this.state.layout[num] == "enemy" ? 100 : "False";
      let name = this.state.layout[num] == "enemy" ? "Sideshow BoB" : "False";
      this.state.board.push({"x": x, "y": y, "display": this.state.layout[num], "health": health, "name": name,})
    }
  }
  this.setState({board: this.state.board})
},
componentWillMount: function() {
  this.bindKeys();
  this.layMapOut();
  this.returnPlayer(50,50);
},
render: function() {
  return (
  <div className="map">
    {this.state.board.map(function(tile, index) {
      return <Tile key={index} y={tile.y} x={tile.x} display={tile.display}/>
    })}
    <Player x={this.state.player[0]} y={this.state.player[1]} />
  </div>
  )
}
})

module.exports = Application
