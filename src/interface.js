module.exports = function (child) {
    return function (root) {
        var key;
        for (key in child) {
            root[key] = child[key];
        }
        return root;
    };
};
