# BaseClass [![Bower version](https://badge.fury.io/bo/baseclass.svg)](http://badge.fury.io/bo/baseclass) [![NPM version](https://badge.fury.io/js/baseclassjs.svg)](http://badge.fury.io/js/baseclassjs)

Lean yet robust JavaScript inheritance.

    $ bower install baseclassjs
    $ npm install baseclassjs

-------------
BaseClass is an alternative to many of the overbearing and intrusive inheritance libraries
such as Ember and even Fiber. Code in natural JavaScript but now with the power of simple
inheritance.

BaseClass is provided as a node and Browserify module, as well as a global function. You can
pick whichever version you prefer. The node and Browserify module lives in:
`dist/node/baseclass.min.js`, and the global function lives in `dist/bower/baseclass.min.js`.

## BaseClass() & extend()
Here's a quick example showing a typical class setup.

```javascript
// class-definition.js
var BaseClass = require('baseclassjs');
var Pet = function (name) {
    // Declare your root class with the BaseClass constructor.
    return BaseClass({
        name: name,
        speak: function () {
            console.log('Hi there!');
        }
    });
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
```
```javascript
// my-app.js
var woofie = Dog('Woofie');
woofie.speak(); // --> Hi there! I'm Woofie and I'm a grey dog.
```

This inheritance chain can continue on as deep as you want it to be. To reach deeper into the
chain, just use the `.base` notation. For example if you want data from two levels deep, that
would look like `child.base.base.data`.

Since all properties are brought over to each child, children will always have access to an `extend`
method to create more children.

#### this.base
Any child can access its parent with the `base` property. This is provided automatically to
each child and works in the same way as Java's `super` keyword.

#### this.leaf
Sometimes a parent needs to access its children. In classical languages this is when type
casting comes into play, but we don't have that in JavaScript. Instead any parent can
access its leaf-most child with the `leaf` attribute. This is provided automatically at
every level of inheritance - meaning that even the top child will have a `leaf`
property pointing to itself.

## BaseClass.Abstract
If you want your base class to enforce an override, you can use the `Abstract` method provided
from the BaseClass function. Simply drop it into place like this:

```javascript
// definition.js
var Vehicle = function (model) {
    return BaseClass({
        model: model,
        // Drop it in like any other property.
        drive: BaseClass.Abstract
    });
};
var Car = function (model) {
    return Vehicle(model).extend({
        color: 'blue'
        // Notice we did -not- override the drive() method.
    });
};
```
```javascript
// my-app.js
var whip = Car('Honda');
whip.drive(); // --> Throws JS Error!
```

Calling an abstract method that has not been overridden will result in a JS Error being thrown.

## BaseClass.Stub
Sometimes you only want to reserve an attribute name to ensure that it's provided to all children.
This can be done easily with the `Stub` method.

```javascript
// definition.js
var Vehicle = function (model) {
    return BaseClass({
        model: model,
        // Drop it in like any other property.
        honk: BaseClass.Stub
    });
};
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

## BaseClass.Interface() & implement()
If you only want to attach attributes without changing an
object's type, you can define an `Interface`. All children
contain an `implement()` method used to attach one or more
interfaces.

```javascript
// honkable.js
var BaseClass = require('baseclassjs');
module.export = BaseClass.Interface({
    honk: function () {
        return 'beep beep';
    }
});
```
```javascript
// car.js
var Vehicle = require('./vehicle.js'),
    Honkable = require('./honkable.js'),
    Driveable = require('./driveable.js');
module.export = function (model) {
    return Vehicle(model).extend({
        weight: '1000lbs'
    }).implement(
        Honkable,
        Driveable
    );
};
```
```javascript
// myapp.js
var Car = require('./cat.js');
myride = Car('honda');
myride.honk(); // --> beep beep
```

---------
* See: http://cobbdb.github.io/baseclass
* See: http://github.com/cobbdb/baseclass
* License: MIT
