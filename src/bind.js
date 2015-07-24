/**
 * Bind() replacement. This is roughly
 * 10-20x faster than native Function.prototype.bind().
 */
module.exports = function (func, thisArg) {
    return function () {
        return func.apply(thisArg, arguments);
    };
};
