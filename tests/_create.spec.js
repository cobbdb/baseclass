var BaseClass = require('../src/baseclass.js');

describe('Creation logic', function () {
    it('is optional', function () {
        expect(function () {
            var Test = BaseClass();
        }).not.toThrow();
    });
    it('runs only once per inheritance level', function () {
        var count = 0;
        var TestParent = BaseClass({
            _create: function () {
                count += 1;
            }
        });
        expect(count).toEqual(1);
        var TestChild = TestParent.extend();
        expect(count).toEqual(1);
    });
    it('can be overridden', function () {
        var count = 0;
        var TestParent = BaseClass({
            _create: function () {
                count += 1;
            }
        });
        expect(count).toEqual(1);
        var TestChild = TestParent.extend({
            _create: function () {
                count -= 1;
            }
        });
        expect(count).toEqual(0);
        var TestGrandchild = TestChild.extend({
            _create: function () {
                count += 1;
            }
        });
        expect(count).toEqual(1);
    });
    it('is bound to its own instance', function (done) {
        var TestParent = BaseClass({
            name: 'test-name',
            _create: function () {
                expect(this.name).toEqual('test-name');
                done();
            }
        });
    });
});
