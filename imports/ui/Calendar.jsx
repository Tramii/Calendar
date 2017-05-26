import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { FullCalendar } from 'meteor/jss:fullcalendar-react';
import { HTTP } from 'meteor/http';

class Calendar extends React.Component {

  constructor(props){
    super(props);
    this.state ={
      tasks: [],
    }
  }

  get(callback){
    if (this.props.username
      && this.props.username.services
      && this.props.username.services.google
      && this.props.username.services.google.accessToken) {
      var params = {
        access_token: this.props.username.services.google.accessToken,
        part: "snippet",
        mine: "true",
        timeMin:'2017-05-24T10:00:00Z'
      };
      HTTP.get("https://www.googleapis.com/calendar/v3/calendars/primary/events",
                {params: params},
                (err, result) => {
                  console.log("result");
                  console.log(result);
                  let objects = [];
                  for (let i=0;i<result.data.items.length;i++){

                    let emp = result.data.items[i].start.dateTime;
                    let arremp = emp.split("-");
                    let newemp = arremp[0]+"-"+arremp[1]+"-"+arremp[2];

                    let ter = result.data.items[i].end.dateTime;
                    let arrter = ter.split("-");
                    let newter = arrter[0]+"-"+arrter[1]+"-"+arrter[2];

                    let obj = {
                      title: result.data.items[i].summary,
                      start: newemp,
                      end: newter,
                    }
                    console.log(obj);
                    objects.push(obj);
                  }
                  console.log(objects);
                  this.state.tasks = objects;
                  callback(objects)
                }
        );
    }
  }

  paint(objects){
    let arr = this.state.tasks;
    console.log("el arreglo");
    console.log(arr);
    $('#calendar').fullCalendar({
      eventSources:[
        {
          events: arr,
          color: '#7FD62E',
          className: 'bod',
          editable: false,
          durationEditable: false,
          resourceEditable: false,
          startEditable:false
        }
      ],

			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,agendaWeek,agendaDay'
			},
    });
    console.log("termina");
  }

  render() {
    return (<div id="calendar"></div>);
  }

  componentDidUpdate() {
    this.get(this.paint.bind(this));

  }
}
export default createContainer(() => {
  return { username: Meteor.user() };
}, Calendar);
