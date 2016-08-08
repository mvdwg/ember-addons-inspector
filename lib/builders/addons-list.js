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

  printMetadata: function(addon) {
    console.log(chalk.bold(addon.name) + ' (' + addon.version + ') ');
    console.log(addon.description);
    console.log('');
  }
};

module.exports = AddonsListBuilder;
