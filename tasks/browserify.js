var fs = require('fs');

module.exports = function (grunt) {
    var specSet,
        name = grunt.option('spec');

    if (name) {
        specSet = [
            name + '.spec.js'
        ];
    } else {
        specSet = fs.readdirSync('tests').filter(function (name) {
            return name.indexOf('.spec.js') >= 0;
        });
    }

    grunt.config.merge({
        browserify: {
            global: {
                files: {
                    'bin/baseclass.js': [
                        'src/baseclass.js'
                    ]
                },
                options: {
                    browserifyOptions: {
                        standalone: 'BaseClass'
                    }
                }
            },
            tests: {
                files: specSet.reduce(function (prev, cur) {
                    prev['bin/tests/' + cur] = [
                        'tests/' + cur,
                        'tests/helpers/*.setup.js'
                    ];
                    return prev;
                }, {})
            }
        }
    });
};
