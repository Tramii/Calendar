import React, {Component} from "react";

import {Well, Thumbnail, Button} from 'react-bootstrap';
import ListaTareasNoAsignadas from './listaTareasNoAsignadas.jsx';
import AccountsUIWrapper from './AccountsUIWrapper';

export default class MainContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hola: '',
    }
  }

render() {
    return (
      <div className="main">
        <AccountsUIWrapper/>
        <br/><br/><br/><br/>
          <Well className="col-md-12">
            <Thumbnail className="col-md-5 center">
              Lista de Eventos por asignar
              <ListaTareasNoAsignadas/>
            </Thumbnail>
            <Button>Holaa</Button>
            <div className="col-md-1"></div>
            <Thumbnail className="col-md-5 center">
              Editar eventos creados
            </Thumbnail>
          </Well>
      </div>
      )
  }
}
