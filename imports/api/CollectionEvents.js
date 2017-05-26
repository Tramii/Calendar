/* eslint-disable no-global-assign, no-undef, import/extensions,
import/no-extraneous-dependencies, meteor/no-session, react/jsx-no-bind,
no-useless-escape, react/forbid-proptypes, no-unused-vars, no-tabs,
no-mixed-spaces-and-tabs, jsx-quotes,import/prefer-default-export */
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const EventsCollection = new Mongo.Collection('EventsCollection');

// Deny all client-side updates on the Lists collection
EventsCollection.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Meteor.methods({
  'get'() {
    if (Meteor.user() && Meteor.user().services
      && Meteor.user().services.google && Meteor.user().services.google.accessToken) {
      var params = {
        access_token: Meteor.user().services.google.accessToken,
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
                  return result.data;
                  //this.setState({"lista":result.data});
                }
        );
    }//end if user
  },
  'recipes.remove'(recipeId) {
    /** check(recipeId, String);*/
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    // si aqui mandan recipesID {} borraria todas las recetas!!
    if (((typeof recipeId) === 'string') && !recipeId.includes("{")){
      UsersWithRecipesCollection.remove(recipeId);
    }
  },
  'recipesLike.update'(recipesId) {
    /** check(recipesId, String);*/
    // si aqui mandan recipesID {} sin seguridad le daria like a todo!!
    if (((typeof recipesId) === 'string') && !recipesId.includes("{")) {
      UsersWithRecipesCollection.update(recipesId, {
        $inc: { likes: 1 }
      });
    }
  }, /**
  'recipes.findAll'() {
    UsersWithRecipesCollection.find({}, { sort: { likes: -1 } }).fetch()
  },
  'user.points'(){
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    UsersWithRecipesCollection.find({}).fetch();
  },*/
});

/**
export const updateText = new ValidatedMethod({
  name: 'todos.updateText',
  validate: new SimpleSchema({
    todoId: { type: String },
    newText: { type: String }
  }).validator(),
  run({ todoId, newText }) {
    const todo = Todos.findOne(todoId);
    if (!todo.editableBy(this.userId)) {
      throw new Meteor.Error('todos.updateText.unauthorized',
        'Cannot edit todos in a private list that is not yours');
    }
    Todos.update(todoId, {
      $set: { text: newText }
    });
  }
});*/
