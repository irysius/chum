describe('chum.malformed', function () {
	before(function (done) {
		$(function () { done(); })
	})

	describe('the control object', function () {
		it('should exist on items', function (done) {
			var items = chum.items;
			items.should.have.property('control');
			var x = function () {
				return 2;
			}
			x().should.equal(2);
			var y = null;
			Should(y).equal(null);

			done();
		})
		it('should have text property with value "control"', function (done) {
			var control = chum.items.control;
			control.text.should.equal('control');
			done();
		})
	})
	describe('object parsing', function () {
		it('should not parse null/empty names', function (done) {
			var items = chum.items;
			items.should.not.have.property('');
			done();
		})
		it('should not parse loose properties', function (done) {
			var items = chum.items;
			items.should.not.have.property('text');
			done();
		})
		it('should parse testA', function (done) {
			var items = chum.items;
			items.should.have.property('testA');
			done();
		})
		it('should parse testB', function (done) {
			var items = chum.items;
			items.should.have.property('testB');
			done();
		})
		it('should parse doodadA', function (done) {
			var items = chum.items;
			items.should.have.property('doodadA');
			done();
		})
		it('should parse doodadB', function (done) {
			var items = chum.items;
			items.should.have.property('doodadB');
			done();
		})
		it('should parse doodadC', function (done) {
			var items = chum.items;
			items.should.have.property('doodadC');
			done();
		})
	})
	describe('testA', function () {
		it('should fail to have any properties', function (done) {
			var testA = chum.items.testA;
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
			var doodadB = chum.items.doodadB;
			doodadB.props.length.should.equal(0);
			done();
		})
	})
	describe('doodadC', function () {
		it('should only have a shapes property', function (done) {
			var doodadC = chum.items.doodadC;
			doodadC.props.length.should.equal(1);
			doodadC.should.have.property('shapes');
			done();
		})
	})
})