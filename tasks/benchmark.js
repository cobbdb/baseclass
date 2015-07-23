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

    grunt.registerTask('perf-report', function () {
        var test, currentBest, nirvanaWorst, diff, version,
            log = {};

        for (test in stats.nirvana) {
            currentBest = stats.current[test].hz * (1 - stats.current[test].rme / 100);
            nirvanaWorst = stats.nirvana[test].hz * (1 + stats.nirvana[test].rme / 100);
            diff = Math.round(-(currentBest - nirvanaWorst) / nirvanaWorst * 100);
            console.log($('\n*** %s performance gap = %s%', test, diff));
            log[test] = diff;
            for (version in bench) {
                if (test in bench[version]) {
                    console.log($('\t> %s gap = %s%', version, bench[version][test]));
                }
            }
        }

        // Record new version performance.
        if (!(currentVersion in bench)) {
            bench[currentVersion] = log;
            fs.writeFileSync('perf/benchmarks.json', JSON.stringify(bench, null, 2));
        }
    });
};
