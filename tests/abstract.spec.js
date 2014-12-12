var Setup = require('./helpers/class.helper.js'),
    BaseClass = require('../src/baseclass.js');

describe('Abstract methods', function () {
    var Car, Vehicle;
    beforeEach(function () {
        Vehicle = function () {
            return BaseClass({
                weight: '1000lbs',
                drive: BaseClass.Abstract
            });
        };
    });
    it("can't be used without overrides", function () {
        Car = Vehicle().extend();
        expect(function () {
            Car.drive();
        }).toThrow();
    });
    it("don't throw after override", function () {
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
