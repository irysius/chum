describe('chum.malformed', function () {
    var items = chum.items;
    describe('the control object', function () {
        it('should exist on items', function () {
            Should(items).have.property('control');
        })
        it('should have text property with value "control"', function () {
            var control = items.control;
            Should(control.text).equal('control');
        })
    })
    describe('object parsing', function () {
        it('should not pick up null/empty names', function () {
            Should(items).not.have.property('');
        })
        it('should not pick up loose properties', function () {
            Should(items).not.have.property('text');
        })
        it('should pick up testA', function () {
            Should(items).have.property('testA');
        })
        it('should pick up testB', function () {
            Should(items).have.property('testB');
        })
        it('should pick up doodadA', function () {
            Should(items).have.property('doodadA');
        })
        it('should pick up doodadB', function () {
            Should(items).have.property('doodadB');
        })
        it('should pick up doodadC', function () {
            Should(items).have.property('doodadC');
        })
    })
    describe('testA', function () {
        var testA = items.testA;
        it('should not have nameless property', function () {
            Should(testA).not.have.property('');
        })
    })
    describe('testB', function () {
        var testB = items.testB;
        it('should not have nameless property', function () {
            Should(testB).not.have.property('');
        })
    })
    describe('doodadA', function () {
        var items = chum.items;
        var doodadA = items.doodadA;
        console.log(items);
        it('should only have a shapes property', function () {
            Should(doodadA.props()).have.lengthOf(1);
            Should(doodadA.props()[0]).be.equal.to('shapes');
        })
    })
})