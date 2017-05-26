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
        title: 'Deadline',
        text: 'Insert the time of your deadline, e.g.: 12:00-13:00'
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
<<<<<<< HEAD
      +"-"+(((timeFilter.getDate())< 10)?"0"+(timeFilter.getDate()):(timeFilter.getDate()))+" "+result[3].split("-")[0]+":00";
      event.endTime=(timeFilter.getFullYear())+"-"+(((timeFilter.getMonth()+1)< 10)?"0"+(timeFilter.getMonth()+1):(timeFilter.getMonth()+1))
      +"-"+(((timeFilter.getDate())< 10)?"0"+(timeFilter.getDate()):(timeFilter.getDate()))+" "+result[3].split("-")[1]+":00";
=======
      +"-"+(((timeFilter.getDate())< 10)?"0"+(timeFilter.getDate()):(timeFilter.getDate()))+" "+
      (((parseInt(result[3].split("-")[0].split(":")[0])+5) <10)?
       '0'+(parseInt(result[3].split("-")[0].split(":")[0])+5):(parseInt(result[3].split("-")[0].split(":")[0])+5))+":00:00";
      //(parseInt(result[3].split("-")[0].split(":")[0])+5)+"00:00";//(parseInt(result[3].split("-")[0].split(":")[1]))+":00";
      event.endTime=(timeFilter.getFullYear())+"-"+(((timeFilter.getMonth()+1)< 10)?"0"+(timeFilter.getMonth()+1):(timeFilter.getMonth()+1))
      +"-"+(((timeFilter.getDate())< 10)?"0"+(timeFilter.getDate()):(timeFilter.getDate()))+" "+
      (((parseInt(result[3].split("-")[1].split(":")[0])+5) <10)?
       '0'+(parseInt(result[3].split("-")[1].split(":")[0])+5):(parseInt(result[3].split("-")[1].split(":")[0])+5))+":00:00";
>>>>>>> ba3286adb2585ad7fa9e9c38d32a4f417688ae37
      event.reminder = parseInt(result[4]);
      var horasDedicadas = parseInt(result[5]);

      console.log("evento a mandar a google");
      console.log(event);
      //this.postToGoogle(event);

      if (Meteor.user() && Meteor.user().services
        && Meteor.user().services.google &&
            Meteor.user().services.google.accessToken) {
        var startTimeUTC = moment.utc(event.startTime, "YYYY-MM-DD HH:mm:ss").format();
        var endTimeUTC = moment.utc(event.endTime, "YYYY-MM-DD HH:mm:ss").format();
        console.log("POSTINGGCAL");
        if (moment.utc().unix() < moment.utc(event.endTime).unix()) {
          var id =
          HTTP.post("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
            'params': {key: "AIzaSyAmqv6GP4s1FlH0WTzAn7AHPbJT9tYsQ9g"},
            'headers' : {
              'Authorization': "Bearer " + Meteor.user().services.google.accessToken
            },
            'data': {
              "description": event.text,
              "summary": event.name,
              "start": {
                "dateTime": startTimeUTC,
                'timeZone': "America/Bogota",
              },
              "end": {
                "dateTime": endTimeUTC,
                'timeZone': "America/Bogota",
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
      var ONE_DAY = 1000 * 60 * 60 * 24;
      var date1_ms = new Date();
      var date2_ms = timeFilter;
      var difference_ms = Math.abs(date1_ms - date2_ms);
      var days= Math.round(difference_ms/ONE_DAY)-1;
      if(days>0){
        var horasPorDia = horasDedicadas/days;
        //"2017-05-24 13:00:00"
        for(var i=1;i<=days;i++){
          var tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate()+i);
          //a cada dia le voy a asignar horasPorDia horas
          //por ahora voy a poner todo desde las 7 hastas las horas que pida
          var aconvertir = (tomorrow.getFullYear())+"-"+(((tomorrow.getMonth()+1)< 10)?"0"+(tomorrow.getMonth()+1):(tomorrow.getMonth()+1))
          +"-"+(((tomorrow.getDate())< 10)?"0"+(tomorrow.getDate()):(tomorrow.getDate()));
          var diaActualI = moment.utc(aconvertir+" "+"07:00:00", "YYYY-MM-DD HH:mm:ss").format();
          var diaActualF = moment.utc(aconvertir+" "+(((7+horasPorDia)<10)?"0"+(7+horasPorDia):(7+horasPorDia))+"00:00", "YYYY-MM-DD HH:mm:ss").format();
          var post=HTTP.post("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
            'params': {key: "AIzaSyAmqv6GP4s1FlH0WTzAn7AHPbJT9tYsQ9g"},
            'headers' : {
              'Authorization': "Bearer " + Meteor.user().services.google.accessToken
            },
            'data': {
              "description": "HELPER"+ event.text,
              "summary": "T.A. "+ event.name,
              "start": {
                "dateTime": diaActualI,
                'timeZone': "America/Bogota",
              },
              "end": {
                "dateTime": diaActualF,
                'timeZone': "America/Bogota",
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
        }
      }
      else{
        swal({
          title: 'oh oh',
          text: 'No days remaining to the event! get to work, we cant do anything',
          showCancelButton: true,
        });
      }
    },  ()=> {
      swal.resetDefaults();
    });

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
                  <div className="col-md-6 center green">
                    <Button bsSize="large" className="but" onClick={()=>{this.post();}}>
                      <i className="fa fa-plus gray" aria-hidden="true" /><strong className="bod gray"> Add task</strong>
                    </Button>
                  </div>
                  <div className="col-md-3"></div>
                </li>
              </ul>
            <div className="col-md-12 row">{(this.state.lista.items)?this.state.lista.items.map((event, index)=>{
              if(new Date (event.start.dateTime) > new Date() && !event.summary.startsWith("T.A.")){
                return <Activity key={index} evento={event}></Activity>
              }
            }):""}</div>
           </div>
          :
            <div className="logfa">
              <i className="fa fa-sign-in fa-5x white" aria-hidden="true" />
              <h1 className="head logintxt">Log in to organize your schedule</h1>
            </div>
          }
        </div>
    );
  }
}
export default createContainer(() => {
  return { currentUser: Meteor.user() };
}, SideNav);
