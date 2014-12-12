var _ = require('lodash.assign');

module.exports = function (child) {
    return function (root) {
        return _(root, child);
    };
};
