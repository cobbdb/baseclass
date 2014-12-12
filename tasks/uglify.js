module.exports = function (grunt) {
    grunt.config.merge({
        uglify: {
            global: {
                files: {
                    'dist/baseclass.min.js': [
                        'bin/baseclass.js'
                    ]
                }
            }
        }
    });
};
