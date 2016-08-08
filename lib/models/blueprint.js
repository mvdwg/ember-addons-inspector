/* jshint node: true */
'use strict';

function BlueprintMetadata(addonName, blueprint) {
  this.addonName = addonName;
  this.blueprint = blueprint;
  this.name = blueprint.name;
  // If the blueprint doesn't have a description and is the installer addon, mark it
  this.description = blueprint.description || (this.name === this.addonName ? 'Installer blueprint' : '(no description)');
}

function BlueprintCollection(addonMetadata) {
  this.emberAddon = addonMetadata.emberAddon;
  this.source = addonMetadata.name;
}

BlueprintCollection.prototype = {
  _load: function() {
    this.loaded = true;
    this.items = [];

    var Blueprint = require('ember-cli/lib/models/blueprint');
    var lookupPath   = this.emberAddon.blueprintsPath();

    if (!lookupPath) {
      return;
    }

    var source = this.source;
    var blueprintCollection = Blueprint.list({ paths: [lookupPath] }).filter(function(collection) {
      return collection.source === source;
    })[0];

    if (blueprintCollection) {
      var items = this.items;
      blueprintCollection.blueprints.forEach(function(blueprint) {
        items.push(new BlueprintMetadata(source, blueprint));
      });
    }
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
  Collection: BlueprintCollection
};
