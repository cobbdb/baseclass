module.exports = function (key, root, base, self) {
    return function () {
        // `base` is a collection of methods only.
        [].push.call(arguments, base);
        // `this` is manipulated, so provide a way
        // for children to access themselves.
        [].push.call(arguments, self);
        return self[key].apply(root, arguments);
    };
};
