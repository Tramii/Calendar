import React, {Component} from "react";
import {Well, Thumbnail, Button} from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';

export default class Landing extends React.Component {

  render(){
    return(
      <div>
        <div className="row">
          <h2 className="bod gray">Welcome to</h2>
          <img src="FullLogo.PNG"/>
        </div>
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <div className="row">
            <div className="col-md-4">
              <br/>
              <i className="fa fa-clock-o fa-3x" aria-hidden="true"></i>
            </div>
            <div className="col-md-8">
              <h2 className="bod gray">Running out of <strong>time</strong>?</h2>
            </div>
          </div>
          <br/>
          <div className="row">
            <div className="col-md-8">
              <h2 className="bod gray"><strong> Tasks</strong> keep piling up?</h2>
            </div>
            <div className="col-md-4">
              <br/>
              <i className="fa fa-tasks fa-3x" aria-hidden="true"></i>
            </div>
          </div>
          <br/>
          <div className="row">
            <div className="col-md-4">
              <br/>
              <i className="fa fa-list-ol fa-3x" aria-hidden="true"></i>
            </div>
            <div className="col-md-8">
              <h2 className="bod gray"> Don't know where to <strong>begin</strong>?</h2>
            </div>
          </div>
          <br/>
          <div className="row">
            <h1 className="head blue"><strong>Plan ahead with TaskAllocator</strong></h1>
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>
    );
  }
}
