describe('Node and Browserify apps', function () {
    it('can use require to import.', function () {
        var BC = require('../../dist/node/baseclass.min.js');
        expect(typeof BC.Stub).toEqual('function');
    });
});
