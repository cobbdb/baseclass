var BaseClass = require('../../src/baseclass.js');

module.exports = {
    Animal: function (name) {
        return BaseClass({
            name: name,
            weight: '100lbs',
            speak: function () {
                return 'Animal Test Message';
            }
        });
    },
    Pet: function (name) {
        return this.Animal(name).extend({
            color: 'Gray',
            weight: '50lbs',
            greet: function () {
                return this.leaf.speak();
            },
            bye: function () {
                return this.base.speak();
            },
            cry: function () {
                return this.getSadMsg();
            },
            getSadMsg: function () {
                return 'boo hoo';
            }
        });
    },
    Dog: function () {
        return this.Pet('Wolfie').extend({
            speak: function () {
                return 'Dog test message';
            },
            getSadMsg: function () {
                return 'ERROR';
            }
        });
    }
};
