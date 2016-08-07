/* jshint node: true */
'use strict';

var path = require('path');
var AddonMetadata = require('../models/addon-metadata');
var AddonsListBuilder = require('../builders/addons-list');

// See https://ember-cli.com/api/classes/Command.html for options
var Command = require('ember-cli/lib/models/command');

module.exports = Command.extend({
  name: 'inspect',
  description: 'Returns the list of all installed addons',
  works: 'insideProject',

  anonymousOptions: [
    '<addon-name>'
  ],

  run: function(commandOptions, rawArgs) {
    commandOptions.addonName = rawArgs.shift();

    var ui = this.ui;
    var project = this.project;
    var addons = [];
    var metadata;

    this.project.addons.forEach(function(addon) {
      // FIXME: How do we get the path to package.json correctly?
      metadata = new AddonMetadata(addon, path.join(project.root, 'node_modules', (addon.moduleName && addon.moduleName() || addon.name), 'package.json'));
      addons.push(metadata);

      try {
        metadata.loadMetadata();
      } catch(e) {
        ui.writeDebugLine('Error reading metadata of: ' + addon.name);
        ui.writeError(e);
      }
    });

    var builder = new AddonsListBuilder(this.project.isEmberCLIAddon(), addons.length);
    builder.banner();

    if (commandOptions.addonName) {
      metadata = addons.filter(function(metadata) {
        return metadata.name === commandOptions.addonName;
      })[0];

      if (!metadata) {
        builder.printAddonNotFoundError(commandOptions.addonName);
      } else {
        builder.printAddonFull(metadata);
      }
    } else {
      addons.forEach(function(metadata) {
        builder.printAddon(metadata);
      });
    }
  }
});
