function BaseClass(root) {
    root.leaf = root;
    root.extend = function (child) {
        var key,
            base = {};
        child = child || {};
        for (key in this) {
            if (typeof this[key] === 'function') {
                base[key] = this[key].bind(base);
            } else {
                base[key] = this[key];
            }
        }
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

BaseClass.Abstract = function () {
    throw Error('[BaseClass] Abstract method was called without definition.');
};
 
BaseClass.Stub = function () {};

BaseClass.Interface = function (child) {
    return function (root) {
        var key;
        for (key in child) {
            root[key] = child[key];
        }
        return root;
    };
};
