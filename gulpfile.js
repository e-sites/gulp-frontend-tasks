(function (global) {

	'use strict';

	// Expose config, Gulp and some plugins that are used by multiple tasks
	global.conf = {
		'path': {
			'css': './assets/css',
			'svg': './assets/svg',
			'js': './assets/js',
			'sprite': './assets/images/sprites',
			'tasks': './assets/js/tasks'
		}
	};
	global.gulp = require('gulp');
	global.plumber = require('gulp-plumber');
	global.sourcemaps = require('gulp-sourcemaps');
	global.fs = require('fs');

	var requireDir = require('require-dir'),
		notify = require('gulp-notify'),
		defaultTasks = [],
		deployTasks = [],
		watchTasks = [];

	/**
	 * Default error handler for task specific errors
	 *
	 * @param  {String} taskName Name of the task you want to register the error handler for
	 * @param  {String} msg      Text of the message
	 */
	global._plumbError = function (taskName, msg) {
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
	global._notifySuccess = function (taskName, msg) {
		return notify({
			title: taskName,
			message: 'Success: ' + msg
		});
	};

	/**
	 * Register helper to let subtasks register themselves in the 'default' gulp task
	 *
	 * @param  {String} type Type of task to register ('default', 'deploy' or 'watch' task)
	 * @param  {String|Array} tasks Task name to register in 'default' task
	 * @param  {String|Array} folder Folder to watch when registering a watch task
	 */
	global._registerTask = function (type, tasks, folder) {
		if ( !type ) {
			console.log('Error registering task: Please specify a task type (default, deploy or watch)');
			return;
		}

		if ( !tasks ) {
			console.log('Error registering task: Please specify a task type (default, deploy or watch)');
			return;
		}

		switch (type) {
			case 'default':
				defaultTasks = defaultTasks.concat(tasks);
				break;
			case 'deploy':
				deployTasks = deployTasks.concat(tasks);
				break;
			case 'watch':
				if ( !folder ) {
					console.log('Error registering watch task: Please specify a folder to watch');
					return;
				}

				if ( !(tasks.constructor === Array) ) {
					tasks = [tasks];
				}

				watchTasks = watchTasks.concat({
					tasks: tasks,
					folders: folder
				});

				break;
			default:
				console.log('Error: WHY U NO SPECIFY CORRECT TASK TYPE?');
				break;
		}
	};

	// Load all tasks
	requireDir(conf.path.tasks, {recurse: true});

	// Default task when run with 'gulp'
	gulp.task('default', defaultTasks);

	// Default task when run with 'gulp deploy'
	gulp.task('deploy', deployTasks);

	// Watch task when run with 'gulp watch'
	gulp.task('watch', function () {
		watchTasks.forEach(function(task) {
			gulp.watch(task.folders, task.tasks);
		});
	});
}(global));