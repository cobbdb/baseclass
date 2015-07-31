# BaseClass [![Bower version](https://badge.fury.io/bo/baseclass.svg)](http://badge.fury.io/bo/baseclass) [![NPM version](https://badge.fury.io/js/baseclassjs.svg)](http://badge.fury.io/js/baseclassjs)

Lean yet robust JavaScript inheritance.

    $ bower install baseclassjs
    $ npm install baseclassjs

[![NPM info](https://nodei.co/npm/baseclassjs.png?stars=true&downloads=true)](https://nodei.co/npm-dl/baseclassjs/)[![NPM downloads](https://nodei.co/npm-dl/baseclassjs.png?months=6&height=2)](https://nodei.co/npm-dl/baseclassjs/)

-------------
BaseClass is a fast, lightweight, and non-intrusive inheritance
library. Code in natural JavaScript but now with the power of
simple inheritance.

BaseClass is provided as a CommonJS module, as well as a global function.
You can pick whichever version you prefer. The global function lives
in `dist/baseclass.min.js`, and the CommonJS module can be `require`'d
after it is `npm install`'d.

Every release, performance data is gathered and graphed to ensure every
version of the library is blazing fast.
* [Base class creation](https://plot.ly/~cobbdb/69/baseclass-create)
* [Class extension](https://plot.ly/~cobbdb/74/baseclass-extend)
* [this.base method calls](https://plot.ly/~cobbdb/72/baseclass-use)
* [Leaf-most method calls](https://plot.ly/~cobbdb/68/baseclass-base)

## BaseClass() & extend()
Here's a quick example showing a typical class setup.

```javascript
// pet.js
var BaseClass = require('baseclassjs');
module.exports = function (name) {
    // Declare your root class with the BaseClass constructor.
    return BaseClass({
        name: name,
        color: 'grey',
        speak: function () {
            console.log('Hi there!');
        }
    });
};
```
```javascript
// dog.js
var Pet = require('./pet.js');
module.exports = function (name) {
    return Pet(name).extend({
        // The 'this.base' object is used to access a parent's methods.
        speak: function () {
            this.base.speak();
            console.log("I'm " + name + " and I'm a "  + this.color + ' dog.');
        }
    });
};
```
```javascript
// my-app.js
var Dog = require('./dog.js'),
    woofie = Dog('Woofie');
woofie.speak(); // --> Hi there! I'm Woofie and I'm a grey dog.
```

This inheritance chain can continue on as deep as you want it to be. To
reach deeper into the chain, just use the `.base` notation. For example
if you want data from two levels deep, that would look
like `child.base.base.data`.

Since all properties are brought over to each child, children will always
have access to an `extend` method to create more children.

#### _create method
All levels of the inheritance chain are assigned a `_create` method. This
method is stubbed when not explicitly defined. The `_create` method is
a callback that executes after the root parent is created and again after
each child is extended. The `this` object is bound to the newly setup
instance. Here is an example of populating a custom data-structure after
it has been newly created.
```javascript
// Where MyCollection provides an add() method.
module.exports = function () {
    return MyCollection().extend({
        _create: function () {
            this.add([1, 2, 3, 4]);
        }
    });
};
```

#### this.base
Any child can access its parent's methods with the `this.base` object.
This is provided automatically to each child method and works in the
same way as Java's `super` keyword.

```javascript
function Machine() {
    return BaseClass({
        alert: function () {
            return 'alert: ';
        }
    });
}
```
```javascript
function Vehicle() {
    return Machine().extend({
        honk: function () {
            return this.base.alert() + 'beep beep';
        }
    });
}
```
```javascript
function Car() {
    return Vehicle().extend({
        honk: function () {
            return this.base.honk() + ', ahooooga';
        }
    });
}
```
```javascript
// my-app.js
var mycar = Car();
console.log(mycar.honk()); // --> alert: beep beep, ahooooga
```

## BaseClass.Abstract
If you want your base class to enforce an override, you can use the
`Abstract` method provided from the BaseClass function. Simply drop it into
place like this:

```javascript
function Vehicle(model) {
    return BaseClass({
        model: model,
        // Drop it in like any other property.
        drive: BaseClass.Abstract
    });
}
```
```javascript
function Car(model) {
    return Vehicle(model).extend({
        color: 'blue'
        // Notice we did -not- override the drive() method.
    });
}
```
```javascript
// my-app.js
var mycar = Car('Honda');
mycar.drive(); // --> Throws JS Error!
```

Calling an abstract method that has not been overridden will result in a
JS Error being thrown.

## BaseClass.Stub
Sometimes you only want to reserve an attribute name to ensure that it's
provided to all children. This can be done easily with the `Stub` method.

```javascript
// vehicle.js
var Vehicle = function (model) {
    return BaseClass({
        model: model,
        // Drop it in like any other property.
        honk: BaseClass.Stub
    });
};
```
```javascript
// car.js
var Car = function (model) {
    return Vehicle(model).extend({
        weight: '1000lbs'
        // Notice we did -not- override the honk() method.
    });
};
```
```javascript
// my-app.js
var whip = Car('Honda');
whip.honk(); // --> Nothing happens.
```

---------
* See: http://cobbdb.github.io/baseclass
* See: http://github.com/cobbdb/baseclass
* License: MIT
