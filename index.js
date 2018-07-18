var selenium = require('selenium-standalone');

module.exports = function(gemini, opts) {
  var server;
  var successCriteria = (opts.successCriteria instanceof RegExp) ? opts.successCriteria : /main: Started.*HTTP/;

  gemini.on('startRunner', function(runner) {
    console.log('Starting Selenium ...');

    var ret = new Promise(function(resolve, reject) {
      selenium.start(function(err, child) {
        server = child;
        server.stderr.on('data', function(data) {
          if (successCriteria.test(data.toString())) {
            resolve();
          }
          }
        });
      });
    });
    return ret;
  });

  gemini.on('endRunner', function(runner, data) {
    console.log('Selenium closed.');
    return server.kill();
  });
};
