# BaseClass [![Bower version](https://badge.fury.io/bo/baseclass.svg)](http://badge.fury.io/bo/baseclass) [![NPM version](https://badge.fury.io/js/baseclassjs.svg)](http://badge.fury.io/js/baseclassjs)

Lean yet robust JavaScript inheritance.

    $ bower install baseclass
    $ npm install baseclassjs

-------------
BaseClass is an alternative to many of the overbearing and intrusive inheritance libraries
such as Ember and even Fiber. Code in natural JavaScript but now with the power of simple
inheritance.

## BaseClass & extend()
Here's a quick example showing a typical class setup.

    // class-definition.js
    var Pet = function (name) {
        return {
            name: name,
            speak: function () {
                console.log('Hi there!');
            },
            // Just add this one method to your base class and
            // you're all set up! Simple as can be!
            extend: BaseClass
        };
    };
    var Dog = function (name) {
        return Pet(name).extend({
            color: 'grey',
            speak: function () {
                this.base.speak();
                console.log("I'm " + name + " and I'm a "  + this.color + ' dog.');
            }
        });
    };

    // my-app.js
    var woofie = Dog('Woofie');
    woofie.speak(); // --> Hi there! I'm Woofie and I'm a grey dog.

This inheritance chain can continue on as deep as you want it to be. To reach deeper into the
chain, just use the `.base` notation. For example if you want data from two levels deep, that
would look like `child.base.base.data`.

Since all properties are brought over to each child, your will always have access to an `extend`
method to create more children.

## BaseClass.Abstract
If you want your base class to enforce an override, you can use the `Abstract` method provided
from the BaseClass function. Simply drop it into place like this:

    // definition.js
    var Vehicle = function (model) {
        return {
            extend: BaseClass,
            model: model,
            // Drop it in like any other property.
            drive: BaseClass.Abstract
        };
    };
    var Car = function (model) {
        return Vehicle(model).extend({
            color: 'blue'
            // Notice we did -not- override the drive() method.
        });
    };

    // my-app.js
    var whip = Car('Honda');
    whip.drive(); // --> Throws JS Error!

Calling an abstract method that has not been overridden will result in a JS Error being thrown.

## BaseClass.Stub
Sometimes you only want to reserve an attribute name to ensure that it's provided to all children.
This can be done easily with the `Stub` method.

    // definition.js
    var Vehicle = function (model) {
        return {
            extend: BaseClass,
            model: model,
            // Drop it in like any other property.
            honk: BaseClass.Stub
        };
    };
    var Car = function (model) {
        return Vehicle(model).extend({
            weight: '1000lbs'
            // Notice we did -not- override the honk() method.
        });
    };

    // my-app.js
    var whip = Car('Honda');
    whip.honk(); // --> Nothing happens.

---------
* See: http://cobbdb.github.io/baseclass/
* See: http://github.com/cobbdb/baseclass
* License: MIT
