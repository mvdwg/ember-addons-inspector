var assert = require('assert');
var exec = require('child_process').exec;

function contains(str, value) {
  return str.indexOf(value) !== -1;
}

describe('Acceptance', function() {
  it('ember inspect:all', function(done) {
    this.timeout(300000);

    exec('ember inspect:all', function(_, stdout) {
      assert.ok(contains(stdout, 'ember-welcome-page (1.0.3)'));
      assert.ok(contains(stdout, 'Welcome page for Ember-CLI'));
      done();
    });
  });

  it('ember inspect ember-welcome-page', function(done) {
    this.timeout(300000);

    exec('ember inspect:all', function(_, stdout) {
      assert.ok(contains(stdout, 'ember-welcome-page (1.0.3)'));
      assert.ok(contains(stdout, 'Welcome page for Ember-CLI'));
      done();
    });
  });
});
