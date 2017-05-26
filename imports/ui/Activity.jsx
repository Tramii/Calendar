import React, {Component} from "react";
import { Well, Button, Thumbnail } from 'react-bootstrap';


export default class Activity extends React.Component {
  constructor(props) {
    super(props);
  }

  delete(){
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false
    }).then(function () {
      swal(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }, function (dismiss) {
      // dismiss can be 'cancel', 'overlay',
      // 'close', and 'timer'
      if (dismiss === 'cancel') {
        swal(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    });
  }

  put(){
    swal.setDefaults({
        input: 'text',
        confirmButtonText: 'Next &rarr;',
        showCancelButton: true,
        animation: false,
        progressSteps: ['1', '2', '3']
      });

      var steps = [
        {
          title: 'Question 1',
          text: 'Chaining swal2 modals is easy'
        },
        'Question 2',
        'Question 3'
      ];

      swal.queue(steps).then(function (result) {
        swal.resetDefaults();
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

  render() {
    return (
        <div>
          <Thumbnail className="actividad bod">
            <div className="row">
              <div className="col-md-8">
                <strong className="gray task-name">
                  {this.props.evento.summary}
                </strong>
              </div>
              <div className="col-md-4 task-butt">
                {/*<Button className="fa fa-pencil gray" aria-hidden="true" onClick={()=>{this.put();}}></Button>*/}
                {' '}
                <Button className="fa fa-trash gray" aria-hidden="true" onClick={()=>{this.delete();}}></Button>
              </div>
            </div>
          </Thumbnail>
        </div>
    );
  }
}
