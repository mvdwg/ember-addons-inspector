/* jshint node: true */
'use strict';

// See https://ember-cli.com/api/classes/Command.html for options
var Command = require('ember-cli/lib/models/command');

module.exports = {
  addons: Command.extend({
    name: 'addons',

    description: 'Returns the list of installed addons',

    works: 'insideProject',

    run: function(/*commandOptions*/) {
      if (this.project.isEmberCLIAddon()) {
        this.ui.writeLine("Inspecting addon...");
      } else {
        this.ui.writeLine("Inspecting app...");
      }
      this.ui.writeLine("");

      var that = this;

      this.project.addons.forEach(function(addon) {
        if (addon.isEnabled && !addon.isEnabled()) {
          that.ui.writeLine(' * [disabled] ' + addon.name);
        } else {
          that.ui.writeLine(' * ' + addon.name + ', module: ' +  (addon.moduleName && addon.moduleName() || addon.name));
        }
        // that.ui.writeLine(Object.keys(addon).join(', '));
      });

    }
  })
};
