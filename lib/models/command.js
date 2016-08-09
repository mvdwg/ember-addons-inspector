/* jshint node: true */
'use strict';

function CommandMetadata(addon, command) {
  if (typeof command === 'function') {
    this.command = new command({ project: addon.project });
  } else {
    this.command = command;
  }

  this.name = this.command.name;
  this.description = this.command.description || '(no description)';
}

function CommandCollection(addonMetadata) {
  this.emberAddon = addonMetadata.emberAddon;
}

CommandCollection.prototype = {
  _load: function() {
    this.loaded = true;
    this.items = [];

    var items = this.items;
    var emberAddon = this.emberAddon;
    var includedCommands = (emberAddon.includedCommands && emberAddon.includedCommands()) || {};

    var Command = require('ember-cli/lib/models/command');

    Object.keys(includedCommands).forEach(function(key) {
      items.push(new CommandMetadata(emberAddon, includedCommands[key]));
    });
  },

  forEach: function(cb) {
    if (!this.loaded) {
      this._load();
    }

    this.items.forEach(cb);
  },

  length: function() {
    if (!this.loaded) {
      this._load();
    }

    return this.items.length;
  }
};

module.exports = {
  Collection: CommandCollection
};
