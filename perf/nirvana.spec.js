var Benchmark = require('benchmark'),
    suite = Benchmark.Suite({
        name: 'nirvana'
    }),
    stats = require('./stats.js');

function Person(name, age) {
    return {
        name: name,
        age: age,
        gender: -99,
        greet: function () {
            return "Hi, I'm " + this.name + " and I'm a " + this.gender;
        }
    };
}
function Man(name, age) {
    var person = Person(name, age);
    person.gender = 'male';
    person.greet2 = function () {
        return person.greet() + '!';
    };
    person.bye = function () {
        return person.age + ' bye!';
    };
    return person;
}
var steve = Man('steve', 33);

module.exports = suite.
    on('start', function (event) {
        stats[event.currentTarget.name] = {};
        console.log('Testing ' + event.currentTarget.name);
    }).
    on('cycle', function (event) {
        var suite = event.currentTarget.name,
            test = event.target.name,
            last;
        stats[suite][test] = stats[suite][test] || {};
        last = stats[suite][test];

        last.hz = event.target.hz;
        last.rme = event.target.stats.rme;

        console.log('\t' + String(event.target));
    }).
    add('create', {
        fn: function () {
            var mary = Person('mary', 28);
        },
        //minSamples: 500
    }).
    add('extend', {
        fn: function () {
            var bob = Man('bob', 29);
        },
        //minSamples: 1000
    }).
    add('use', {
        fn: function () {
            steve.bye();
        },
        //minSamples: 1000
    }).
    add('base', {
        fn: function () {
            steve.greet2();
        },
        //minSamples: 400
    });
