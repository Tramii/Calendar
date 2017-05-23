import { Accounts } from 'meteor/accounts-base';



Accounts.ui.config(
  {
    requestPermissions:
    {
      google:['https://www.googleapis.com/auth/calendar']
    }, forceApprovalPrompt: {google: true}
  });
