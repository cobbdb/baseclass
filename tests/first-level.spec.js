describe('First level inheritance', function () {
    beforeEach(setupAnimal);
    it('retains root integrity', function () {
        var test = Animal('TSTname');
        expect(test.name).toEqual('TSTname', 'name');
        expect(test.weight).toEqual('100lbs', 'weight');
        expect(test.speak()).toEqual('Animal Test Message', 'speak()');
    });
    it('exposes the extend() method', function () {
        var test = Animal('TSTname');
        expect(test.extend).toBeDefined();
    });
    it('can extend without child', function () {
        var sub = Animal('NAme').extend();
        expect(sub.name).toEqual('NAme');
    });
    it('exposes leaf attribute', function () {
        var test = Animal('TSTname');
        expect(test.leaf).toBeDefined();
        expect(test.leaf.name).toEqual('TSTname');
    });
    it('does not contain base attribute', function () {
        var test = Animal('TSTname');
        expect(test.base).not.toBeDefined();
    });
});
