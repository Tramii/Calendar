import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { FullCalendar } from 'meteor/jss:fullcalendar-react';

class Calendar extends React.Component {
  render() {
    return <div id="calendar"></div>;
  }
  componentDidMount() {
    $('#calendar').fullCalendar({
      eventSources:[
        {
          events :[
            {
              title: 'Margarita maria gomez ballen ajdklasjd asdjsakj',
              start: '2017-05-26'
            }

          ],
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
			editable: true,
			droppable: true, // this allows things to be dropped onto the calendar
			drop: function() {
				// is the "remove after drop" checkbox checked?
				if ($('#drop-remove').is(':checked')) {
					// if so, remove the element from the "Draggable Events" list
					$(this).remove();
				}
			}
    })
  }
}
export default createContainer(() => {
  return { currentUser: Meteor.user() };
}, Calendar);
