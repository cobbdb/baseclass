var Setup = require('./helpers/class.helper.js');

describe('Second level inheritance', function () {
    var test;
    beforeEach(function () {
        test = Setup.Pet('TSTname');
    });
    it('exposes root properties', function () {
        expect(test.name).toEqual('TSTname', 'name');
        expect(test.weight).toEqual('50lbs', 'weight');
        expect(test.speak()).toEqual('Animal Test Message', 'speak()');
        expect(test.color).toEqual('Gray', 'color');
    });
    it('exposes the extend() method', function () {
        expect(typeof test.extend).toEqual('function');
    });
    it('exposes working `base`', function () {
        expect(test.base).toBeDefined();
        expect(test.base.speak()).toEqual('Animal Test Message');
    });
    it('provides working `base`', function () {
        expect(test.greet()).toEqual('Animal Test Message', 'leaf test');
        expect(test.bye()).toEqual('Animal Test Message', 'base test');
    });
    it('can mutate with `this`', function () {
        expect(test.name).toEqual('TSTname', 'initial');
        test.rename('new name');
        expect(test.name).toEqual('new name', 'mutated');
    });
    it('can access fields with `this`', function () {
        expect(test.summary()).toEqual('TSTname:50lbs');
    });
});
