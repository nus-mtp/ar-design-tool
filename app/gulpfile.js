var gulp = require('gulp');
var sass = require('gulp-sass');

// testing
var istanbul  = require('gulp-istanbul');
var codecov   = require('gulp-codecov');
var mocha     = require('gulp-mocha');
var open      = require('gulp-open');
var karma     = require('karma');

//linting
var jshint = require('gulp-jshint');
var jshintStylish = require('jshint-stylish');
var sassLint = require('gulp-sass-lint');

gulp.task('lint',['sasslint', 'jslint'],function() {
});

gulp.task('sasslint', function(){
    return gulp.src('public/resources/sass/*.scss')
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
});

gulp.task('jslint', function(){
    return gulp.src(['public/**/*.js', '!public/resources/**/*.js', 'server/**/*.js', '!server/unity/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter(jshintStylish));
});

gulp.task('frontend-test', function(done) {
  return new karma.Server({
    configFile: __dirname + '/test/karma.conf.js',
    action: 'run',
    singleRun: true
  }, function() {
    done();  
  }).start();
});

gulp.task('open-frontend-coverage', ['frontend-test'], function() {
  return gulp.src('./test/coverage/jasmine/lcov/lcov-report/index.html')
    .pipe(open({ app: 'chrome' }));
});

gulp.task('prepare-istanbul-reporter', function() {
  return gulp.src(['server/*.js', 'server/**/*.js', '!server/modules/passport.js', '!server/unity/**'])
    .pipe(istanbul({includeUntested: true}))
    .pipe(istanbul.hookRequire());
});

gulp.task('backend-test', ['prepare-istanbul-reporter'], function() {
  return gulp.src(['test/server/*.js'])
    .pipe(mocha())
    .pipe(istanbul.writeReports({ 
      reportOpts: {
        lcov: { dir: './test/coverage/mocha/lcov', file: 'lcov.info' }
      }
    })); 
});

gulp.task('open-backend-coverage', ['backend-test'], function() {
  return gulp.src('./test/coverage/mocha/lcov/lcov-report/index.html')
    .pipe(open({ app: 'chrome' }));
});

gulp.task('test:local', ['open-frontend-coverage', 'open-backend-coverage', 'lint', 'sasslint'], function() {
  
})

gulp.task('test:ci', ['frontend-test', 'backend-test', 'lint', 'sasslint'], function() {
  return gulp.src(['./test/coverage/mocha/lcov/lcov.info', './test/coverage/jasmine/lcov/lcov.info'])
    .pipe(codecov());
});

gulp.task('default', ['sass', 'sass:watch'], function() {
});

gulp.task('sass', function () {
  return gulp.src('public/resources/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('public/resources/css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('public/resources/sass/*.scss', ['sass']);
});