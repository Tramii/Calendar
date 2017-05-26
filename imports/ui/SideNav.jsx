import React, {Component} from "react";
import { Well, Button, Thumbnail } from 'react-bootstrap';

import { createContainer } from 'meteor/react-meteor-data';
import moment from 'moment';
import { HTTP } from 'meteor/http';

import Activity from './Activity.jsx';

class SideNav extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      "lista":{},
    }
  }

  post(){
    /**
    //var event = {text:"prueba",startTime:"2017-05-24 13:00:00" , endTime:"2017-05-24 14:00:00" , name:"hola", location:"Casa"};
  2  text (description)
  3  startTime
  4  endTime
  1  name (summary)
  5  reminder
    location
  6  hoursToFullfillTheTask
    */
    swal.setDefaults({
      input: 'text',
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true,
      animation: false,
      progressSteps: ['1', '2', '3', '4', '5', '6']
    });


    var steps = [
      {
        title: 'Name',
        text: 'Give your activity a unique name'
      },
      {
        title: 'Description',
        text: 'Write (if you wish) a description of the activity'
      },
      {
        title: 'Date of the main event',
        html: '<div id="datepicker"></div>',
        showConfirmButton: false,
        input:false,
        onOpen: function() {
        	$('#datepicker').datepicker({
          	onSelect: swal.clickConfirm
          });
        },
        preConfirm: function() {
          return Promise.resolve($('#datepicker').datepicker('getDate'));
        }
      },
      {
        title: 'Hours',
        text: 'Insert the hour of beggining and hour of finish of your main event (24 Horas). Ejemplo: 12:00-13:00'
      },
      {
        title: 'Reminder',
        text: 'You want to get a reminder of your events? Plese insert a number'
      },
      {
        title: 'Time you want to invest',
        text: 'How many hours do you want to invest before the main event begin?'
      },
    ];

    swal.queue(steps).then(function (result) {
      swal.resetDefaults();
      swal({
        title: 'All set, please confirm!',
        html:
          'Your answers: <pre>' +
            JSON.stringify(result) +
          '</pre>',
        confirmButtonText: 'Create your event now!',
        showCancelButton: true,
      });
//var event = {text:"prueba",startTime:"2017-05-24 13:00:00" , endTime:"2017-05-24 14:00:00" , name:"hola", location:"Casa"};
      console.log("modal: ");
      console.log(result);
      //console.log( JSON.stringify(result[2]));
      var time = JSON.stringify(result[2]);
      var timeFilter = new Date(time.split("T")[0]);
      console.log("date");
      console.log(timeFilter);
      var event = {};
      event.name = result[0];
      event.text = result[1];
      //"2017-05-24 13:00:00"
      event.startTime=(timeFilter.getFullYear())+"-"+(((timeFilter.getMonth()+1)< 10)?"0"+(timeFilter.getMonth()+1):(timeFilter.getMonth()+1))
      +"-"+(((timeFilter.getDate()+1)< 10)?"0"+(timeFilter.getDate()+1):(timeFilter.getDate()+1))+" "+result[3].split("-")[0]+":00";
      event.endTime=(timeFilter.getFullYear())+"-"+(((timeFilter.getMonth()+1)< 10)?"0"+(timeFilter.getMonth()+1):(timeFilter.getMonth()+1))
      +"-"+(((timeFilter.getDate()+1)< 10)?"0"+(timeFilter.getDate()+1):(timeFilter.getDate()+1))+" "+result[3].split("-")[1]+":00";
      event.reminder = parseInt(result[4]);
      var horasDedicadas = parseInt(result[5]);
      console.log("evento a mandar a google");
      console.log(event);
      //this.postToGoogle(result);
    }, function () {
      swal.resetDefaults();
    });
  }
  postToGoogle(event){
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
                //{'method': 'email', 'minutes': 24 * 60},
                {'method': 'popup', 'minutes': event.reminder}
              ]
            },
            /**'recurrence': [
              'RRULE:FREQ=DAILY;COUNT=2'
            ],*/
          }
        }, (err, result) => {
              console.log(err);
              console.log(result);
            });
      }//end if moment
    }//end if user
  }

  get(){
    if (this.props.currentUser && this.props.currentUser.services
      && this.props.currentUser.services.google && this.props.currentUser.services.google.accessToken) {
      var params = {
        access_token: this.props.currentUser.services.google.accessToken,
        part: "snippet",
        mine: "true",
        timeMin:'2017-05-24T10:00:00Z'
      };
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
    if(!this.state.lista.items ){
      if(this.props.currentUser){
        this.get();
      }
    }
    /**if(this.state.lista.items){
      this.state.lista.items.map((event, index)=>{
        //console.log(new Date (event.start.dateTime) > new Date());
        if(new Date (event.start.dateTime) > new Date()){
          console.log("Evento: "+(event.summary));
        }
      });
    }*/
    return (
        <div id="sidebar-wrapper">
          <br/><br/><br/>
          {this.props.currentUser?
            <div>
              <ul className="sidebar-nav row">
                <li className="col-md-12 row">
                  <div className="col-md-3"></div>
                  <div className="col-md-6 center">
                    <Button onClick={()=>{this.post();}}>Añadir</Button>
                  </div>
                  <div className="col-md-3"></div>
                </li>
              </ul>
            <div className="col-md-12 row">{(this.state.lista.items)?this.state.lista.items.map((event, index)=>{
              if(new Date (event.start.dateTime) > new Date()){
                return <Activity key={index} evento={event}></Activity>
              }
            }):""}</div>
           </div>
          :
            <div className="col-md-12 row">
              <div className="col-md-3"></div>
              <Well  className="col-md-6 center">Loggeate ahora!</Well>
              <div className="col-md-3"></div>
            </div>
          }
        </div>
    );
  }
}
export default createContainer(() => {
  return { currentUser: Meteor.user() };
}, SideNav);
