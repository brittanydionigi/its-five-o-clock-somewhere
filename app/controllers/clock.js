import Ember from 'ember';

export default Ember.Controller.extend({
  localTime: new Date().toLocaleTimeString()
});
