Package.describe({
  summary: 'Sovereign Cyborg UI Customizations',
  version: '0.1.0',
  name: 'scyborg-theme'
});

Package.onUse(function (api) {

  // --------------------------- 1. Meteor packages dependencies ---------------------------

  // automatic (let the package specify where it's needed)

  api.use([
    'tap:i18n',                   // internationalization package
    'iron:router',                // routing package
    'telescope-base',             // basic Telescope hooks and objects
    'telescope-lib',              // useful functions
    'telescope-i18n',             // internationalization wrapper
    'fourseven:scss'              // SCSS compilation package
  ]);

  // client

  api.use([
    'jquery',                     // useful for DOM interactions
    'underscore',                 // JavaScript swiss army knife library
    'templating'                  // required for client-side templates
  ], ['client']);

  // server

  api.use([
    //
  ], ['server']);

  // ---------------------------------- 2. Files to include ----------------------------------

  // i18n config (must come first)

  api.add_files([
    'package-tap.i18n'
  ], ['client', 'server']);

  // both

  /*api.add_files([
    'lib/custom_fields.js',
    'lib/hooks.js',
    'lib/main.js',
    'lib/routes.js',
    'lib/settings.js',
    'lib/templates.js'
  ], ['client', 'server']);*/

  // client

  api.add_files([
    //'lib/client/templates/custom_template.html',
    //'lib/client/templates/custom_template.js',
    //'lib/client/templates/customPostTitle.html',
    'lib/client/routes.js',
    'lib/client/postModules.js',
    'lib/client/templates/css.html',
    'lib/client/templates/mobile_nav.html',
    'lib/client/templates/nav.html',
    'lib/client/templates/nav.js',
    'lib/client/templates/about.html',
    'lib/client/templates/post_content.html',
    'lib/client/templates/post_content.js',
    'lib/client/stylesheets/_nav.scss',
    'lib/client/stylesheets/_posts.scss',
    'lib/client/stylesheets/screen.scss',
    'lib/client/templates.js',
  ], ['client']);

  api.add_files(getFilesFromFolder('scyborg-theme', 'public'), ['client']);

  // server

  /*api.add_files([
    'lib/server/publications.js'
  ], ['server']);    

  // i18n languages (must come last)

  api.add_files([
    'i18n/en.i18n.json',
  ], ['client', 'server']);

  // -------------------------------- 3. Variables to export --------------------------------*/

  api.export([
    'postModules'
  ]);

});


var getFilesFromFolder = (function () {

  var _=Npm.require("underscore");
  var fs=Npm.require("fs");
  var path=Npm.require("path");
  
  return function (packageName,folder){
    function walk(folder){
      var filenames = [];
      var folderContent = fs.readdirSync(folder);

      _.each(folderContent,function(filename){
        var absoluteFilename = folder + path.sep + filename;
        var stat=fs.statSync(absoluteFilename);

        if(stat.isDirectory()){
          filenames = filenames.concat(walk(absoluteFilename));
        }
        else{
          filenames.push(absoluteFilename);
        }
      });
      return filenames;
    }

    var cwd=process.cwd();
    process.chdir("packages"+path.sep+packageName);

    var result=walk(folder);
    process.chdir(cwd);
    return result;
  }
})();
