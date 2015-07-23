var plotly = require('plotly')('cobbdb', '33n4vxsdab');

module.exports = function (grunt) {
    grunt.registerTask('plotly', function () {
        var versions, ops, rme, gaps, test, graphOptions, data,
            bench = require('../perf/benchmarks.json'),
            queue = Object.keys(bench).length;
            done = this.async();

        for (test in bench) {
            graphOptions = {
                filename: 'baseclass/' + test,
                fileopt: 'overwrite',
                layout: {
                    title: 'BaseClass: ' + test,
                    yaxis: {
                        title: '(ops/sec)',
                        overlaying: 'y2'
                    },
                    yaxis2: {
                        title: '(%)',
                        side: 'right',
                        domain: [0, 100],
                        titlefont: {
                            color: '#888'
                        },
                        tickfont: {
                            color: '#888'
                        }
                    },
                    xaxis: {
                        title: 'Version'
                    }
                }
            };
            versions = [];
            ops = [];
            rme = [];
            gaps = [];

            for (version in bench[test]) {
                versions.push(version);
                ops.push(bench[test][version].ops);
                rme.push(bench[test][version].rme);
                gaps.push(bench[test][version].gap);
            }

            data = [{
                name: 'Speed',
                x: versions,
                y: ops,
                error_y: {
                    type: 'data',
                    array: rme,
                    visible: true
                },
                type: 'scatter',
                symbol: 'dot'
            }, {
                name: 'Gap',
                x: versions,
                y: gaps,
                type: 'bar',
                yaxis: 'y2'
            }];

            plotly.plot(data, graphOptions, function (err, msg) {
                console.log(msg);
                queue -= 1;
                if (queue === 0) {
                    done();
                }
            });
        }
    });
};
