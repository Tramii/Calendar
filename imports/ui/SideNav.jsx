import React, {Component} from "react";

export default class SideNav extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
    return (
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
    );
  }
}
