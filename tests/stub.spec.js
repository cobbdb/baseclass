describe('Stub methods', function () {
    var Car, Vehicle;
    beforeEach(function () {
        Vehicle = function () {
            return BaseClass({
                weight: '1000lbs',
                drive: BaseClass.Stub
            });
        };
    });
    it("don't throw without override", function () {
        Car = Vehicle().extend();
        expect(function () {
            Car.drive();
        }).not.toThrow();
    });
    it("call normally after override", function () {
        Car = Vehicle().extend({
            drive: function () {
                return 'vroom';
            }
        });
        expect(function () {
            var msg = Car.drive();
            expect(msg).toEqual('vroom');
            // Smoke test weight.
            expect(Car.weight).toEqual('1000lbs');
        }).not.toThrow();
    });
});
