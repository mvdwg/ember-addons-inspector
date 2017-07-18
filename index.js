/* eslint-env node */
'use strict';

module.exports = {
  name: 'ember-addons-inspector',

  // Indicates ember-cli to watch for file changes in the addon
  isDevelopingAddon: function() {
    return true;
  },

  // Return an array of commands to add to ember-cli
  includedCommands: function() {
    return require('./lib/commands');
  }
};
