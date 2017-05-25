import React, {Component} from "react";
import AccountsUIWrapper from './AccountsUIWrapper';

export default class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDropdown: false
    }
  }
  render() {
    return (
      <div className="navigbar head" >
         <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="nav-things"> 
            <img className="logo" src= 'NoBG.png' />
            <ul className="nav navbar-nav navbar-right">
              <li className="login" >
                <AccountsUIWrapper />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>);
  }
}
