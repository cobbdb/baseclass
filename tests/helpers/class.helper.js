var BaseClass = require('../../src/baseclass.js');

module.exports = {
    Animal: function (name) {
        return BaseClass({
            name: name,
            weight: '100lbs',
            speak: function () {
                return 'Animal Test Message';
            },
            rename: function (name) {
                this.name = name;
            },
            summary: function () {
                return this.name + ':' + this.weight;
            }
        });
    },
    Pet: function (name) {
        return this.Animal(name).extend({
            color: 'Gray',
            weight: '50lbs',
            greet: function () {
                return this.speak();
            },
            bye: function () {
                return this.base.speak();
            },
            summary: function () {
                return this.base.summary();
            }
        });
    },
    Dog: function () {
        return this.Pet('Wolfie').extend({
            speak: function () {
                return 'Dog test message';
            }
        });
    },
    Greyhound: function () {
        return this.Dog().extend();
    }
};
