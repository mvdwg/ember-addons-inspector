var chalk = require('chalk');

function AddonBuilder(addon) {
  this.addon = addon;
}

AddonBuilder.prototype = {
  banner: function() {
    console.log(this.addon.description);
    console.log('');
  },

  printMetadata: function() {
    var addon = this.addon;

    console.log('      version: ' + addon.version);
    console.log('     homepage: ' + addon.homepage);
    console.log('         bugs: ' + addon.bugs);
    console.log('   repository: ' + addon.repository);
    console.log('       author: ' + addon.author);
    console.log('      license: ' + addon.license);
    console.log('');
  },

  printNotFoundError: function(addonName) {
    console.log("Couldn't find addon " + chalk.bold(addonName));
  },

  printBlueprints: function(blueprints) {
    if (!blueprints.length()) {
      console.log('   Blueprints: none');
    } else {
      console.log('   Blueprints:');
      blueprints.forEach(function(blueprint) {
        console.log('     ' + chalk.bold(blueprint.name) + ' - ' + blueprint.description);
      });
    }
    console.log('');
  },

  printCommands: function(commands) {
    if (!commands.length()) {
      console.log('   Commands: none');
    } else {
      console.log('   Commands:');
      commands.forEach(function(command) {
        console.log('     ' + chalk.bold(command.name) + ' - ' + command.description);
      });
    }
    console.log('');
  }
};

module.exports = AddonBuilder;
