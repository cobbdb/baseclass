module.exports = function (grunt) {
    // Load all grunt NPM tasks.
    require('matchdep').filterDev([
        'grunt-*',
        '!grunt-template-*'
    ]).forEach(grunt.loadNpmTasks);
    // Load harmony task confs.
    grunt.loadTasks('tasks');

    grunt.registerTask('default', 'Build without docs.', [
        'jasmine:src',
        'jshint',
        'uglify',
        'jasmine:dist'
    ]);
    grunt.registerTask('test', 'Run unit tests.', [
        'jasmine'
    ]);
};
