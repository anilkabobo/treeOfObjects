var TreeApp = (function (app) {
  'use strict';
  var treeWrapper = null;

  function addEventListeners(wrapper) {
  	wrapper.addEventListener('click', function(e) {
  		var parent = e.target.parentElement;
  		switch (e.target.className) {
  			case 'add-child':
  				app.view.addChild(parent);
  				break;
  			case 'remove-child':
  				app.view.deleteChild(parent);
  				break;
  		}
  	});
  }

  app.init = function() {
  	treeWrapper = document.getElementById('wrapper');
  	app.tree.get();
  	app.view.renderTree(treeWrapper);
  	addEventListeners(treeWrapper);
  	
  }
  return app;
}(TreeApp || {}));


document.addEventListener("DOMContentLoaded", TreeApp.init, false);