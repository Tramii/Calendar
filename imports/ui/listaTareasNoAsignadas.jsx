import React, {Component} from "react";
import { Meteor } from "meteor/meteor";
import { Well, Button, Thumbnail } from 'react-bootstrap';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
//import googleApis from './googleApi.js';
import { createContainer } from 'meteor/react-meteor-data';
import moment from 'moment';
import { HTTP } from 'meteor/http';

class ListaTareasNoAsignadas extends Component {

  constructor(props) {
    super(props);
    this.user = "";

  }

  agregar(){
    var event = {startTime:"2017-05-24 13:00:00" , endTime:"2017-05-24 14:00:00" , name:"hola", location:"Casa"};
    if (this.props.currentUser && this.props.currentUser.services
      && this.props.currentUser.services.google &&
          this.props.currentUser.services.google.accessToken) {
      var startTimeUTC = moment.utc(event.startTime, "YYYY-MM-DD HH:mm:ss").format();
      var endTimeUTC = moment.utc(event.endTime, "YYYY-MM-DD HH:mm:ss").format();
      console.log("POSTINGGCAL");
      if (moment.utc().unix() < moment.utc(event.endTime).unix()) {
        var id = HTTP.call('POST',"https://www.googleapis.com/calendar/v3/calendars/primary/events", {
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
                "email": this.props.currentUser.services.google.email,
              },
            ]
          }
        });
      }//end if moment
    }//end if user
  }

  render() {
    console.log(this.props.currentUser);
    this.agregar();
    return (
      <div>
        <Well>
          lista
        </Well>
      </div>
    );
  }
}
export default createContainer(() => {
  return { currentUser: Meteor.user() };
}, ListaTareasNoAsignadas);
