module.exports = function (grunt) {
    grunt.config.merge({
        jasmine: {
            global: {
                src: 'dist/baseclass.min.js',
                options: {
                    specs: 'tests/global/*.spec.js'
                }
            },
            modules: {
                src: 'bin/tests/*.js'
            },
            options: {
                display: 'full',
                summary: false
            }
        }
    });
};
