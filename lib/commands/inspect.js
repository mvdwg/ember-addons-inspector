/* jshint node: true */
'use strict';

// See https://ember-cli.com/api/classes/Command.html for options
var Command = require('ember-cli/lib/models/command');

module.exports = Command.extend({
  name: 'inspect',
  description: 'Inspect a specific addon',
  works: 'insideProject',

  anonymousOptions: [
    '<addon-name>'
  ],

  run: function(commandOptions, rawArgs) {
    var path = require('path');
    var BlueprintCollection = require('../models/blueprint').Collection;
    var CommandCollection = require('../models/command').Collection;
    var AddonMetadata = require('../models/addon-metadata');
    var AddonBuilder = require('../builders/addon');

    commandOptions.addonName = rawArgs.shift();

    var ui = this.ui;
    var project = this.project;
    var addons = [];
    var metadata;

    if (!commandOptions.addonName) {
      ui.writeError('Usage: ember inspect <addon-name>');
      return;
    }

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

    metadata = addons.filter(function(metadata) {
      return metadata.name === commandOptions.addonName;
    })[0];

    var builder = new AddonBuilder(metadata);

    if (!metadata) {
      builder.printNotFoundError(commandOptions.addonName);
    } else {
      builder.banner();
      builder.printMetadata(metadata);
      builder.printBlueprints(new BlueprintCollection(metadata));
      builder.printCommands(new CommandCollection(metadata));
    }
  }
});
