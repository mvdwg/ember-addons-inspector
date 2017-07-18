var assert = require('chai').assert;
var exec = require('child_process').exec;

var PACKAGE = require('ember-ajax/package.json');

describe('Acceptance', function() {
  it('ember inspect:all', function(done) {
    this.timeout(300000);

    exec('ember inspect:all', function(_, stdout) {
      assert.include(stdout, PACKAGE.name + ' (' + PACKAGE.version + ')');
      assert.include(stdout, PACKAGE.description);
      done();
    });
  });

  it('ember inspect ember-source', function(done) {
    this.timeout(300000);

    exec('ember inspect:all', function(_, stdout) {
      assert.include(stdout, PACKAGE.name + ' (' + PACKAGE.version + ')');
      assert.include(stdout, PACKAGE.description);
      done();
    });
  });
});
