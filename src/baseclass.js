var BaseClass = function (child) {
    var key;
    child.base = this;
    for (key in this) {
        child[key] = child[key] || this[key];
    }
    return child;
};
