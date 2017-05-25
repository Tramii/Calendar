import React, {Component} from "react";
import { Meteor } from "meteor/meteor";
import { Well, Button, Thumbnail } from 'react-bootstrap';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import SideBar from './SideBar.jsx';
//import googleApis from './googleApi.js';
import ListaTareasNoAsignadas from './ListaTareasNoAsignadas.jsx';

export default class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        <AccountsUIWrapper/>
        <br/><br/><br/><br/>
        <div className = "col-md-3 sidebar">
          <SideBar />
        </div>
        <div className="col-md-9">
          <Well className="col-md-12">
            <Thumbnail className="col-md-5 center">
              Lista de Eventos por asignar
              <ListaTareasNoAsignadas/>
            </Thumbnail>
            <div className="col-md-1"></div>
            <Thumbnail className="col-md-5 center">
              Editar eventos creados
            </Thumbnail>
          </Well>
        </div>
      </div>
    );
  }
}
