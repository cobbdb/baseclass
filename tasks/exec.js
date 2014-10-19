module.exports = function (grunt) {
    grunt.config.merge({
        exec: {
            'test-import': {
                cmd: 'npm run test-import'
            }
        }
    });
};
