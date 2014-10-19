var Animal, Pet, Dog;
var setupAnimal = function () {
    Animal = function (name) {
        return BaseClass({
            name: name,
            weight: '100lbs',
            speak: function () {
                return 'Animal Test Message';
            }
        });
    };
};
var setupPet = function () {
    setupAnimal();
    Pet = function (name) {
        return Animal(name).extend({
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
    };
};
var setupDog = function () {
    setupPet();
    Dog = function () {
        return Pet('Wolfie').extend({
            speak: function () {
                return 'Dog test message';
            },
            getSadMsg: function () {
                return 'ERROR';
            }
        });
    };
};
