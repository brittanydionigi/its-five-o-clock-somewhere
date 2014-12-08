
;define("its-five-o-clock-somewhere/app", 
  ["ember","ember/resolver","ember/load-initializers","its-five-o-clock-somewhere/config/environment","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    var Resolver = __dependency2__["default"];
    var loadInitializers = __dependency3__["default"];
    var config = __dependency4__["default"];

    Ember.MODEL_FACTORY_INJECTIONS = true;

    var App = Ember.Application.extend({
      modulePrefix: config.modulePrefix,
      podModulePrefix: config.podModulePrefix,
      Resolver: Resolver,
      ApplicationSerializer: DS.LFSerializer.extend(),
      ApplicationAdapter: DS.LFAdapter.extend({
        namespace: 'worldtimezones'
      })
    });

    loadInitializers(App, config.modulePrefix);

    __exports__["default"] = App;
  });
;define("its-five-o-clock-somewhere/controllers/clock", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];

    __exports__["default"] = Ember.Controller.extend({
        init: function() {
            // Update the time.
            this.updateTime();

            // Run other controller setup.
            this._super();
        },

        updateTime: function() {
            var _this = this;
     
            // Update the time every second.
            Ember.run.later(function() {
                _this.set('localTime', moment().format('h:mm:ss a'));
     
                _this.get('model').forEach(function(model) {
                    model.set('time',
                              moment().tz(model.get('name')).format('h:mm:ss a'));
                });
     
                _this.updateTime();
            }, 1000);
        }.on('init'),

       localTime: moment().format('h:mm:ss a')
    });
  });
;define("its-five-o-clock-somewhere/controllers/timezones", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];

    __exports__["default"] = Ember.Controller.extend({
        init: function() {
            var timezones = [];
            for (var i in moment.tz._zones) { 
              timezones.push({ 
                name: moment.tz._zones[i].name,
                offset: moment.tz._zones[i].offset[0]
              }); 
            } 
            this.set('timezones', timezones);
            this._super();
          }, 
          selectedTimezone: null, 
          actions: { 
            add: function() { 
              var timezone = this.store.createRecord('timezone', { 
                name: this.get('selectedTimezone').name,
                offset: this.get('selectedTimezone').offset
              });
              timezone.save(); 
            },
            remove: function(timezone) { 
              timezone.destroyRecord(); 
            } 
          } 
    });
  });
;define("its-five-o-clock-somewhere/initializers/export-application-global", 
  ["ember","its-five-o-clock-somewhere/config/environment","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    var config = __dependency2__["default"];

    function initialize(container, application) {
      var classifiedName = Ember.String.classify(config.modulePrefix);

      if (config.exportApplicationGlobal) {
        window[classifiedName] = application;
      }
    };
    __exports__.initialize = initialize;
    __exports__["default"] = {
      name: 'export-application-global',

      initialize: initialize
    };
  });
;define("its-five-o-clock-somewhere/models/timezone", 
  ["ember-data","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var DS = __dependency1__["default"];

    __exports__["default"] = DS.Model.extend({
        name: DS.attr('string'),
        offset: DS.attr('number')
    });
  });
;define("its-five-o-clock-somewhere/router", 
  ["ember","its-five-o-clock-somewhere/config/environment","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    var config = __dependency2__["default"];

    var Router = Ember.Router.extend({
      location: config.locationType
    });

    Router.map(function() {
      this.route('clock');
      this.resource('timezones', function() { });
    });

    __exports__["default"] = Router;
  });
;define("its-five-o-clock-somewhere/routes/application", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];

    __exports__["default"] = Ember.Route.extend({
        model: function() {
            return this.store;
        },
        redirect: function() {
            this.transitionTo('clock');
        }
    });
  });
;define("its-five-o-clock-somewhere/routes/clock", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];

    __exports__["default"] = Ember.Route.extend({
        model: function() {
            return this.get('store').find('timezone');
        }
    });
  });
;define("its-five-o-clock-somewhere/routes/timezones", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];

    __exports__["default"] = Ember.Route.extend({
        model: function() {
            return this.get('store').find('timezone');
        }
    });
  });
;define("its-five-o-clock-somewhere/templates/application", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    __exports__["default"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [4,'>= 1.0.0'];
    helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
      var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing;

    function program1(depth0,data) {
      
      
      data.buffer.push("Clock");
      }

    function program3(depth0,data) {
      
      
      data.buffer.push("Timezones");
      }

      data.buffer.push("<h1 id='title'>It's 5'o'clock somewhere</h1>\n\n<ul>\n    <li>");
      stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "clock", options) : helperMissing.call(depth0, "link-to", "clock", options));
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("</li>\n    <li>");
      stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "timezones", options) : helperMissing.call(depth0, "link-to", "timezones", options));
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("</li>\n</ul>\n\n");
      stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n");
      return buffer;
      
    });
  });
;define("its-five-o-clock-somewhere/templates/clock", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    __exports__["default"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [4,'>= 1.0.0'];
    helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
      var buffer = '', stack1, self=this;

    function program1(depth0,data) {
      
      var buffer = '', stack1;
      data.buffer.push("\n        <li>");
      stack1 = helpers._triageMustache.call(depth0, "name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push(": <strong>");
      stack1 = helpers._triageMustache.call(depth0, "time", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("</strong></li>\n    ");
      return buffer;
      }

      data.buffer.push("<h2>Local Time: ");
      stack1 = helpers._triageMustache.call(depth0, "localTime", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("</h2>\n\n<ul>\n    ");
      stack1 = helpers.each.call(depth0, "model", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n</ul>\n");
      return buffer;
      
    });
  });
;define("its-five-o-clock-somewhere/templates/timezones", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    __exports__["default"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [4,'>= 1.0.0'];
    helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
      var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this;

    function program1(depth0,data) {
      
      var buffer = '', stack1;
      data.buffer.push("\n  <li>");
      stack1 = helpers._triageMustache.call(depth0, "name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push(" <button ");
      data.buffer.push(escapeExpression(helpers.action.call(depth0, "remove", "", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
      data.buffer.push(">Delete</button></li>\n");
      return buffer;
      }

      data.buffer.push("<h2>Add Timezone</h2>\n\n<div>\n    ");
      data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
        'content': ("timezones"),
        'selection': ("selectedTimezone"),
        'optionValuePath': ("content.offset"),
        'optionLabelPath': ("content.name")
      },hashTypes:{'content': "ID",'selection': "ID",'optionValuePath': "STRING",'optionLabelPath': "STRING"},hashContexts:{'content': depth0,'selection': depth0,'optionValuePath': depth0,'optionLabelPath': depth0},contexts:[depth0],types:["ID"],data:data})));
      data.buffer.push("\n</div>\n\n<button ");
      data.buffer.push(escapeExpression(helpers.action.call(depth0, "add", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
      data.buffer.push(">Add Timezone</button>\n\n<h2>My Timezones</h2>\n\n<ul>\n");
      stack1 = helpers.each.call(depth0, "model", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n</ul>\n");
      return buffer;
      
    });
  });
;define("its-five-o-clock-somewhere/tests/app.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - .');
    test('app.js should pass jshint', function() { 
      ok(false, 'app.js should pass jshint.\napp.js: line 12, col 26, \'DS\' is not defined.\napp.js: line 13, col 23, \'DS\' is not defined.\n\n2 errors'); 
    });
  });
;define("its-five-o-clock-somewhere/tests/controllers/clock.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - controllers');
    test('controllers/clock.js should pass jshint', function() { 
      ok(true, 'controllers/clock.js should pass jshint.'); 
    });
  });
;define("its-five-o-clock-somewhere/tests/controllers/timezones.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - controllers');
    test('controllers/timezones.js should pass jshint', function() { 
      ok(true, 'controllers/timezones.js should pass jshint.'); 
    });
  });
;define("its-five-o-clock-somewhere/tests/helpers/resolver", 
  ["ember/resolver","its-five-o-clock-somewhere/config/environment","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var Resolver = __dependency1__["default"];
    var config = __dependency2__["default"];

    var resolver = Resolver.create();

    resolver.namespace = {
      modulePrefix: config.modulePrefix,
      podModulePrefix: config.podModulePrefix
    };

    __exports__["default"] = resolver;
  });
;define("its-five-o-clock-somewhere/tests/helpers/start-app", 
  ["ember","its-five-o-clock-somewhere/app","its-five-o-clock-somewhere/router","its-five-o-clock-somewhere/config/environment","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    var Application = __dependency2__["default"];
    var Router = __dependency3__["default"];
    var config = __dependency4__["default"];

    __exports__["default"] = function startApp(attrs) {
      var App;

      var attributes = Ember.merge({}, config.APP);
      attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;

      Router.reopen({
        location: 'none'
      });

      Ember.run(function() {
        App = Application.create(attributes);
        App.setupForTesting();
        App.injectTestHelpers();
      });

      App.reset(); // this shouldn't be needed, i want to be able to "start an app at a specific URL"

      return App;
    }
  });
;define("its-five-o-clock-somewhere/tests/its-five-o-clock-somewhere/tests/helpers/resolver.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - its-five-o-clock-somewhere/tests/helpers');
    test('its-five-o-clock-somewhere/tests/helpers/resolver.js should pass jshint', function() { 
      ok(true, 'its-five-o-clock-somewhere/tests/helpers/resolver.js should pass jshint.'); 
    });
  });
;define("its-five-o-clock-somewhere/tests/its-five-o-clock-somewhere/tests/helpers/start-app.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - its-five-o-clock-somewhere/tests/helpers');
    test('its-five-o-clock-somewhere/tests/helpers/start-app.js should pass jshint', function() { 
      ok(true, 'its-five-o-clock-somewhere/tests/helpers/start-app.js should pass jshint.'); 
    });
  });
;define("its-five-o-clock-somewhere/tests/its-five-o-clock-somewhere/tests/test-helper.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - its-five-o-clock-somewhere/tests');
    test('its-five-o-clock-somewhere/tests/test-helper.js should pass jshint', function() { 
      ok(true, 'its-five-o-clock-somewhere/tests/test-helper.js should pass jshint.'); 
    });
  });
;define("its-five-o-clock-somewhere/tests/its-five-o-clock-somewhere/tests/unit/controllers/clock-test.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - its-five-o-clock-somewhere/tests/unit/controllers');
    test('its-five-o-clock-somewhere/tests/unit/controllers/clock-test.js should pass jshint', function() { 
      ok(true, 'its-five-o-clock-somewhere/tests/unit/controllers/clock-test.js should pass jshint.'); 
    });
  });
;define("its-five-o-clock-somewhere/tests/its-five-o-clock-somewhere/tests/unit/controllers/timezones-test.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - its-five-o-clock-somewhere/tests/unit/controllers');
    test('its-five-o-clock-somewhere/tests/unit/controllers/timezones-test.js should pass jshint', function() { 
      ok(true, 'its-five-o-clock-somewhere/tests/unit/controllers/timezones-test.js should pass jshint.'); 
    });
  });
;define("its-five-o-clock-somewhere/tests/its-five-o-clock-somewhere/tests/unit/models/timezone-test.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - its-five-o-clock-somewhere/tests/unit/models');
    test('its-five-o-clock-somewhere/tests/unit/models/timezone-test.js should pass jshint', function() { 
      ok(true, 'its-five-o-clock-somewhere/tests/unit/models/timezone-test.js should pass jshint.'); 
    });
  });
;define("its-five-o-clock-somewhere/tests/its-five-o-clock-somewhere/tests/unit/routes/application-test.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - its-five-o-clock-somewhere/tests/unit/routes');
    test('its-five-o-clock-somewhere/tests/unit/routes/application-test.js should pass jshint', function() { 
      ok(true, 'its-five-o-clock-somewhere/tests/unit/routes/application-test.js should pass jshint.'); 
    });
  });
;define("its-five-o-clock-somewhere/tests/its-five-o-clock-somewhere/tests/unit/routes/clock-test.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - its-five-o-clock-somewhere/tests/unit/routes');
    test('its-five-o-clock-somewhere/tests/unit/routes/clock-test.js should pass jshint', function() { 
      ok(true, 'its-five-o-clock-somewhere/tests/unit/routes/clock-test.js should pass jshint.'); 
    });
  });
;define("its-five-o-clock-somewhere/tests/its-five-o-clock-somewhere/tests/unit/routes/timezones-test.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - its-five-o-clock-somewhere/tests/unit/routes');
    test('its-five-o-clock-somewhere/tests/unit/routes/timezones-test.js should pass jshint', function() { 
      ok(true, 'its-five-o-clock-somewhere/tests/unit/routes/timezones-test.js should pass jshint.'); 
    });
  });
;define("its-five-o-clock-somewhere/tests/models/timezone.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - models');
    test('models/timezone.js should pass jshint', function() { 
      ok(true, 'models/timezone.js should pass jshint.'); 
    });
  });
;define("its-five-o-clock-somewhere/tests/router.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - .');
    test('router.js should pass jshint', function() { 
      ok(true, 'router.js should pass jshint.'); 
    });
  });
;define("its-five-o-clock-somewhere/tests/routes/application.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - routes');
    test('routes/application.js should pass jshint', function() { 
      ok(true, 'routes/application.js should pass jshint.'); 
    });
  });
;define("its-five-o-clock-somewhere/tests/routes/clock.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - routes');
    test('routes/clock.js should pass jshint', function() { 
      ok(true, 'routes/clock.js should pass jshint.'); 
    });
  });
;define("its-five-o-clock-somewhere/tests/routes/timezones.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - routes');
    test('routes/timezones.js should pass jshint', function() { 
      ok(true, 'routes/timezones.js should pass jshint.'); 
    });
  });
;define("its-five-o-clock-somewhere/tests/test-helper", 
  ["its-five-o-clock-somewhere/tests/helpers/resolver","ember-qunit"],
  function(__dependency1__, __dependency2__) {
    "use strict";
    var resolver = __dependency1__["default"];
    var setResolver = __dependency2__.setResolver;

    setResolver(resolver);

    document.write('<div id="ember-testing-container"><div id="ember-testing"></div></div>');

    QUnit.config.urlConfig.push({ id: 'nocontainer', label: 'Hide container'});
    var containerVisibility = QUnit.urlParams.nocontainer ? 'hidden' : 'visible';
    document.getElementById('ember-testing-container').style.visibility = containerVisibility;
  });
;define("its-five-o-clock-somewhere/tests/unit/controllers/clock-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var moduleFor = __dependency1__.moduleFor;
    var test = __dependency1__.test;

    moduleFor('controller:clock', 'ClockController', {
      // Specify the other units that are required for this test.
      // needs: ['controller:foo']
    });

    // Replace this with your real tests.
    test('it exists', function() {
      var controller = this.subject();
      ok(controller);
    });
  });
;define("its-five-o-clock-somewhere/tests/unit/controllers/timezones-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var moduleFor = __dependency1__.moduleFor;
    var test = __dependency1__.test;

    moduleFor('controller:timezones', 'TimezonesController', {
      // Specify the other units that are required for this test.
      // needs: ['controller:foo']
    });

    // Replace this with your real tests.
    test('it exists', function() {
      var controller = this.subject();
      ok(controller);
    });
  });
;define("its-five-o-clock-somewhere/tests/unit/models/timezone-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var moduleForModel = __dependency1__.moduleForModel;
    var test = __dependency1__.test;

    moduleForModel('timezone', 'Timezone', {
      // Specify the other units that are required for this test.
      needs: []
    });

    test('it exists', function() {
      var model = this.subject();
      // var store = this.store();
      ok(!!model);
    });
  });
;define("its-five-o-clock-somewhere/tests/unit/routes/application-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var moduleFor = __dependency1__.moduleFor;
    var test = __dependency1__.test;

    moduleFor('route:application', 'ApplicationRoute', {
      // Specify the other units that are required for this test.
      // needs: ['controller:foo']
    });

    test('it exists', function() {
      var route = this.subject();
      ok(route);
    });
  });
;define("its-five-o-clock-somewhere/tests/unit/routes/clock-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var moduleFor = __dependency1__.moduleFor;
    var test = __dependency1__.test;

    moduleFor('route:clock', 'ClockRoute', {
      // Specify the other units that are required for this test.
      // needs: ['controller:foo']
    });

    test('it exists', function() {
      var route = this.subject();
      ok(route);
    });
  });
;define("its-five-o-clock-somewhere/tests/unit/routes/timezones-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var moduleFor = __dependency1__.moduleFor;
    var test = __dependency1__.test;

    moduleFor('route:timezones', 'TimezonesRoute', {
      // Specify the other units that are required for this test.
      // needs: ['controller:foo']
    });

    test('it exists', function() {
      var route = this.subject();
      ok(route);
    });
  });
/* jshint ignore:start */

define('its-five-o-clock-somewhere/config/environment', ['ember'], function(Ember) {
  var prefix = 'its-five-o-clock-somewhere';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */


});

if (runningTests) {
  require('its-five-o-clock-somewhere/tests/test-helper');
} else {
  require('its-five-o-clock-somewhere/app')['default'].create({"LOG_ACTIVE_GENERATION":true,"LOG_VIEW_LOOKUPS":true});
}

/* jshint ignore:end */
