// Karma configuration
// Generated on Sun Jan 31 2016 20:00:44 GMT+0800 (Malay Peninsula Standard Time)

module.exports = function(config) {
  
  var configuration = {

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      // dependency
      '../bower_components/angular/angular.min.js',
      '../bower_components/angular-ui-router/release/angular-ui-router.min.js',
      '../bower_components/angular-mocks/angular-mocks.js',
      '../public/*.js',
      '../public/controllers/*.js',
      '../public/services/*.js',
      '../public/vumixEditorApp/*.js',
      '../public/vumixEditorApp/services/*.js',
      '../public/vumixEditorApp/controllers/*.js',
      // test
      'client/*.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {      
      '../public/*.js': ['coverage'],
      '../public/controllers/*.js': ['coverage'],
      '../public/services/*.js': ['coverage']
      '../public/vumixEditorApp/*.js': ['coverage'],      
      '../public/vumixEditorApp/services/*.js': ['coverage'],
      '../public/vumixEditorApp/controllers/*.js': ['coverage']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter   
    reporters: ['progress', 'coverage'],
     
    coverageReporter: {
      dir: 'coverage/jasmine/',
      reporters: [
        { type: 'html', subdir: 'html' },
        { type: 'lcov', subdir: 'lcov' }
      ]
    },
    

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],
    
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  };  
  
  if(process.env.TRAVIS){
    configuration.browsers = ['Chrome_travis_ci'];
  }  
  
  config.set(configuration);
}
