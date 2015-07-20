var stats = require('./stats.js'),
    thing = {
        setname: function (name) {
            this.name = name;
        },
        applyname: function () {
            this.setname.apply(this, arguments);
        }
    };

module.exports = {
    name: 'current',
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
            thing.setname.apply(thing, ['bob']);
        },
        applynameWargs: function () {
            thing.applyname('bob');
        },
        callname: function () {
            thing.setname.call(thing, 'bob');
        }
    },
};
