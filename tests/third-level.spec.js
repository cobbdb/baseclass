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
        expect(typeof test.extend).toEqual('function');
    });
    it('binds `base` to the correct level', function () {
        expect(test.speak()).toEqual('Dog test message', 'dog');
        expect(test.base.speak()).toEqual('Animal Test Message', 'pet');
        expect(test.base.base.speak()).toEqual('Animal Test Message', 'animal');
    });
    it('provides working `base` and `self`', function () {
        expect(test.base.greet()).toEqual('Dog test message', 'leaf test');
        expect(test.base.bye()).toEqual('Animal Test Message', 'base test');
        expect(test.base.cry()).toEqual('boo hoo');
    });
    it('has correct number of base fields', function () {
        expect(test.base).toBeDefined();
        expect(test.base.base).toBeDefined();
        expect(test.base.base.base).not.toBeDefined();
    });
    it('can mutate with `this`', function () {
        expect(test.name).toEqual('Wolfie', 'initial');
        test.rename('new name');
        expect(test.name).toEqual('new name', 'mutated');
    });
    it('can access fields with `this`', function () {
        expect(test.summary).toEqual('Wolfie:50lbs');
    });
});
