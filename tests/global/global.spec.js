describe('global function', function () {
    it('is defined', function () {
        expect(BaseClass).toBeDefined();
        expect(typeof BaseClass).toEqual('function', 'Constructor');
    });
    it('throws no errors', function () {
        expect(function () {
            var car = BaseClass({
                weight: '1000lbs',
                drive: BaseClass.Stub
            });
        }).not.toThrow();
    });
    it('works', function () {
        var car = BaseClass({
            weight: '1000lbs',
            drive: BaseClass.Stub
        });
        expect(typeof car.extend).toEqual('function');
        expect(typeof car.drive).toEqual('function');
    });
});
