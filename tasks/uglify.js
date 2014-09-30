module.exports = function (grunt) {
    grunt.config.merge({
        uglify: {
            build: {
                files: {
                    'dist/baseclass.min.js': [
                        'src/*.js'
                    ]
                }
            }
        }
    });
};
