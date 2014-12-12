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
    it('exposes leaf attribute', function () {
        var test = Setup.Animal('TSTname');
        expect(test.leaf).toBeDefined();
        expect(test.leaf.name).toEqual('TSTname');
    });
    it('does not contain base attribute', function () {
        var test = Setup.Animal('TSTname');
        expect(test.base).not.toBeDefined();
    });
});
