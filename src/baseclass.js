var Clone = require('./clone.js'),
    _ = require('lodash.assign');

function contructor(root) {
    root.leaf = root;

    root.extend = function (child) {
        var key, base;
        child = child || {};

        // Create a new base object.
        base = Clone(root);
        for (key in root) {
            if (root.hasOwnProperty(key)) {
                if (typeof root[key] === 'function') {
                    // Rebind `this` to correct inheritance level.
                    base[key] = root[key].bind(base);
                }
            }
        }

        // Update self with child's attributes.
        root = _(root, child);
        root.base = base;

        return root;
    };

    root.implement = function () {
        var i, len = arguments.length;
        for (i = 0; i < len; i += 1) {
            arguments[i](root);
        }
        return root;
    };

    return root;
}

contructor.Abstract = require('./abstract.js');
contructor.Stub = require('./stub.js');
contructor.Interface = require('./interface.js');

module.exports = contructor;
