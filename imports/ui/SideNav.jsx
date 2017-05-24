import React, {Component} from "react";

export default class SideNav extends React.Component {
  constructor(props) {
    super(props)
  }

  getSideBar() {
    return (<div style={{width:'30%'}}>
        <div id="sidebar-wrapper">
          <ul className="sidebar-nav">
            <li>
              <p>Holaa</p>
            </li>
            <li>
              <p> heyy</p>
            </li>
          </ul>
        </div>
      </div>)
  }
  render() {
    return (

      <div style={{overflow:''}} id="wrapper">
        {this.getSideBar()}
      </div>
    );
  }
}
