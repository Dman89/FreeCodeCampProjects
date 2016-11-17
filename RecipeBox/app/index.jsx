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

var newItems, newTitle;



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
            <button onClick={function() {this.props.onChangeOpen(-1);}.bind(this)}>Add Recipe</button>
      </div>
    )
  }
})
var EditRecipe = React.createClass({
  render: function() {
    return (
      <div className="button col-xs-6 text-center">
            <button onClick={function() {this.props.onChangeEdit(this.props.index)}.bind(this)}>Edit</button>
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
        <EditRecipe index={this.props.index} onChangeEdit={this.props.onChangeEdit}/>
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
var NewRecipeModal = React.createClass({
  inputChange: function(data) {
    this.setState({newTitle: document.getElementById("rTitle").val,
                   newItems: document.getElementById("rItems").val})
  },
  render: function() {
    return (
      <Modal show={this.props.showModal} onHide={function() {this.props.onChangeClosed(-2);}.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title id="title">{this.props.modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body closeButton>
          <form>
            <Input
              type="text"
              onChange={function() {
                this.inputChange("title")
              }.bind(this)}
              value={this.props.showTitle}
              label="Name"
              placeholder="Recipe Name"
              id="rTitle"/>
            <Input type="text" value={this.props.showItems} label="Ingredients" placeholder="Enter Ingredients,Separated,By Commas" id="rItems"/>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={function() {this.props.onChangeAdd(this.state.index);}.bind(this)} bsStyle="primary" id="rNew">{this.props.buttonText}</Button>
          <Button onClick={function() {this.props.onChangeClosed(-2);}.bind(this)} bsStyle="primary" id="rExit">Cancel</Button>
        </Modal.Footer>
      </Modal>
    )
  }
})


var Application = React.createClass({
  getInitialState: function() {
    return ({
      recipes: [{title: "Tupac", items: ["Love", "Peace", "Chicken Grease"]}, {title: "Biggie", items: ["Heart", "Farts", "Cupcakes"]}, {title: "Kennedy", items: ["Lead", "Scope", "Grass"]}],
      showModal: false,
      modalTitle: "",
      buttonText: "",
      editOrNew: false,
      index: -2,
    })
  },
  nowOpen: function(index) {
    if (index >= 0) {
      this.setState({ index: index, showModal: true,
                     newTitle: newTitle,
                     newItems: newItems.join(", "),
                    })
    }
    else {
      this.setState({ showModal: true })
    }
  },
  nowClosed: function(index) {
    if (index < 0) {
     this.setStateBeforeSave(index);
    }
    else {
     this.setStateBeforeSave(index);
    }
  },
  deleteRecipe: function(num) {
    var newArr = this.state.recipes.splice(num, 1)
    this.setState(this.state)
  },
  addRecipe: function() {
      this.setState({newTitle: document.getElementById("rTitle").value,
      newItems: document.getElementById("rItems").value.split(", "),})
    this.setStateBeforeSave(-1);
  },
  editRecipe: function(index) {
    newItems = this.state.recipes[index].items
    newTitle = this.state.recipes[index].title
    this.setState({
                   showModal: true,
                   modalTitle: "Edit Recipe",
                   buttonText: "Save",
                  }),
    this.nowOpen(index);
  },
  setStateBeforeSave: function(index) {
      if (index >= 0) {
        var newRecipes = this.state.recipes[index] = ({title: this.state.newTitle, items: this.state.newItems})
        this.setState({
              recipes: newRecipes,
              showModal: false,
          newTitle: "",
          newItems: "",
        })
      }
    else if (index == -2) {
      this.setState({
          showModal: false,
          newTitle: "",
          newItems: "",
        })
    }
    else {
        this.setState({
              recipes: this.state.recipes.concat({title: this.state.newTitle, items: this.state.newItems}),
              showModal: false,
          newTitle: "",
          newItems: "",
        })
      }
    },
  render: function() {
    return (
      <div>
        {this.state.recipes.map(function(recipe, index) {
          return <Recipe onChangeDelete={this.deleteRecipe} key={index} index={index} title={recipe.title} items={recipe.items} onChangeEdit={this.editRecipe} />
        }.bind(this))}
        <AddRecipe onChangeOpen={this.nowOpen}/>
        <NewRecipeModal onChangeAdd={this.addRecipe} showItems={this.state.newItems} showTitle={this.state.newTitle} showModal={this.state.showModal} showModal={this.state.showModal} buttonText={this.state.buttonText} modalTitle={this.state.modalTitle} onChangeClosed={this.nowClosed}/>
      </div>
    )
  }
})

module.exports = Application
