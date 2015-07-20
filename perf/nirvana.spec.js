var stats = require('./stats.js'),
    thing = {
        setname: function (name) {
            this.name = name;
        },
        applyname: function () {
            this.setname.apply(this, arguments);
        },
        callname: function (arg1, arg2, arg3, arg4, arg5, arg6) {
            this.setname.call(this, arg1, arg2, arg3, arg4, arg5, arg6);
        }
    };

module.exports = {
    name: 'nirvana',
    async: true,
    defer: true,
    onStart: function (event) {
        stats[event.currentTarget.name] = {};
    },
    onCycle: function (event) {
        var suite = event.currentTarget.name,
            test = event.target.name,
            last;
        stats[suite][test] = stats[suite][test] || {};
        last = stats[suite][test];

        last.hz = event.target.hz;
        last.rme = event.target.stats.rme;
    },
    tests: {
        applyname: function () {
            thing.setname('bob');
        },
        applynameWargs: function () {
            thing.setname('bob');
        },
        callname: function () {
            thing.setname('bob');
        },
        callnameWargs: function () {
            thing.setname('bob');
        }
    },
};
