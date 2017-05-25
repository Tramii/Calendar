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
    this.state={
      "lista":{},
    }
  }

  agregar(){
    var event = {text:"prueba",startTime:"2017-05-24 13:00:00" , endTime:"2017-05-24 14:00:00" , name:"hola", location:"Casa"};
    if (this.props.currentUser && this.props.currentUser.services
      && this.props.currentUser.services.google &&
          this.props.currentUser.services.google.accessToken) {
      var startTimeUTC = moment.utc(event.startTime, "YYYY-MM-DD HH:mm:ss").format();
      var endTimeUTC = moment.utc(event.endTime, "YYYY-MM-DD HH:mm:ss").format();
      console.log("POSTINGGCAL");
      if (moment.utc().unix() < moment.utc(event.endTime).unix()) {
        var id =
        HTTP.post("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
          'params': {key: "API KEYS AQUI"},
          'headers' : {
            'Authorization': "Bearer " + this.props.currentUser.services.google.accessToken
          },
          'data': {
            "description": event.text,
            "summary": event.name,
            "location": event.location,
            "start": {
              "dateTime": startTimeUTC,
              'timeZone': 'America/Los_Angeles',
            },
            "end": {
              "dateTime": endTimeUTC,
              'timeZone': 'America/Los_Angeles',
            },
            'reminders': {
              'useDefault': false,
              'overrides': [
                {'method': 'email', 'minutes': 24 * 60},
                {'method': 'popup', 'minutes': 10}
              ]
            },
            /**'recurrence': [
              'RRULE:FREQ=DAILY;COUNT=2'
            ],*/
          }
        }, (err, result) => {console.log(err);console.log(result);});
      }//end if moment
    }//end if user
  }


  recuperar(){
    if (this.props.currentUser && this.props.currentUser.services) {
      var params = {access_token: this.props.currentUser.services.google.accessToken, part: "snippet",mine: "true"};
        HTTP.get("https://www.googleapis.com/calendar/v3/calendars/primary/events",
                {params: params},
                (err, result) => {
                  console.log("error");
                  console.log(err);
                  console.log("result");
                  console.log(result);
                  this.setState({"lista":result.data});
                }
        );
    }//end if user
  }

  render() {
    console.log(this.props.currentUser);
    //this.agregar();
    if(!this.state.lista.items){
      this.recuperar();
    }

    console.log("lista de eventos: ");
    console.log(this.state.lista);

    return (
      <div>
        <Well>
          {(this.state.lista.items)?this.state.lista.items.map((event, index)=>{
            //console.log(new Date (event.start.dateTime) > new Date());
            if(new Date (event.start.dateTime) > new Date()){
              return ("Evento: "+(event.summary)+"\n");
            }
          }):""}
        </Well>
      </div>
    );
  }
}
export default createContainer(() => {
  return { currentUser: Meteor.user() };
}, ListaTareasNoAsignadas);
