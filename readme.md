# BaseClass [![Bower version](https://badge.fury.io/bo/baseclass.svg)](http://badge.fury.io/bo/baseclass) [![NPM version](https://badge.fury.io/js/baseclassjs.svg)](http://badge.fury.io/js/baseclassjs)

Lean yet robust JavaScript inheritance.

    $ bower install baseclass
    $ npm install baseclassjs

-------------
BaseClass is an alternative to many of the overbearing and intrusive inheritance libraries
such as Ember and even Fiber. Code in natural JavaScript but now with the power of simple
inheritance.

Here's a quick example showing a typical class setup.

    // Your app's library
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

    // Your app's runtime
    var woofie = Dog('Woofie');
    woofie.speak(); // --> Hi there! I'm Woofie and I'm a grey dog.

This inheritance chain can continue on as deep as you want it to be. To reach deeper into the
chain, just use the `.base` notation. For example if you want data from two levels deep, that
would look like `child.base.base.data`.

Since all properties are brought over to each child, your will always have access to an `extend`
method to create more children.

---------
* See: http://cobbdb.github.io/baseclass/
* See: http://github.com/cobbdb/baseclass
* License: MIT
