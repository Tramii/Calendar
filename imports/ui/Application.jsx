import React, {Component} from "react";
import Nav from './Nav.jsx';
import SideNav from './SideNav.jsx';
import MainContent from './MainContent.jsx';

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
      <Nav />
      <SideNav />
        <div>
      <MainContent />
        </div>
    </div>)
    }
  }
