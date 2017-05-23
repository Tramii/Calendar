import React, {Component} from "react";
import { Meteor } from "meteor/meteor";
import { Well, Button, Thumbnail } from 'react-bootstrap';

//import googleApis from './googleApi.js';


export  default class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        <br/><br/><br/><br/>
        <Well className="col-md-12">
          <Thumbnail className="col-md-5 center">
            Lista de Eventos por asignar
          </Thumbnail>
          <div className="col-md-1"></div>
          <Thumbnail className="col-md-5 center">
            Editar eventos creados
          </Thumbnail>
        </Well>
      </div>
    );
  }
}
