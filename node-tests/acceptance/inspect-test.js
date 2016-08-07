var assert = require('assert');
var exec = require('child_process').exec;

function contains(str, value) {
  return str.indexOf(value) !== -1;
}

describe('Acceptance', function() {
  it('prints the list of addons', function(done) {
    this.timeout(300000);

    exec('ember inspect', function(_, stdout) {
      assert.ok(contains(stdout, 'ember-welcome-page (1.0.3)'));
      assert.ok(contains(stdout, 'Welcome page for Ember-CLI'));
      done();
    });
  });
});
