Template[getTemplate('scyborgNav')].helpers({
  activePathClass: function (path) {
    return Router.current().route.path() == path ? 'active' : '';
  }
});
