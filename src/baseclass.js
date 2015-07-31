var BaseSwap = require('./base-swap.js'),
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
        var base = {
                base: root.base
            },
            key;
        child = child || {};
        root.base = base;

        for (key in root) {
            if (root[key] instanceof global.Function) {
                base[key] = BaseSwap(root[key], root, base.base);
            }
        }

        for (key in child) {
            root[key] = child[key];
        }

        // Execute any construction logic.
        if ('_create' in child) {
            root._create();
        } else {
            root._create = Stub;
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

module.exports = contructor;
