var selenium = require('selenium-standalone');

module.exports = function(gemini, opts) {
  var server;

  gemini.on('startRunner', function(runner) {
    console.log('Starting Selenium ...');

    var ret = new Promise(function(resolve, reject) {
      selenium.start(function(err, child) {
        server = child;
        server.stderr.on('data', function(data) {
          if (/main: Started.*HTTP/.test(data.toString())) {
            console.log(data.toString());
            resolve();
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

