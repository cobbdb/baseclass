module.exports = function (grunt) {
    require('matchdep').filterDev([
        'grunt-*',
        '!grunt-template-*'
    ]).forEach(grunt.loadNpmTasks);
    grunt.loadTasks('tasks');

    grunt.registerTask('default', 'Full build suite.', [
        'browserify',
        'jasmine:modules',
        'jshint',
        'uglify:global',
        'jasmine:global'
    ]);
    grunt.registerTask('test', 'Run tests.', [
        'browserify:tests',
        'jasmine:modules'
    ]);
    grunt.registerTask('perf', 'Run performance tests.', [
        'benchmark',
        'perf-report'
    ]);
};
