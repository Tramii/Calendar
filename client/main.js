import React from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";

import App2 from "../imports/ui/Application.jsx";
import '../imports/api/Accounts_config.js';

Meteor.startup(() => {
  //render(<AppContainer />, document.getElementById("render-target"));
  render(<App2 userName={['Robert','Khayat']} />, document.getElementById("render-target"));
});
