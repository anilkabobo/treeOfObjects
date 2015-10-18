var TreeApp = (function (app) {
  'use strict';

  app.init = function() {
  	app.tree.set(sampleData);
  	app.view.renderTree(document.getElementById('wrapper'))
  	console.log(app.tree.get());
  	
  }
  return app;
}(TreeApp || {}));


document.addEventListener("DOMContentLoaded", TreeApp.init, false);