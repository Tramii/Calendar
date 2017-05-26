import React, {Component} from "react";
import {Well, Thumbnail, Button} from 'react-bootstrap';
import ListaTareasNoAsignadas from './ListaTareasNoAsignadas.jsx';
import Calendar from './Calendar.jsx';

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
        <div className="col-md-3"></div>
        <div className="col-md-9">
          <Calendar />
        </div>
      </div>
      )
  }
}
