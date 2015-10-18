var TreeApp = (function (app) {
  'use strict';
  app.tree = (function() {
    var root = {};

    function get() {
      return root;
    }

    function set(tree) {
      root = tree;
    }

    function addChild(parentId) {
      var parent = getChild(parentId);
      var newId = '';
      ++parent.children;
      newId = parentId + '-' + ++parent.nextChildId;
      parent[newId] = {
        parent: parent,
        id: newId,
        children: 0,
        nextChildId: 0
      }
    }

    function getChild(id) {
      return getChildIterative(id);
    }

    function removeChild(id) {
      var item = getChild(id);
      --item.parent.children;
      delete item.parent[id];
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
        if (!parent.hasOwnProperty(temp)) {
          console.error('No item with this id')
          return null;
        }
        parent = parent[temp];        
      }
      return parent[id];
    }

    return {
      get: get,
      set: set,
      getChild: getChild

    }
  })();

  return app;
}(TreeApp || {}));
