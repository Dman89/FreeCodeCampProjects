import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from "../actions";

class UserList extends Component {
  componentWillMount() {
    this.props.fetchUsers();
  }
  userRender(u) {
    return (
      <div className="card card-block userRender">
        <h4 className="card-title">{u.name}</h4>
        <p className="card-text">Factory</p>
        <a className="btn btn-primary">Email</a>
      </div>
    );
  }
  render() {
    return (
      <div className="UserList">
        {this.props.users.map(this.userRender)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { users: state.users };
}

export default connect(mapStateToProps, actions)(UserList);
