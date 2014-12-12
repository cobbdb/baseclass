module.exports = function (grunt) {
    require('matchdep').filterDev([
        'grunt-*',
        '!grunt-template-*'
    ]).forEach(grunt.loadNpmTasks);
    grunt.loadTasks('tasks');

    grunt.registerTask('default', 'Full build suite.', [
        'jshint',
        'browserify',
        'uglify',
        'jasmine'
    ]);
    grunt.registerTask('test', 'Run all unit tests.', [
        'browserify',
        'jasmine'
    ]);
};
