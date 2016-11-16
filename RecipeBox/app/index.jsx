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
import React from 'react';



var Title = React.createClass({
  render: function() {
    return (
      <div className="col-xs-12 title">
        <h2 className="title">{this.props.title}</h2>
      </div>
    )
  }
})

var Item = React.createClass({
  render: function() {
    return (
      <div className="col-xs-12 items">
        <div className="item">
          {this.props.item}
        </div>
      </div>
    )
  }
})

var AddRecipe = React.createClass({
  render: function() {
    return (
      <div className="newItem text-center">
            <button onClick={function() {this.props.onChangeAdd();}.bind(this)}>Add Recipe</button>
      </div>
    )
  }
})
var EditRecipe = React.createClass({
  render: function() {
    return (
      <div className="button col-xs-6 text-center">
            <button>Edit</button>
      </div>
    )
  }
})



var Recipe = React.createClass({
  render: function() {
    return (
      <div className="row">
        <Title title={this.props.title}/>
        {this.props.items.map(function(item, index) {
          return <Item key={index} item={item}/>
        })}
        <EditRecipe/>
        <DeleteRecipe index={this.props.index} onChangeDelete={this.props.onChangeDelete}/>
      </div>
    )
  }
})

var DeleteRecipe = React.createClass({
  render: function() {
    return (
      <div className="button col-xs-6 text-center">
            <button onClick={function() {this.props.onChangeDelete(this.props.index)}.bind(this)}>Delete</button>
      </div>
    )
  }
})


var Application = React.createClass({
  getInitialState: function() {
    return ({
      recipes: [{title: "Tupac", items: ["Love", "Peace", "Chicken Grease"]}, {title: "Biggie", items: ["Heart", "Farts", "Cupcakes"]}, {title: "Kennedy", items: ["Lead", "Scope", "Grass"]}]
    })
  },
  deleteRecipe: function(num) {
    var newArr = this.state.recipes.splice(num, 1)
    this.setState(this.state)
  },
  addRecipe: function() {
    this.setState({
      recipes: this.state.recipes.concat({title: "New Item", items: ["Love", "Peace", "Chicken Grease"]}),
    })
  },
  render: function() {
    var recipeRender = this.state.recipes.map(function(recipe, index) {
          return <Recipe onChangeDelete={this.deleteRecipe} key={index} index={index} title={recipe.title} items={recipe.items} />
        }.bind(this))

    return (
      <div>
        {recipeRender}
        <AddRecipe onChangeAdd={this.addRecipe}/>
      </div>
    )
  }
})

module.exports = Application
