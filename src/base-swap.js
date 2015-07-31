module.exports = function (func, root, base) {
    return function () {
        var out,
            oldbase = root.base;

        // Rebind base for this specific method.
        root.base = base;
        out = func.apply(root, arguments);

        // Restore the original base object.
        root.base = oldbase;
        return out;
    };
};
