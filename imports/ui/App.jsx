import React, {Component} from "react";
import {PropTypes} from "prop-types";
import { Meteor } from "meteor/meteor";

export  default class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log("render!");
    //const tweets = this.props.tweets;

    return (
      <div>
        <div>hola</div>

      </div>
    );
  }
}
