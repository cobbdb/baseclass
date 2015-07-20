var $ = require('curb'),
    fs = require('fs'),
    stats = require('../perf/stats.js'),
    bench = require('../perf/benchmarks.json');

module.exports = function (grunt) {
    grunt.config.merge({
        benchmark: {
            nirvana: {
                src: 'perf/nirvana.spec.js'
            },
            current: {
                src: 'perf/current.spec.js'
            }
        }
    });

    grunt.registerTask('perf-report', function () {
        var test, currentBest, nirvanaWorst, diff,
            score = '',
            log = {};

        for (test in stats.nirvana) {
            currentBest = stats.current[test].hz * (1 - stats.current[test].rme / 100);
            nirvanaWorst = stats.nirvana[test].hz * (1 + stats.nirvana[test].rme / 100);
            diff = Math.round(-(currentBest - nirvanaWorst) / nirvanaWorst * 100);
            if (test in bench) {
                score = diff - bench[test];
                score = $(' (%s%)', score);
            }
            console.log($('\t>>> %s performance gap = %s%%s', test, diff, score));
            log[test] = diff;
        }
        fs.writeFileSync('perf/benchmarks.json', JSON.stringify(log, null, 2));
    });
};
