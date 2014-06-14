describe('chum.malformed', function () {
    before(function (done) {
        $(function () { done(); })
    })

    describe('the control object', function () {
        it('should exist on items', function (done) {
            var items = chum.items;
            items.should.have.property('control');
            done();
        })
        it('should have text property with value "control"', function (done) {
            var control = chum.items.control;
            control.text.should.equal('control');
            done();
        })
    })
    describe('object parsing', function () {
        it('should not pick up null/empty names', function (done) {
            var items = chum.items;
            items.should.not.have.property('');
            done();
        })
        it('should not pick up loose properties', function (done) {
            var items = chum.items;
            items.should.not.have.property('text');
            done();
        })
        it('should pick up testA', function (done) {
            var items = chum.items;
            items.should.have.property('testA');
            done();
        })
        it('should pick up testB', function (done) {
            var items = chum.items;
            items.should.have.property('testB');
            done();
        })
        it('should pick up doodadA', function (done) {
            var items = chum.items;
            items.should.have.property('doodadA');
            items.doodadA.should.have.property('shapes');
            done();
        })
        it('should pick up doodadB', function (done) {
            var items = chum.items;
            items.should.have.property('doodadB');
            done();
        })
        it('should pick up doodadC', function (done) {
            var items = chum.items;
            items.should.have.property('doodadC');
            done();
        })
    })
    describe('testA', function () {
        it('should fail to have any properties', function (done) {
            var testA = chum.items.testA;
            console.log(testA.props);
            testA.props.length.should.equal(0);
            done();
        })
    })
    describe('testB', function () {
        it('should fail to have any properties', function (done) {
            var testB = chum.items.testB;
            testB.props.length.should.equal(0);
            done();
        })
    })
    describe('doodadA', function () {
        it('should fail to have any properties', function (done) {
            var doodadA = chum.items.doodadA;
            doodadA.props.length.should.equal(0);
            done();
        })
    })
    describe('doodadB', function () {
        it('should fail to have any properties', function (done) {
            var doodadA = chum.items.doodadA;
            doodadA.props.length.should.equal(0);
            done();
        })
    })
    describe('doodadC', function () {
        it('should only have a shapes property', function (done) {
            var doodadA = chum.items.doodadA;
            doodadA.props.length.should.equal(1);
            doodadA.should.have.property('shapes');
            done();
        })
    })
})