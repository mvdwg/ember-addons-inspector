/* jshint node: true */
'use strict';

var path = require('path');

function AddonMetadata(emberAddon, path) {
  this.emberAddon = emberAddon;
  this.path = path; // path to package.json

  this.name = null;
  this.moduleName = null;
  this.description = null;
  this.version = null;
  this.homepage = null;
  this.bugs = null;
  this.repository = null;
  this.author = null;
  this.license = null;
  this.isInvalid = false; // TRUE if we couldn't read metadata
}

AddonMetadata.prototype = {
  loadMetadata: function() {
    this.name = this.emberAddon.name;
    this.moduleName = this.emberAddon.moduleName && this.emberAddon.moduleName() || this.name;
    this.isDisabled = this.emberAddon.isEnabled && !this.emberAddon.isEnabled();

    var meta;
    try {
      meta = require(this.path);

      this.description = meta.description;
      this.version = meta.version || 'unknown version';
      this.homepage = meta.homepage;
      this.bugs = meta.bugs;
      this.repository = meta.repository;
      this.author = meta.author;
      this.license = meta.license;
    } catch(e) {
      // file doesn't exist
      if (!/Cannot find module/.test(e.toString())) {
        throw e;
      }

      this.description = "Couldn't find find info about this package";
      this.version = 'unknown version';
      this.isInvalid = true;
    }
  }
};

// See https://ember-cli.com/api/classes/Command.html for options
var Command = require('ember-cli/lib/models/command');

module.exports = Command.extend({
  name: 'inspect',
  description: 'Returns the list of all installed addons',
  works: 'insideProject',

  run: function(/*commandOptions*/) {
    var ui = this.ui;
    var project = this.project;

    if (this.project.isEmberCLIAddon()) {
      ui.writeLine('Inspecting addon...');
    } else {
      ui.writeLine('Inspecting app...');
    }
    ui.writeLine('');

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

    ui.writeLine('Found ' + addons.length + ' addon(s), ' + addons.filter(function(a) { return a.isDisabled; }).length + ' disabled.');
    ui.writeLine('');

      // that.ui.writeLine(Object.keys(addon).join(', '));

    addons.forEach(function(metadata) {
      ui.writeLine('* ' + metadata.name + ' (' + metadata.version + ')');
      ui.writeLine('  ' + metadata.description);
      ui.writeLine('');

      // more data
      // ui.writeLine(metadata.name);
      // ui.writeLine('  description: ' + metadata.description);
      // ui.writeLine('      version: ' + metadata.version);
      // ui.writeLine('     homepage: ' + metadata.homepage);
      // ui.writeLine('         bugs: ' + metadata.bugs);
      // ui.writeLine('   repository: ' + metadata.repository);
      // ui.writeLine('       author: ' + metadata.author);
      // ui.writeLine('      license: ' + metadata.license);

      // ui.writeLine('-------------------');
    });
  }
});
