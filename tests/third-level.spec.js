describe('Third level inheritance', function () {
    beforeEach(setupDog);
    it('exposes root properties', function () {
        var test = Dog();
        expect(test.name).toEqual('Wolfie', 'name');
        expect(test.weight).toEqual('50lbs', 'weight');
        expect(test.speak()).toEqual('Dog test message', 'speak()');
        expect(test.color).toEqual('Gray', 'color');
    });
    it('exposes the extend() method', function () {
        var test = Dog();
        expect(test.extend).toBeDefined();
    });
    it('retains first level parent integrity', function () {
        var test = Dog();
        expect(test.base.weight).toEqual('50lbs');
        expect(test.base.color).toEqual('Gray', 'color');
        expect(test.base.speak()).toEqual('Animal Test Message');
    });
    it('retains second level parent integrity', function () {
        var test = Dog();
        expect(test.base.base.speak()).toEqual('Animal Test Message');
        expect(test.base.base.color).toBeUndefined();
        expect(test.base.base.weight).toEqual('100lbs');
    });
});
