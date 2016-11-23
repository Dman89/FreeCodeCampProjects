import React from 'react';

const starterState = {
  size: 300,
  board: [],
  layout: ['wall', 'open', 'open', 'open', 'open', 'open', 'open', 'open', 'wall', 'open', 'open', 'enemy'],
  player: [0, 0],
  playerStats: {name: "Rouge", health: 1000, weapon:[{name:"Fists", dmg: 5, quality: true, quantity: true, lifeSteal: 1}], level: 1, exp: [0, 1000], armor: 0, sheild: {protect: 0, name: "None", quality: true,}},
  lastInteraction: {},
  lastInteractionList: [],
  totalEnemies: [],
  level: 0,
  fog: [],
  fogOfWarOn: false,
}
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
      <div className={"tile " + this.props.display + " " + this.props.fog} style={{top: this.props.y+'px', left: this.props.x+'px'}} />
    )
  }
})


var InteractionBoard = React.createClass({
  render: function() {
    if (!this.props.interactionData.name) {
      return (
        <div className="alertDisplay">
        </div>
      )
    }
    else if (this.props.interactionData.GoT == "give") {
      return (<div className="alertDisplay">&gt;&gt;&gt; {this.props.interactionData.name} was damaged for {this.props.interactionData.dmg} HP, you stole {this.props.interactionData.lifeSteal} HP, and {this.props.interactionData.name} now has {this.props.interactionData.health} HP</div>)
    }
    else {
      return (
        <div className="alertDisplay">&gt;&gt;&gt; You have taken damage for {this.props.interactionData.dmg} HP and you now have {this.props.interactionData.health} HP</div>
      )
    }
  }
})
var InteractionDisplay = React.createClass({
  render: function() {
    return (
      <div className="messageboard">
        {this.props.data.map(function(info, index) {
          if (info.GoT == "give") {
            return (<div key={index}>&gt;&gt;&gt; {info.name} was damaged for {info.dmg} HP, you stole {info.lifeSteal} HP, and {info.name} now has {info.health} HP for {info.exp > 1 ? info.exp : 0} exp</div>)
          }
          else {
            return (
              <div key={index}>&gt;&gt;&gt; You were damaged for {info.dmg} HP and you know have {info.health} HP</div>
            )
          }
        })}
      </div>
    )
  }
})
var CommandLine = React.createClass({
  render: function() {
    return (
      <input id="cli" placeholder="Enter Command Here" onChange={this.props.onChangeCheckForCommand}/>
    )
  }
})
var PlayerStats = React.createClass({
  render: function() {
    let newArr = this.props.health - (this.props.health % 1);
    return (
      <div className="playerStats">
        <div>
          Life:<br/>
          {newArr}
        </div>
        <div>
          Char Level:<br/>
          {this.props.charLevel}
        </div>
        <div>
          Exp:<br/>
          {this.props.exp[0]+ " / " +this.props.exp[1]}
        </div>
        <div>
          Dmg:<br/>
          {this.props.dmg}
        </div>
        <div>
          L.S.:<br/>
          {this.props.lifeSteal * 100}%
        </div>
        <div>
          Level:<br/>
          {this.props.level}
        </div>
        <div>
          Enemies:<br/>
          {this.props.enemies}
        </div>
      </div>
    )
  }
})
var Application = React.createClass({
  getInitialState: function() {
    return starterState;
  },
  checkExp: function(min, max) {
    if (min >= max) {
      this.state.playerStats.exp[0] = min - max;
      this.state.playerStats.level += 1;
      this.setState(this.state);
      this.setPlayer();
    }
  },
  startSpawnLadder: function() {
    let runArray = [[25,25], [275, 25], [275, 275], [25, 275], [150, 150]]
    for (var b = 0; b < runArray.length; b++) {
      this.spawnLadder(runArray[b][0],runArray[b][1])
    }
  },
  spawnLadder: function(x, y) {
    for (var z = 0; z < this.state.board.length; z++) {
      let objCheck = this.state.board[z];
      if (x == objCheck.x && y == objCheck.y) {
        this.state.board[z] = {"x": x, "y": y, "display": "ladder", "health": false, "name": false, "dmg": false,}

        this.setState({board: this.state.board})

        return;
      }
    }
  },
  checkTile: function(x, y, multi, cb) {
    for (var a = 0; a < this.state.board.length; a++) {
      if (this.state.board[a].x == x) {
        if (this.state.board[a].y == y) {
          if (this.state.board[a].display === 'open') {
            this.returnPlayer(x,y);
          }
          else if (this.state.board[a].display === 'enemy') {
            let dmg = this.state.playerStats.weapon[0].dmg * multi;
            let GoT = "give";
            let lifeSteal = this.state.playerStats.weapon[0].lifeSteal >= 0 ? this.state.playerStats.weapon[0].lifeSteal * dmg : 0;
            this.state.playerStats.health += lifeSteal;
            let exp = 0;
            if (this.state.board[a].health > 0) {
              this.state.board[a].health -= dmg;
                this.state.board[a].health = this.state.board[a].health - (this.state.board[a].health % 1);
              if (this.state.board[a].health <= 0) {
                this.state.board[a].display = "open";
                this.state.playerStats.exp[0] += this.state.board[a].exp;
                this.returnPlayer(x,y);
                this.checkExp(this.state.playerStats.exp[0], this.state.playerStats.exp[1]);
                this.state.totalEnemies -= 1;
                if (this.state.totalEnemies == 0) {
                  this.startSpawnLadder();
                }
              }
              let lastInteract = {"name":this.state.board[a].name, "health":this.state.board[a].health, "dmg": dmg, "GoT": GoT, "lifeSteal": lifeSteal, "exp": exp};
              this.setState({board: this.state.board, lastInteraction: lastInteract, totalEnemies: this.state.totalEnemies, playerStats: this.state.playerStats,});
              this.interactionDisplay(lastInteract);
              cb(multi + 2);
            }
          }
          else if (this.state.board[a].display == "ladder") {
            this.hardReset();
            this.layMapOut();
            this.state.playerStats.health += 1000;
            this.setState({playerStats: this.state.playerStats,})
          }
        }
      }
    }
    this.autoAttack();
  },
  printInteractionTakeDmg: function(tile, dmg) {
    let GoT = "take";
    let lastInteract = {"name":this.state.playerStats.name, "health":this.state.playerStats.health, "dmg": dmg, "GoT": GoT,};
    this.setState({lastInteraction: lastInteract});
    this.interactionDisplay(lastInteract);
  },
  bindKeys: function() {
    let that = this;
    document.onkeydown = function(e) {
      let keyCode = e.keyCode;
      switch (keyCode) {
        case 37:
          // Left
          that.checkTile(that.state.player[0]-25,that.state.player[1], multi, function(newMulti) {
              multi = newMulti
          });
        break;
        case 38:
          // Up
          that.checkTile(that.state.player[0],that.state.player[1]-25, multi, function(newMulti) {
              multi = newMulti
          });
        break;
        case 39:
          // Right
          that.checkTile(that.state.player[0]+25,that.state.player[1], multi, function(newMulti) {
              multi = newMulti
          });
        break;
        case 40:
          // Down
          that.checkTile(that.state.player[0],that.state.player[1]+25, multi, function(newMulti) {
              multi = newMulti
          });
        break;
      }
    }
  },
  returnPlayer: function(x, y) {
    this.setState({
      player: [x,y],
    })
    this.compareCoord(x, y, this.state.board, this.state.fogOfWarOn, function() {

    })
  },
  interactionDisplay: function(item) {
    this.state.lastInteractionList.unshift(item)
    if (this.state.lastInteractionList.length >= 5) {
      this.state.lastInteractionList.splice(5, 1)
    }
    this.setState({lastInteractionList: this.state.lastInteractionList})
  },
  hardReset: function() {
    return this.setState({board: []})
  },
  layMapOut: function() {
    this.state.level += 1;
    let counterForEnemies = 0;
    for (var y = 0; y < this.state.size; y += 25) {
      for (var x = 0; x < this.state.size; x += 25) {
        let num = Math.floor(Math.random() * this.state.layout.length);
        let health = this.state.layout[num] == "enemy" ? 100 * (this.state.level * 1.15) : "False";
        let name = this.state.layout[num] == "enemy" ? "Sideshow BoB" : "False";
        let dmg = this.state.layout[num] == "enemy" ? Math.floor((Math.random() * 20) + 20) * (this.state.level * 1.35) : "False";
        let fog = this.state.fogOfWarOn == true ? "blackOut" : "clear";
        let exp = this.state.layout[num] == "enemy" ? 100 * this.state.level : "false";
        this.state.board.push({"x": x, "y": y, "display": this.state.layout[num], "health": health, "name": name, "dmg": dmg, "fog": fog, "exp": exp})
        if (this.state.layout[num] == "enemy") {
          counterForEnemies += 1;
        }
      }
    }
    this.setState({board: this.state.board, totalEnemies: counterForEnemies, level: this.state.level,})
  },
  autoAttack: function() {
    for (var x = 0; x < this.state.board.length; x++) {
      if (this.state.board[x].display == "enemy") {
        let xAxis = this.state.board[x].x;
        let yAxis = this.state.board[x].y;
        let checkXAxis = this.state.player[0];
        let checkYAxis = this.state.player[1];
        let numOne = 0
        if (checkYAxis == yAxis && xAxis == checkXAxis - 25) {
          this.state.playerStats.health -= this.state.board[x].dmg - (this.state.board[x].dmg % 1);
          this.printInteractionTakeDmg(this.state.playerStats);
        }
        if (checkYAxis == yAxis && xAxis == checkXAxis + 25) {
          this.state.playerStats.health -= this.state.board[x].dmg - (this.state.board[x].dmg % 1);
          this.printInteractionTakeDmg(this.state.playerStats);
        }
        if (checkXAxis == xAxis && yAxis == checkYAxis - 25) {
          this.state.playerStats.health -= this.state.board[x].dmg - (this.state.board[x].dmg % 1);
          this.printInteractionTakeDmg(this.state.playerStats);
        }
        if (checkXAxis == xAxis && yAxis == checkYAxis + 25) {
          this.state.playerStats.health -= this.state.board[x].dmg - (this.state.board[x].dmg % 1);
          this.printInteractionTakeDmg(this.state.playerStats);
        }
        this.setState({playerStats: this.state.playerStats})
        if (this.state.playerStats.health <= 0) {
          this.death();
        }
      }
    }
  },
  checkForCommand: function() {
    let valueCheck = document.getElementById("cli").value;
    if (valueCheck.length >= 0) {
      if (valueCheck === "Kill") {
        this.killAllEnimies();
        this.startSpawnLadder();
        document.getElementById("cli").value = "";
      }
      if (valueCheck === "Fog") {
        let fog = this.state.fogOfWarOn == true ? false : true;
        this.setState({fogOfWarOn: fog})
        this.compareCoord(this.state.player[0], this.state.player[1], this.state.board, this.state.fogOfWarOn, function(){});
        document.getElementById("cli").value = "";
      }
      if (valueCheck === "Stuck") {
        this.startSpawnLadder();
        document.getElementById("cli").value = "";
      }
    }
  },
  killAllEnimies: function() {
    for (var x = 0; x < this.state.board.length; x++) {
      let checkVar = this.state.board[x].display;
      if (checkVar === "enemy") {
        this.state.board[x].display = "open";
      }
    }
    this.setState({board: this.state.board, totalEnemies: 0,})
  },
  compareCoord: function(x, y, board, fog, cb) {
    if (fog == true) {
      for (var a = 0; a < board.length; a++) {
        this.checkCoord(board[a].x, board[a].y, a, function() {
          cb();
        })

      }
    }
    else {
      for (var a = 0; a < board.length; a++) {
        this.state.board[a].fog = "clear";

      }
      this.setState({board: this.state.board,})
    }
  },
  checkCoord: function(x, y, index, cb) {
    let playerPos = this.state.player;
    if (x == playerPos[0] && y >= (playerPos[1] - 50) && y <= (playerPos[1] + 50)) {
      this.state.board[index].fog = "clear";
      this.setState({board: this.state.board,})
    }
    else if (y == playerPos[1] && x >= (playerPos[0] - 50) && x <= (playerPos[0] + 50)) {
      this.state.board[index].fog = "clear";
      this.setState({board: this.state.board,})
    }
    else if (y == playerPos[1] + 25 && x >= (playerPos[0] - 25) && x <= (playerPos[0] + 25)) {
      this.state.board[index].fog = "clear";
      this.setState({board: this.state.board,})
    }
    else if (y == playerPos[1] - 25 && x >= (playerPos[0] - 25) && x <= (playerPos[0] + 25)) {
      this.state.board[index].fog = "clear";
      this.setState({board: this.state.board,})
    }
    else {
      this.state.board[index].fog = "blackOut";
      this.setState({board: this.state.board,})
    }
    cb();

  },
  death: function() {
    this.setState(starterState)
    this.layMapOut();
    this.returnPlayer(0,0);
  },
  setPlayer: function () {
    this.state.playerStats.weapon[0].dmg= 5 * (this.state.playerStats.level * 1.25);
    this.state.playerStats.exp[1] = 1000 * this.state.playerStats.level;
    this.setState({
      playerStats: this.state.playerStats,
    })
  },
  componentWillMount: function() {
    this.setPlayer();
    this.bindKeys();
    this.layMapOut();
    this.returnPlayer(0,0);
  },
  render: function() {
    return (
      <div>
        <div className="map">
          {this.state.board.map(function(tile, index) {
            return <Tile key={index} y={tile.y} x={tile.x} display={tile.display} fog={tile.fog}/>
          })}
          <Player x={this.state.player[0]} y={this.state.player[1]} />
        </div>
        <PlayerStats health={this.state.playerStats.health} dmg={this.state.playerStats.weapon[0].dmg}  charLevel={this.state.playerStats.level} exp={this.state.playerStats.exp}  lifeSteal={this.state.playerStats.weapon[0].lifeSteal} level={this.state.level} enemies={this.state.totalEnemies}/>
        <CommandLine onChangeCheckForCommand={this.checkForCommand} />
        <InteractionBoard interactionData={this.state.lastInteraction}/>
        <InteractionDisplay data={this.state.lastInteractionList}/>
      </div>
    )
  }
})

module.exports = Application
