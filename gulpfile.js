(function (global) {

	'use strict';

	// Expose config, Gulp and some plugins that are used by multiple tasks
	global.conf = {
		'path': {
			'css': './assets/css',
			'svg': './assets/svg',
			'js': './assets/js',
			'sprite': './assets/images/sprites',
			'tasks': './assets/js/tasks/'
		}
	};
	global.gulp = require('gulp');
	global.plumber = require('gulp-plumber');
	global.sourcemaps = require('gulp-sourcemaps');
	global.tasker = require('gulp-tasker')({
		path: '/assets/js/tasks'
	});
	global.fs = require('fs');

	var notify = require('gulp-notify');

	tasker.loadTasks();

	/**
	 * Default error handler for task specific errors
	 *
	 * @param  {String} taskName Name of the task you want to register the error handler for
	 * @param  {String} msg      Text of the message
	 */
	global.handleError = function (taskName, msg) {
		return plumber({
			errorHandler: notify.onError({
				title: taskName,
				message: 'Error: ' + msg
			})
		});
	};

	/**
	 * Default success notification handler for all tasks
	 *
	 * @param  {String} taskName Name of the task you want to register the success handler for
	 * @param  {String} msg      Text of the message
	 */
	global.handleSuccess = function (taskName, msg) {
		return notify({
			title: taskName,
			message: 'Success: ' + msg
		});
	};

	// Default task when run with 'gulp'
	gulp.task('default', tasker.getTasks('default'));

	// Default task when run with 'gulp deploy'
	gulp.task('deploy', tasker.getTasks('deploy'));

	// Watch task when run with 'gulp watch'
	gulp.task('watch', function () {
		tasker.getTasks('watch').forEach(function(task) {
			gulp.watch(task.folders, task.tasks);
		});
	});
}(global));