var Animal, Pet, Dog;
var setupAnimal = function () {
    Animal = function (name) {
        return {
            name: name,
            weight: '100lbs',
            speak: function () {
                return 'Animal Test Message';
            },
            extend: BaseClass
        };
    };
};
var setupPet = function () {
    setupAnimal();
    Pet = function (name) {
        var parent = Animal(name);
        return parent.extend({
            color: 'Gray',
            weight: '50lbs'
        });
    };
};
var setupDog = function () {
    setupPet();
    Dog = function () {
        var parent = Pet('Wolfie');
        return parent.extend({
            speak: function () {
                return 'Dog test message';
            }
        });
    };
};
