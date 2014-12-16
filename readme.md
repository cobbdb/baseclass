# BaseClass [![Bower version](https://badge.fury.io/bo/baseclass.svg)](http://badge.fury.io/bo/baseclass) [![NPM version](https://badge.fury.io/js/baseclassjs.svg)](http://badge.fury.io/js/baseclassjs)

Lean yet robust JavaScript inheritance.

    $ bower install baseclassjs
    $ npm install baseclassjs

-------------
BaseClass is a fast, lightweight, and non-intrusive inheritance
library. Code in natural JavaScript but now with the power of
simple inheritance.

BaseClass is provided as a CommonJS module, as well as a global function.
You can pick whichever version you prefer. The global function lives
in `dist/baseclass.min.js`, and the CommonJS module can be `require`'d
after it is `npm install`'d.

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
        // The 'base' parameter is provided to access a parent's methods.
        speak: function (base) {
            base.speak();
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

#### base & self
Any child can access its parent with the `base` parameter. This is provided
automatically to each child method and works in the same way as Java's
`super` keyword.

Likewise, since the `this` keyword always points at the leaf-most child,
parents can access themselves with the provided `self` parameter.

Child method signatures are altered by appending `base` and `self` in that
order to the right of the parameter list.

Here is an example using both `base` and `self`:

```javascript
function Machine() {
    return BaseClass({
        alarm: function () {
            return 'alert:';
        }
    });
}
```
```javascript
function Vehicle() {
    return Machine().extend({
        honk: function () {
            return 'beep beep';
        },
        alarm: function (msg, base, self) {
            msg += base.alarm();
            return msg + self.honk();
        }
    });
}
```
```javascript
function Car() {
    return Vehicle().extend({
        honk: function () {
            return 'ahooooga';
        }
    });
}
```
```javascript
// my-app.js
var mycar = Car();
mycar.honk(); // --> ahooooga
mycar.alarm('!>'); // --> !>alert:beep beep
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

## BaseClass.Interface() & implement()
If you only want to attach attributes without changing an
object's type, you can define an `Interface`. All children
contain an `implement()` method used to attach one or more
interfaces.

```javascript
// honkable.js
var BaseClass = require('baseclassjs');
module.exports = BaseClass.Interface({
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
module.exports = function (model) {
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
