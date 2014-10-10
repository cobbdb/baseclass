module.exports = function (grunt) {
    grunt.config.merge({
        uglify: {
            'build-bower': {
                files: {
                    'dist/bower/baseclass.min.js': [
                        'src/baseclass.js'
                    ]
                }
            },
            'build-node': {
                files: {
                    'dist/node/baseclass.min.js': [
                        'src/*.js'
                    ]
                },
                options: {
                    enclose: {}
                }
            }
        }
    });
};
