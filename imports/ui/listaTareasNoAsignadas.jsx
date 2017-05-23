import React, {Component} from "react";
import { Meteor } from "meteor/meteor";
import { Well, Button, Thumbnail } from 'react-bootstrap';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
//import googleApis from './googleApi.js';


export  default class App extends Component {

  constructor(props) {
    super(props);
    this.user = Meteor.user();
  }

  buscar(){
    if (this.user && this.user.services && this.user.services.google &&
          this.user.services.google.accessToken) {
      var startTimeUTC = moment.utc(event.startTime, "YYYY-MM-DD HH:mm:ss").format();
      var endTimeUTC = moment.utc(event.endTime, "YYYY-MM-DD HH:mm:ss").format();
      console.log("POSTINGGCAL");
      if (moment.utc().unix() < moment.utc(event.endTime).unix()) {
        console.log("ENTERGCAL");
        var id = Meteor.http.post("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
          'headers' : {
            'Authorization': "Bearer " + user.services.google.accessToken,
            'Content-Type': 'application/json'
          },
          'data': {
            "summary": event.name,
            "location": event.location,
            "start": {
              "dateTime": startTimeUTC,
            },
            "end": {
              "dateTime": endTimeUTC,
            },
            "attendees": [
              {
                "email": user.email,
              },
            ]
          }
        });
      }//end if moment
    }//end if user
  }

  render() {

    return (
      <div>
        <AccountsUIWrapper/>
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
