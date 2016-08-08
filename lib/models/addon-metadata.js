/* jshint node: true */
'use strict';

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

      if (meta.bugs && meta.bugs.url) {
        this.bugs = meta.bugs.url;
      }

      this.repository = meta.repository;

      if (meta.repository && meta.repository.url) {
        this.repository = meta.repository.url;
      }

      this.author = meta.author;

      if (meta.author && meta.author.name) {
        this.author = meta.author.name;
        if (meta.author.email) {
          this.author += ' (' + meta.author.email + ')';
        }
      }

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

module.exports = AddonMetadata;
