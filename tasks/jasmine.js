module.exports = function (grunt) {
    grunt.config.merge({
        jasmine: {
            dist: {
                src: 'dist/bower/*.js',
                options: {
                    specs: [
                        'tests/*.spec.js'
                    ]
                }
            },
            src: {
                src: 'src/baseclass.js',
                options: {
                    specs: 'tests/*.spec.js'
                }
            },
            options: {
                helpers: 'tests/helpers/*.helper.js',
                display: 'full',
                summary: false
            }
        }
    });
};
