var chalk = require('chalk');

function AddonsListBuilder(isEmberCLIAddon, count) {
  this.isEmberCLIAddon = isEmberCLIAddon;
  this.count = count;
}

AddonsListBuilder.prototype = {
  banner: function() {
    if (this.isEmberCLIAddon) {
      console.log('Inspecting addon...');
    } else {
      console.log('Inspecting app...');
    }

    console.log('');

    console.log('Found ' + chalk.green(this.count) + ' addon(s).');
    console.log('');
  },

  printAddon: function(addon) {
    console.log(addon.name + ' (' + addon.version + ') ' + chalk.gray(addon.description));
  },

  printAddonFull: function(addon) {
    console.log(chalk.bold(addon.name));
    console.log('');
    console.log('  description: ' + addon.description);
    console.log('      version: ' + addon.version);
    console.log('     homepage: ' + addon.homepage);
    console.log('         bugs: ' + addon.bugs);
    console.log('   repository: ' + addon.repository);
    console.log('       author: ' + addon.author);
    console.log('      license: ' + addon.license);
  },

  printAddonNotFoundError: function(addonName) {
    console.log("Couldn't find addon " + chalk.bold(addonName));
  }
};

module.exports = AddonsListBuilder;
