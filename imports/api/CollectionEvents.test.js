/* eslint-disable no-global-assign, no-undef, import/extensions,
import/no-extraneous-dependencies, meteor/no-session, react/jsx-no-bind,
no-useless-escape, react/forbid-proptypes, no-unused-vars, no-tabs,
no-mixed-spaces-and-tabs, jsx-quotes,import/prefer-default-export, quote-props */

import { Meteor } from 'meteor/meteor';
import { EventsCollection } from './CollectionEvents.js';
import { assert } from 'meteor/practicalmeteor:chai';

if (Meteor.server) {
  Meteor.user = function () {
      return { 'username': 'pruebita' };
  };

  Meteor.userId = function () {
    return { 'userId':'4382243089' };
  };

  describe('CollectionEvents', function () {
    beforeEach(function() {
      EventsCollection.remove({});
      EventsCollection.insert({
        "_id": "JxojW4S4QW6CkJpye",
              "titleOfMainEvent": "Parcial web",
              "_idMainEvent":"S4QW6CkJpyee",
              "dayNumber": 1,
              "totalDays": 4,
          });
          EventsCollection.insert({
            "_id": "AKFñaslEIOdjfaKDSJye",
                  "titleOfMainEvent": "Parcial Redes",
                  "_idMainEvent":"yktrS4asadSDFpyee",
                  "dayNumber": 2,
                  "totalDays": 2,
              });

    it("Should find created events", function () {
      const result = EventsCollection.find({});
      assert.equal(result.count(), 2);
    });

    it("Should remove recipes", function() {
      Meteor.call('events.remove', 'JxojW4S4QW6CkJpye', function(){
        const events = EventsCollection.find({}).fetch();
        assert.equal(recipex.length, 1);
      });
    });
  });
}
