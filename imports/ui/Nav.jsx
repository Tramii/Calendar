import React, {Component} from "react";
import Circle from './Circle.jsx';

export default class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDropdown: false
    }
  }
  render() {
    return (<div style={{overflow:'visible'}}>
         <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div style={{display:'flex'}}>
            <ul style={{marginLeft:'auto'}} className="nav navbar-nav navbar-right">
              <li
                style={{borderLeft:'1px solid #2c3e50'}}>
                <a
                  style={{ display:'flex',alignItems:'center',alignContent:'center',fontSize:16}}
                  href="#">
                    <Circle
                      fontSize="2vw"
                      userName={this.props.userName}
                      userImageUrl={this.props.userImageUrl}
                    />&nbsp;Welcome, Robert
                </a>
                {this.state.showDropdown?
                   <DropDown onClickProfile={this.props.onClickProfile}/>
                  :
                    null
                 }
               </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>);
  }
}
