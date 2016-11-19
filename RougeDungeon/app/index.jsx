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

var Tile = React.createClass({
render: function() {
console.log(1)
  return (
      <div className={this.props.display} ></div>
    )
  }
})

var Map = React.createClass({
  render: function() {
   console.log(1)
    return (
    <div className="tile" style="top: {this.props.y+'px'}; left: {this.props.x+'px'}">
      <Tile x={this.props.x} y={this.props.y} display={this.props.display}/>
    </div>
    )
  }
})

var Application = React.createClass({
getInitialState: function() {
  return {
    size: 600,
    amap: [],
    layout: ['wall', 'open', 'open', 'open', 'open']
  }
},
componentWillMount: function() {
  for (var y = 0; y < this.state.size; y += 50) {
    for (var x = 0; x < this.state.size; x += 50) {
      let num = Math.floor(Math.random() * this.state.layout.length);
      this.state.amap.push({"x": x, "y": y, "display": this.state.layout[num]})
    }
  }
  this.setState({amap: this.state.amap})
},
render: function() {
  return (
  <div className="map">
    {this.state.amap.map(function(tile) {
      <Map y={tile.y} x={tile.x} display={tile.display}/>
    })}
  </div>
  )
}
})

module.exports = Application
