/*global describe, it*/
var exec = require('child_process').exec;
var assert = require('chai').assert;

var executable = 'node ' + __dirname + '/../bin/freight';

describe('track', function () {

  it('should fail on wrong password', function (done) {
    process.env.FREIGHT_PASSWORD = null;
    var cmd = executable + ' track https://github.com/vladikoff/freight-sample.git -u http://localhost:8872';

    exec(cmd,
      function (error, stdout, stderr) {
        assert.equal(stderr, '[Error: 403 Forbidden]\n');
        done();
      });
  });

  it('should error if no repository set', function (done) {
    process.env.FREIGHT_PASSWORD = 'test';
    var cmd = executable + ' track -u http://localhost:8872';

    exec(cmd,
      function (error, stdout, stderr) {
        assert.equal(stderr, '[Error: Specify the repository to track]\n');
        assert.notOk(stdout);
        done();
      });
  });

  it('should start tracking a repository', function (done) {
    this.timeout(20000);
    process.env.FREIGHT_PASSWORD = 'test';
    var cmd = executable + ' track https://github.com/vladikoff/freight-sample.git -u http://localhost:8872';

    exec(cmd,
      function (error, stdout, stderr) {
        assert.notOk(stderr);
        assert.equal(stdout, 'Tracking successfully setup for: https://github.com/vladikoff/freight-sample.git master\n');
        done();
      });
  });

  it('should start tracking a repository with a nested directory and a custom branch ', function (done) {
    this.timeout(20000);
    process.env.FREIGHT_PASSWORD = 'test';
    var cmd = executable + ' track https://github.com/vladikoff/freight-sample.git -u http://localhost:8872 ' +
      '--track-branch=dev --track-directory=app';

    exec(cmd,
      function (error, stdout, stderr) {
        assert.notOk(stderr);
        assert.equal(stdout, 'Tracking successfully setup for: https://github.com/vladikoff/freight-sample.git dev\n');
        done();
      });
  });

});
