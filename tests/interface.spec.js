describe('Interface constructor', function () {
    var test,
        tstIFace1 = BaseClass.Interface({
            iface1: function () {
                return 'iface val 1';
            },
            iface2: 1234
        }),
        tstIFace2 = BaseClass.Interface({
            iface1: function () {
                return 'iface val 2';
            },
            iface3: 'abc123'
        });
    setupPet();

    beforeEach(function () {
        test = Pet('TSTname');
    });
    it('attaches child attributes', function () {
        test.implement(tstIFace1);
        expect(test.iface1()).toEqual('iface val 1');
        expect(test.iface2).toEqual(1234);
    });
    it('can implement multiple interfaces', function () {
        test.implement(
            tstIFace1,
            tstIFace2
        );
        expect(test.iface1()).toEqual('iface val 2');
        expect(test.iface2).toEqual(1234);
        expect(test.iface3).toEqual('abc123');
    });
});
