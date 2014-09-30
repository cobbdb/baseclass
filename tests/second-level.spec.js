describe('Second level inheritance', function () {
    beforeEach(setupPet);
    it('exposes root properties', function () {
        var test = Pet('TSTname');
        expect(test.name).toEqual('TSTname', 'name');
        expect(test.weight).toEqual('50lbs', 'weight');
        expect(test.speak()).toEqual('Animal Test Message', 'speak()');
        expect(test.color).toEqual('Gray', 'color');
    });
    it('exposes the extend() method', function () {
        var test = Pet('TSTname');
        expect(test.extend).toBeDefined();
    });
    it('retains root integrity', function () {
        var test = Pet('TSTname');
        expect(test.base.weight).toEqual('100lbs');
        expect(test.base.color).not.toBeDefined();
    });
});
