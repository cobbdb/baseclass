module.exports = function (grunt) {
    require('matchdep').filterDev([
        'grunt-*',
        '!grunt-template-*'
    ]).forEach(grunt.loadNpmTasks);
    grunt.loadTasks('tasks');

    grunt.registerTask('default', 'Full build suite.', [
        'jasmine:src',
        'jshint',
        'uglify',
        'jasmine:dist',
        'exec:test-import'
    ]);
    grunt.registerTask('test', 'Run all unit tests.', [
        'jasmine',
        'exec:test-import'
    ]);
};
