import React, {Component} from "react";
import {Well, Thumbnail, Button} from 'react-bootstrap';
import Calendar from './Calendar.jsx';
import Landing from './Landing.jsx';
import { createContainer } from 'meteor/react-meteor-data';

class MainContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hola: '',
    }
  }

render() {
    return (
      <div className="main">
        <div className="col-md-3"></div>
        <div className="col-md-9">
          {this.props.nowUser?
          <Calendar />
          :
          <Landing />
        }
        </div>
      </div>
      )
  }
}
export default createContainer(() => {
  return { nowUser: Meteor.user() };
}, MainContent);
