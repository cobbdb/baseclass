/**
 * Crockford's shim for Object.create().
 * @see http://javascript.crockford.com/prototypal.html
 */
if (typeof global.Object.create !== 'function') {
    module.exports = function (o) {
        function F() {}
        F.prototype = o;
        return new F();
    };
} else {
    module.exports = global.Object.create;
}
