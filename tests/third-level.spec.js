var Setup = require('./helpers/class.helper.js');

describe('Third level inheritance', function () {
    var test;
    beforeEach(function () {
        test = Setup.Dog();
    });
    it('exposes root properties', function () {
        expect(test.name).toEqual('Wolfie', 'name');
        expect(test.weight).toEqual('50lbs', 'weight');
        expect(test.speak()).toEqual('Dog test message', 'speak()');
        expect(test.color).toEqual('Gray', 'color');
    });
    it('exposes the extend() method', function () {
        expect(test.extend).toBeDefined();
    });
    it('overrides root property values', function () {
        expect(test.base.weight).toEqual('50lbs');
        expect(test.base.color).toEqual('Gray', 'color');
        expect(test.base.speak()).toEqual('Animal Test Message');
    });
    it('overrides second level property values', function () {
        expect(test.base.base.weight).toEqual('50lbs');
        expect(test.base.base.color).toEqual('Gray', 'color');
        expect(test.base.base.speak()).toEqual('Animal Test Message');
    });
    it('binds base.this to 2nd level', function () {
        expect(test.base.greet()).toEqual('Dog test message', 'leaf test');
        expect(test.base.bye()).toEqual('Animal Test Message', 'base test');
        expect(test.base.cry()).toEqual('boo hoo');
    });
    it('has correct number of base fields', function () {
        expect(test.base).toBeDefined();
        expect(test.base.base).toBeDefined();
        expect(test.base.base.base).not.toBeDefined();
    });
    xit('binds fields dynamically downward', function () {
        expect(test.weight).toEqual('50lbs', 'leaf');
        expect(test.base.weight).toEqual('50lbs', 'base');
        test.weight = '321lbs';
        expect(test.base.weight).toEqual('321lbs');
    });
    xit('binds fields dynamically upward', function () {
        expect(test.weight).toEqual('50lbs', 'leaf');
        expect(test.base.weight).toEqual('50lbs', 'base');
        test.base.weight = '321lbs';
        expect(test.weight).toEqual('321lbs');
    });
});
