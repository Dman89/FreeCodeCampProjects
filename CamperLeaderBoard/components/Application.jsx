import React from 'react';

var Header = React.createClass({
  render: function() {
   return (
       <div className="header row">
            <div className="title col-xs-12 col-sm-4 text-center">
              Top 100 - Month
            </div>
            <div className="button col-xs-6 col-sm-4 text-right">
              <button className="btn btn-top" onClick={function() {this.props.onChangeRecent();}.bind(this)}>30 Days</button>
            </div>
            <div className="button col-xs-6 col-sm-4 text-left">
              <button className="btn btn-top" onClick={function() {this.props.onChangeAll();}.bind(this)}>All Time</button>
            </div>
          </div>
   )
  }
})
var Guide = React.createClass({
  render: function() {
   return (
          <div className="guide row">
            <div className="number col-xs-6 col-sm-2 text-center">
              #
            </div>
            <div className="name col-xs-6 col-sm-4">
              Name
            </div>
            <div className="score col-xs-6 col-sm-3">
              30 Day
            </div>
            <div className="score col-xs-6 col-sm-3">
              All Time
            </div>
          </div>
   )
  }
})
var Player = React.createClass({
  render: function() {
   return (
          <div className="player row">
            <div className="number col-xs-6 col-sm-2 text-center">
              {this.props.number}
            </div>
            <div className="name col-xs-6 col-sm-4">
              {this.props.name}
            </div>
            <div className="score col-xs-6 col-sm-3">
              {this.props.recent}
            </div>
            <div className="score col-xs-6 col-sm-3">
              {this.props.all}
            </div>
          </div>
   )
  }
})
var Application = React.createClass({
  getInitialState: function() {
    return {
      player: [{username:"Loading", alltime:"...", recent:"...", img: "image"}],
      url: ["https://fcctop100.herokuapp.com/api/fccusers/top/recent", "https://fcctop100.herokuapp.com/api/fccusers/top/alltime"],
      playerAll: [],
      playerRecent: [],
    }
  },
  componentDidMount: function() {
    $.ajax({url: this.state.url[1], success: function(data) {
      this.setState({
        playerAll: data,
      })
    }.bind(this)})
    $.ajax({url: this.state.url[0], success: function(data) {
      this.setState({
        player: data,
        playerRecent: data,
      })
    }.bind(this)})

  },
  recent: function() {
    this.setState({
        player: this.state.playerRecent,
      })
  },
  alltime: function() {
    console.log(this.state.playerAll)
    this.setState({
        player: this.state.playerAll,
      })
  },
  render: function() {
   return (
     <div>
       <Header onChangeAll={this.alltime} onChangeRecent={this.recent}/>
       <Guide/>
       {this.state.player.map(function(player, index) {
         return <Player key={index} number={index + 1} all={player.alltime} img={player.img} recent={player.recent} name={player.username}/>
       })}
     </div>
   )
  }
})
module.exports = Application;
