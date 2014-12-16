var Setup = require('./helpers/class.helper.js');

describe('First level inheritance', function () {
    it('retains root integrity', function () {
        var test = Setup.Animal('TSTname');
        expect(test.name).toEqual('TSTname', 'name');
        expect(test.weight).toEqual('100lbs', 'weight');
        expect(test.speak()).toEqual('Animal Test Message', 'speak()');
    });
    it('exposes the extend() method', function () {
        var test = Setup.Animal('TSTname');
        expect(test.extend).toBeDefined();
    });
    it('can extend without child', function () {
        var sub = Setup.Animal('NAme').extend();
        expect(sub.name).toEqual('NAme');
    });
    it('does not contain base attribute', function () {
        var test = Setup.Animal('TSTname');
        expect(test.base).not.toBeDefined();
    });
    it('can mutate with `this`', function () {
        var test = Setup.Animal('TSTname');
        expect(test.name).toEqual('TSTname', 'initial');
        test.rename('new name');
        expect(test.name).toEqual('new name', 'mutated');
    });
    it('can access fields with `this`', function () {
        var test = Setup.Animal('TSTname');
        expect(test.summary).toEqual('TSTname:100lbs');
    });
});
