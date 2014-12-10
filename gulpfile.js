(function (global) {

	'use strict';

	// Expose config, Gulp and some plugins that are used by multiple tasks
	global.conf = require('./assets/js/tasks/config.json');
	global.gulp = require('gulp');
	global.plumber = require('gulp-plumber');
	global.sourcemaps = require('gulp-sourcemaps');

	var requireDir = require('require-dir'),
		notify = require('gulp-notify');

	global._plumbError = function (taskName, msg) {
		return plumber({
			errorHandler: notify.onError({
				title: taskName,
				message: 'Error: ' + msg
			})
		});
	};

	global._notifySuccess = function (taskName, msg) {
		return notify({
			title: taskName,
			message: 'Success: ' + msg
		});
	};

	// Load all tasks
	requireDir(conf.path.tasks);

	// Default task when run with 'gulp'
	gulp.task('default', ['glue', 'svg', 'svg2png', 'less', 'js']);

}(global));