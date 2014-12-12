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
        expect(test.extend).toBeDefined();
    });
    it('exposes leaf attribute', function () {
        expect(test.leaf).toBeDefined();
        expect(test.leaf.name).toEqual('TSTname');
    });
    it('exposes base attribute', function () {
        expect(test.base).toBeDefined();
        expect(test.base.name).toEqual('TSTname');
    });
    it('retains leaf property values', function () {
        expect(test.base.weight).toEqual('50lbs');
        expect(test.base.color).toEqual('Gray');
    });
    it('binds this to 2nd level', function () {
        expect(test.greet()).toEqual('Animal Test Message', 'leaf test');
        expect(test.bye()).toEqual('Animal Test Message', 'base test');
        expect(test.cry()).toEqual('boo hoo');
    });
});
