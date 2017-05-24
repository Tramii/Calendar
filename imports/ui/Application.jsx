import React, {Component} from "react";
import Nav from './Nav.jsx';
import SideNav from './SideNav.jsx';
import MainContent from './MainContent.jsx';
import Circle from './Circle.jsx';

export default class Application extends React.Component {

    constructor(props) {
      super(props)
      this.state = {
        a:'',
      }
    }
    render() {
      return (
        <div>
      <Nav userImageUrl={this.state.hasUserImage ? this.state.userImageUrl : null} userName={this.props.userName} />
      <SideNav  />
        <div>
      <MainContent  />
        </div>
    </div>)
    }
  }
//Warning: Failed propType: Required prop `heightInPx` was not specified in `Circle`. Check the render method of `Nav`.
