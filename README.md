# Gulp front-end tasks
> A bundle of useful Gulp tasks to automate your front-end workflow.

## Introduction
At E-sites we use this bundle of pre-configured tasks to automate our front-end workflow. This bundle contains an install script which reads the required dependencies of each task and installs them automatically through npm. This way you can add and remove tasks at will and it will only install the required dependencies that you include in your project.

## Tasks
* LESS compilation including source maps
* Generate custom jQuery builds
* Generate CSS sprites with Glue
* Generate SVG sprites
* Create JS builds (concatenation, minification) with source maps
* Precompiling and concatenation of external Handlebars templates

Have a task of your own you would like to see added to this bundle? See [Adding tasks](#adding-tasks) and submit a pull request containing the folder with the task .js and .json files.

## Configuration
By default, we have set up our tasks to live in the `/assets/js/tasks/` folder. Using the same preconfigured paths as this repo? Continue to [Getting started](#getting-started). Otherwise, read on.

If you want to put these tasks in a different folder, you will have to change some paths first in the gulpfile and dependency installer.

* In `gulpfile.js`, change the `conf.path.tasks` property to match the folder containing all the tasks
* In `assets/js/install-deps.js`, change the path of the `walker` module at the top of the file

Once this is configured to match your folder setup, you are good to go.

### Paths
Some tasks share (parts of) paths to certain resources. The gulpfile contains a global config object which contains the basic paths to these resources. Every task has the availability of these paths through the global `conf.path` property.

Once you add multiple tasks which share paths to certain resources which don't exist in the config yet, you may add that path as another property to the global config. That way the path is immediately available in all tasks that require it.

## Getting started
1. Make a checkout of this repository
2. Add/delete the tasks you (don't) need
3. Run `npm install`
4. Profit

## Adding tasks
If you want to add a new tasks and would like to register it with this workflow, follow these steps:

* Create a folder with the name of your task
* Add a .js file and a task.json to this folder
* In the .js file, code your task
* In the .json file, specify the task dependencies (this is read by the dependency installer)
* Use the available global `_registerTask()` method to register your task as a default, deploy or watch task

### _registerTask API
The _registerTask method accept three parameters:
1. The type of task (default, deploy or watch)
2. The subtasks to register
3. (Optional) The folder to watch when specifying a watch task

Examples:

```javascript
// Default task registering for 'gulp' command
_registerTask('default', 'foo');

// Deploy task registering for 'gulp deploy' command
_registerTask('deploy', 'bar');

// Watch task registering for 'gulp watch' command
_registerTask('watch', 'baz', 'path/to/folder');
```

### Notifications
This bundle also contains default error handling and notification modules ([gulp-plumber](https://github.com/floatdrop/gulp-plumber) and [gulp-notify](https://github.com/mikaelbr/gulp-notify)). These modules are available as well through global methods, so you are able to use them in your task.

The global methods are:

* `_plumbError(taskName, errorMessage)`
* `_notifySuccess(taskName, successMessage)`

Example:

```javascript
// Foo task with gulp-plumber errro handling and gulp-notify error and success notifications
gulp.task('foo', function () {
	return gulp.src('path/to/source')
		.pipe(_plumbError('foo', 'Error message'))
		.pipe(gulp.dest('path/to/dest'))
		.pipe(_notifySuccess('foo', 'Success message'));
});
```

## License
Copyright (C) 2014 E-sites, <a href="http://www.e-sites.nl/">http://e-sites.nl/</a> Licensed under the MIT license.