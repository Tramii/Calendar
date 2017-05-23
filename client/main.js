import React from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";

import AppContainer from "../imports/ui/App.jsx";
import '../imports/api/Accounts_config.js';

Meteor.startup(() => {
  render(<AppContainer />, document.getElementById("render-target"));
});
