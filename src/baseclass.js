var BaseSwap = require('./base-swap.js'),
    Bind = require('./bind.js'),
    Stub = require('./stub.js');

/**
 * @class BaseClass
 * @param {Object} [root] The most senior parent
 * of the inheritance chain.
 */
function contructor(root) {
    root = root || {};

    /**
     * Provide hook for subclasses.
     * @param {Object} [child] The next child.
     */
    root.extend = function (child) {
        var key, base = {
            base: root.base
        };
        child = child || {};

        // Create a new base object for this level.
        for (key in root) {
            if (root[key] instanceof global.Function) {
                base[key] = Bind(root[key], root);
            }
        }

        // Create new inheritance level in root object.
        for (key in child) {
            if (child[key] instanceof global.Function) {
                root[key] = BaseSwap(key, root, base, child);
            } else {
                root[key] = child[key];
            }
        }

        // Provide back link.
        root.base = base;

        // Execute any construction logic.
        if ('_create' in child) {
            root._create();
        } else {
            root._create = Stub;
        }

        return root;
    };

    /**
     * Provide hook for interfaces.
     * @param {Interface} Any number of Interfaces
     * to apply.
     */
    root.implement = function () {
        var i, len = arguments.length;
        for (i = 0; i < len; i += 1) {
            arguments[i](root);
        }
        return root;
    };

    /**
     * Run any construction logic.
     */
    if ('_create' in root) {
        root._create.call(root);
    } else {
        root._create = Stub;
    }

    return root;
}

contructor.Abstract = require('./abstract.js');
contructor.Stub = Stub;
contructor.Interface = require('./interface.js');

module.exports = contructor;
