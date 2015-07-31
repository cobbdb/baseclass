var $ = require('curb'),
    fs = require('fs'),
    stats = require('../perf/stats.js'),
    bench = require('../perf/benchmarks.json'),
    currentVersion = require('../package.json').version,
    testNirvana = require('../perf/nirvana.spec.js'),
    testCurrent = require('../perf/current.spec.js');

module.exports = function (grunt) {
    grunt.registerTask('benchmark', function () {
        testNirvana.run();
        testCurrent.run();
    });

    grunt.registerTask('perf-current', function () {
        testCurrent.run();
    });

    grunt.registerTask('perf-report', function () {
        var test, currentBest, nirvanaWorst, diff, version,
            write = false;

        for (test in stats.nirvana) {
            currentBest = stats.current[test].hz * (1 - stats.current[test].rme / 100);
            nirvanaWorst = stats.nirvana[test].hz * (1 + stats.nirvana[test].rme / 100);
            diff = Math.round(-(currentBest - nirvanaWorst) / nirvanaWorst * 100);
            console.log($('\n*** %s performance gap = %s%', test, diff));
            if (test in bench) {
                for (version in bench[test]) {
                    console.log($('\t> %s gap = %s%', version, bench[test][version].gap));
                }
            } else {
                bench[test] = {};
            }
            if (!(currentVersion in bench[test])) {
                write = true;
                bench[test][currentVersion] = {
                    gap: diff,
                    ops: stats.current[test].hz,
                    rme: stats.current[test].hz * stats.current[test].rme / 100
                };
            }
        }

        // Record new version performance.
        if (write) {
            fs.writeFileSync('perf/benchmarks.json', JSON.stringify(bench, null, 2));
        }
    });
};
