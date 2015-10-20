var TreeApp = (function (app) {
  'use strict';
  app.tree = (function() {
    var root = null;

    function get() {
      var basicObj = {
        id: 'root',
        nextChildId: 0
      }
      if (localStorage) {
        !localStorage.treeAppData && localStorage.setItem('treeAppData', JSON.stringify(basicObj));
        if (!localStorage.treeAppData) {
          localStorage.setItem('treeAppData', JSON.stringify(basicObj));
          root = basicObj;
        } else {
          root = JSON.parse(localStorage.getItem('treeAppData'));
        }
      } else {
        root = basicObj;
      }
      return root;
    }

    function updateTree() {
      localStorage.setItem('treeAppData', JSON.stringify(root));
    }

    function addChild(parentId) {
      var parent = getChild(parentId);
      var newId = '';
      parent.children = parent.children || {};
      newId = parentId + '-' + parent.nextChildId++;
      parent.children[newId] = {
        parent: parent,
        id: newId,
        children: 0,
        nextChildId: 0
      }
      updateTree();
      return newId;
    }

    function getChild(id) {
      return getChildIterative(id);
    }

    function removeChild(id) {
      var item = getChild(id);
      delete item.parent.children[id];
      updateTree();
    }

    function getChildIterative(id) {
      var i = 1;
      var path = id.split('-');
      var pathLength = path.length;
      var parent = root;
      var temp = 'root';

      if (pathLength === 1) {
        return root;
      }

      while (i < pathLength-1) {
        temp += '-' + path[i++];
        if (!parent.children.hasOwnProperty(temp)) {
          console.error('No item with this id')
          return null;
        }
        parent = parent.children[temp];        
      }
      return parent.children[id];
    }

    return {
      get: get,
      updateTree: updateTree,
      getChild: getChild,
      addChild: addChild,
      removeChild: removeChild
    }
  })();

  return app;
}(TreeApp || {}));
