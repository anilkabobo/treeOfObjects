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
      rootEl.innerHTML = 'Root<button class="add-child">+</button>';
      fragment.appendChild(rootEl);

      renderChildren(tree);
      wrapper.appendChild(fragment);
    }

    function renderChildren(parent) {
      var temp = null;
      var parentElement = fragment.getElementById(parent.id);
      var children = parent.children;

      if (!children) {
        return false;
      }

      for (var child in children) {
        if (children.hasOwnProperty(child)) {
          temp = children[child];         
          parentElement.appendChild(createNewElement(child));

          if (temp.children) {
            renderChildren(temp);
          }
        }
      }
    }

    function createNewElement(id) {
      var newEl = document.createElement('div');
      newEl.id = id;
      newEl.innerHTML = 'Item ' + id + 
        '<button class="add-child">+</button>' + 
        '<button class="remove-child">-</button>';
      return newEl;
    }

    function addChild(parentEl) {
      var newId = app.tree.addChild(parentEl.id);
      parentEl.appendChild(createNewElement(newId))
    }

    function deleteChild(parentEl) {
      parentEl.parentElement.removeChild(parentEl);
      app.tree.removeChild(parentEl.id);
    }

    return {
      renderTree: render,
      addChild: addChild,
      deleteChild: deleteChild
    }
  })();

  return app;
}(TreeApp || {}));
