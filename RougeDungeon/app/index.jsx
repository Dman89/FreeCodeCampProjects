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


var InteractionBoard = React.createClass({
  render: function() {
    if (!this.props.interactionData.name) {
      return (
        <div>
        </div>
      )
    }
    else if (this.props.interactionData.GoT == "give") {
      return (<div>{this.props.interactionData.name} was damaged for {this.props.interactionData.dmg}HP and now has {this.props.interactionData.health}HP</div>)
    }
    else {
      return (
        <div>{this.props.interactionData.name} damaged you for {this.props.interactionData.dmg}HP and you know have blankHP</div>
      )
    }
  }
})
var InteractionDisplay = React.createClass({
  render: function() {
    return (
      <div className="messageboard">
        {this.props.data.map(function(info) {
          if (info.GoT == "give") {
            return (<div>{info.name} was damaged for {info.dmg}HP and now has {info.health}HP</div>)
          }
          else {
            return (
              <div>{info.name} damaged you for {info.dmg}HP and you know have blankHP</div>
            )
          }
        })}
      </div>
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
      playerStats: {health: 1000, weapon:[{name:"Fists", dmg: 5, quality: true, quantity: true}], armor: 0, sheild: {protect: 0, name: "None", quality}}
      lastInteraction: {},
      lastInteractionList: [],
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
              this.interactionDisplay(lastInteract);
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
  interactionDisplay: function(item) {
    this.state.lastInteractionList.unshift(item)
    this.setState({lastInteractionList: this.state.lastInteractionList})
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
      <div>
        <div className="map">
          {this.state.board.map(function(tile, index) {
            return <Tile key={index} y={tile.y} x={tile.x} display={tile.display}/>
          })}
          <Player x={this.state.player[0]} y={this.state.player[1]} />
        </div>
        <InteractionBoard interactionData={this.state.lastInteraction}/>
        <InteractionDisplay data={this.state.lastInteractionList}/>
      </div>
    )
  }
})

module.exports = Application
