import { Accounts } from 'meteor/accounts-base';

Accounts.ui.config({
    requestPermissions: {
        google:
        ['https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/tasks'],
//      forceApprovalPrompt: {google: true}
    },
    forceApprovalPrompt: {google: true},
    requestOfflineToken: {google: true},
    passwordSignupFields: 'EMAIL_ONLY',

//      extraSignupFields: []
});

/**
gCal =
  insertEvent: (cliente, poblacion, texto, fecha)=>{
  //to-do calendar devuelve un Event Object que incluye un ID
  //si incluimos este id como campo en la alerta podremos despues
  //eliminar el evento en el calendario directamente desde la app
    url = "https://www.googleapis.com/calendar/v3/calendars/primary/events"
    event=  {
      summary: cliente
      location: poblacion
      description: texto
      start:
        "date": fecha
      end:
        "date": fecha
      }
    evento = JSON.stringify event
    console.log evento
    Auth = 'Bearer ' + Meteor.user().services.google.accessToken
    Meteor.http.post( url, {
      params: {key: 'INSERT-YOUR-API-KEY-HERE'},
      data: event,
      headers: {'Authorization': Auth }
      },
      (err, result)->
        console.log result
        return result.id)
}*/
