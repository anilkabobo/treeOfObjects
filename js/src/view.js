var TreeApp = (function (app) {
  'use strict';
  app.view = (function() {
    var tree = {};
    var fragment = document.createDocumentFragment();
    var keywords = ['id', 'children', 'nextChildId']
    
    function render(wrapper) {
      tree = app.tree.get();
      var rootEl = document.createElement('div');
      rootEl.id = 'root';
      rootEl.innerHTML = 'Root';
      fragment.appendChild(rootEl);

      renderChildren(tree);
      wrapper.appendChild(fragment);
    }

    function renderChildren(parent) {
      var newEl = null;
      var temp = null;
      var parentElement = fragment.getElementById(parent.id);

      for (var child in parent) {
        if (parent.hasOwnProperty(child) && keywords.indexOf(child) === -1) {
          temp = parent[child];
          newEl = document.createElement('div');
          newEl.id = child;
          newEl.innerHTML = 'Item ' + child;
          parentElement.appendChild(newEl);

          if (temp.children) {
            renderChildren(temp);
          }
        }
      }
    }

    return {
      renderTree: render
    }
  })();

  return app;
}(TreeApp || {}));
