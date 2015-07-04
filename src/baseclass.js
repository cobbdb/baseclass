var rebind = require('./rebind.js'),
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

        // Rebind methods to use correct child.
        for (key in root) {
            if (typeof root[key] === 'function') {
                base[key] = root[key].bind(root);
            }
        }

        // Inherit from parent.
        for (key in child) {
            if (typeof child[key] === 'function') {
                root[key] = rebind(key, root, base, child);
            } else {
                root[key] = child[key];
            }
        }

        // Provide back link.
        root.base = base;

        // Execute any construction logic.
        root._create.call(root);

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
