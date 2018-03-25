module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha'],
    files: [
      'test/*.test.js'
    ],
    preprocessors: {
      '**/*.js': ['electron']
    },
    reporters: ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Electron'],
    singleRun: true,
    concurrency: Infinity,
    client: {
      useIframe: false,
      loadScriptsViaRequire: true
    }
  });
};
