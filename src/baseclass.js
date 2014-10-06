function BaseClass(child) {
    var key;
    child = child || {};
    child.base = this;
    for (key in this) {
        child[key] = child[key] || this[key];
    }
    return child;
}

BaseClass.Abstract = function () {
    throw Error('[BaseClass] Abstract method was called without definition.');
};

BaseClass.Stub = function () {};
