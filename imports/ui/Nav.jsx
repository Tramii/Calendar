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
            <div className="col-md-4">
              <img className="logo" src= 'NoBG.png' />
            </div>
            <div className="col-md-8">
              <ul className="nav navbar-nav navbar-right">
                <li className="login" >
                  <AccountsUIWrapper />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>);
  }
}
