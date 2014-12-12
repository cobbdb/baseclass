function contructor(root) {
    root.leaf = root;

    root.extend = function (child) {
        var key,
            base = {};
        child = child || {};

        // Create a new base object.
        for (key in this) {
            if (typeof this[key] === 'function') {
                base[key] = this[key].bind(base);
            } else {
                base[key] = this[key];
            }
        }

        // Update self with child's attributes.
        for (key in child) {
            this[key] = child[key];
            if (typeof child[key] !== 'function') {
                base[key] = child[key];
            }
        }

        this.base = base;
        return this;
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
