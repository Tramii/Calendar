import React, {Component} from "react";
import { Well, Button, Thumbnail } from 'react-bootstrap';

import { createContainer } from 'meteor/react-meteor-data';
import moment from 'moment';
import { HTTP } from 'meteor/http';

class SideNav extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      "lista":{},
    }
  }

  post(){
    swal.setDefaults({
      input: 'text',
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true,
      animation: false,
      progressSteps: ['1', '2', '3']
    })

    var steps = [
      {
        title: 'Question 1',
        text: 'Chaining swal2 modals is easy'
      },
      'Question 2',
      'Question 3'
    ]

    swal.queue(steps).then(function (result) {
      swal.resetDefaults()
      swal({
        title: 'All done!',
        html:
          'Your answers: <pre>' +
            JSON.stringify(result) +
          '</pre>',
        confirmButtonText: 'Lovely!',
        showCancelButton: false
      })
    }, function () {
      swal.resetDefaults()
    });
  }
  postToGoogle(event){
    //var event = {text:"prueba",startTime:"2017-05-24 13:00:00" , endTime:"2017-05-24 14:00:00" , name:"hola", location:"Casa"};
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

  put(){
    swal({
      title: "An input!",
      text: 'Write something interesting:',
      type: 'input',
      showCancelButton: true,
      closeOnConfirm: false,
      animation: "slide-from-top"
    }, function(inputValue){
      console.log("You wrote", inputValue);
    });
  }

  delete(){
    swal({
      title: "Are you sure?",
      text: "You will not be able to recover this imaginary file!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      closeOnConfirm: false,
      html: false
    }, function(){
      swal("Deleted!",
      "Your imaginary file has been deleted.",
      "success");
    });
  }

  get(){
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
    if(!this.state.lista.items){
      this.get();
    }
    if(this.state.lista.items){
      this.state.lista.items.map((event, index)=>{
        //console.log(new Date (event.start.dateTime) > new Date());
        if(new Date (event.start.dateTime) > new Date()){
          console.log("Evento: "+(event.summary));
        }
      });
    }
    return (
        <div id="sidebar-wrapper">
          <br/><br/><br/>
          <ul className="sidebar-nav row">
            <li className="col-md-12 row">
              <div className="col-md-3"></div>
              <div className="col-md-6 center">
                <Well onClick={()=>{this.post();}}>Añadir</Well>
              </div>
              <div className="col-md-3"></div>
            </li>
            <li className="col-md-12 row">
              <div className="col-md-3"></div>
              <div className="col-md-6 center">
                <Well onClick={()=>{this.put();}}>Editar</Well>
              </div>
              <div className="col-md-3"></div>
            </li>
            <li className="col-md-12 row">
              <div className="col-md-3"></div>
              <div className="col-md-6 center">
                <Well onClick={()=>{this.delete();}}>Borrar</Well>
              </div>
              <div className="col-md-3"></div>
            </li>
          </ul>
        </div>
    );
  }
}
export default createContainer(() => {
  return { currentUser: Meteor.user() };
}, SideNav);
