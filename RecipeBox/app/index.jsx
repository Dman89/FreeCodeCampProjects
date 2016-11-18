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

var newItems, newTitle;
var recipeArray = [
  {title: "Tupac", items: ["Love", "Peace", "Chicken Grease"]}, {title: "Biggie", items: ["Heart", "Farts", "Cupcakes"]}, {title: "Kennedy", items: ["Lead", "Scope", "Grass"]}];
var checkForCookies = (typeof localStorage["recipeBookOfSecretIngredients"] != "undefined");
var recipes = checkForCookies ? JSON.parse(localStorage["recipeBookOfSecretIngredients"]) : recipeArray;


var Title = React.createClass({
  getInitialState: function() {
    return {
      openPanel: false,
    }
  },
  togglePanel: function(index, openPanel) {
    let openDOM = document.getElementById("panel"+index)
    if (openPanel === false) {
      for (var x = 0; x < 101; x++) {
        document.getElementById("panel"+index).style.height = x+"px";
      }
      this.setState({openPanel: true,})
    }
    else if (openPanel === true) {
      for (var x = 100; x > -1; x--) {
        document.getElementById("panel"+index).style.height = x+"px";
      }
      this.setState({openPanel: false,})
    }
  },
  render: function() {
    return (
      <div id={"toggle"+this.props.index} onClick={function() {this.togglePanel(this.props.index);}.bind(this)} className="col-xs-12 title">
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
          <Title index={this.props.index} title={this.props.title}/>
          <div id={"panel"+this.props.index} className="panelHide">
            {this.props.items.map(function(item, index) {
              return <Item key={index} item={item}/>
            })}
          </div>
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
  getInitialState: function() {
    return {
      rTitle: this.props.showTitle,
      rItems: this.props.showItems,
    };
  },
  componentDidMount: function() {
    this.setState({
      rItems: this.props.showTitle,
      rItems: this.props.showItems,
    });
  },
  render: function() {
    return (
      <Modal show={this.props.showModal} onHide={function() {this.props.onChangeClosed(-2);}.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title id="title">{this.props.modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup>
            <ControlLabel>Name:</ControlLabel>
            <FormControl
              type="text"
              defaultValue={this.props.showTitle}
              placeholder="Recipe Name"
              id="rTitle"
            />
            <ControlLabel>Ingredients:</ControlLabel>
            <FormControl
              type="text"
              defaultValue={this.props.showItems}
              placeholder="Enter Ingredients,Separated,By Commas"
              id="rItems"
            />
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={function() {this.props.onChangeAdd(this.props.index);}.bind(this)} bsStyle="primary" id="rNew">{this.props.buttonText}</Button>
          <Button onClick={function() {this.props.onChangeClosed(-2);}.bind(this)} bsStyle="primary" id="rExit">Cancel</Button>
        </Modal.Footer>
      </Modal>
    )
  }
})


var Application = React.createClass({
  getInitialState: function() {
    return ({
      recipes: recipes,
      showModal: false,
      modalTitle: "",
      buttonText: "",
      showTitle: "",
      showItems: "",
      editOrNew: false,
      index: -2,
      total: recipes.length,
    })
  },
  updateCookie: function() {
    localStorage.setItem("recipeBookOfSecretIngredients", JSON.stringify(this.state.recipes));
  },
  nowOpen: function(index) {
    if (index >= 0) {
      this.setState({ index: index, showModal: true,
                     newTitle: newTitle,
                     newItems: newItems.join(", "),
                    })
    }
    else {
      this.setState({
        showModal: true,
        index: -1,
       })
    }
  },
  nowClosed: function(index) {
     this.setStateBeforeSave(index);
  },
  deleteRecipe: function(num) {
    var newArr = this.state.recipes.splice(num, 1)
    this.setState({
      recipes: this.state.recipes,
      total: this.state.total - 1,
    })
    this.updateCookie();
  },
  addRecipe: function(aindex) {
    let atotal = aindex == -1 ? this.state.total + 1 : this.state.total;
    let newArr = document.getElementById("rItems").value;
    newArr = newArr.split(", ");
      this.setState({newTitle: document.getElementById("rTitle").value,
            newItems: newArr,
            total: atotal,
          });
    this.setStateBeforeSave(aindex);
  },
  editRecipe: function(index) {
    newItems = this.state.recipes[index].items,
    newTitle = this.state.recipes[index].title,
    this.setState({
                   showModal: true,
                   modalTitle: "Edit Recipe",
                   buttonText: "Save",
                  }),
    this.nowOpen(index);
  },
  setStateBeforeSave: function(index) {
      if (index >= 0) {
        this.state.recipes[index] = {title: this.state.newTitle, items: this.state.newItems.split(", ")}
        this.setState({
              recipes: this.state.recipes,
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
              recipes: this.state.recipes.concat({title: this.state.newTitle, items: this.state.newItems.split(", ")}),
              showModal: false,
          newTitle: "",
          newItems: "",
        })
      }
      this.updateCookie();
    },
  render: function() {
    return (
      <div>
        {this.state.recipes.map(function(recipe, index) {
          return <Recipe onChangeDelete={this.deleteRecipe} key={index} index={index} title={recipe.title} items={recipe.items} onChangeEdit={this.editRecipe} />
        }.bind(this))}
        <AddRecipe onChangeOpen={this.nowOpen}/>
        <NewRecipeModal onChangeAdd={this.addRecipe} showItems={this.state.newItems} showTitle={this.state.newTitle} showModal={this.state.showModal} showModal={this.state.showModal} buttonText={this.state.buttonText} modalTitle={this.state.modalTitle} onChangeClosed={this.nowClosed} index={this.state.index}/>
      </div>
    )
  }
})

module.exports = Application
