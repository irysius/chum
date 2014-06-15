describe('chum.nesting', function () {
	before(function (done) {
		$(function () { done(); })
	})

	describe('the control object', function () {
		it('is expected to exist on items', function (done) {
			var items = chum.items;
			expect(items).to.have.property('control');
			done();
		})
		it('is expected to have a text property with the value "control"', function (done) {
			var control = chum.items.control;
			expect(control.text).to.equal('control');
			done();
		})
	})

	describe('nesting should not work', function () {
		it('in basic nesting', function (done) {
			var items = chum.items;
			expect(items).to.have.property('basic');
			expect(items).not.to.have.property('inner');
			done();
		})
		it('in deep nesting', function (done) {
			var items = chum.items;
			expect(items).to.have.property('deep');
			expect(items).not.to.have.property('levelOne');
			expect(items).not.to.have.property('levelTwo');
			expect(items).not.to.have.property('levelThree');
			expect(items).not.to.have.property('levelFour');
			expect(items).not.to.have.property('levelFive');
			expect(items).not.to.have.property('levelSix');
			done();
		})
		it ('in parent children scenarioes', function (done) {
			var items = chum.items;
			expect(items).to.have.property('parent');
			expect(items).not.to.have.property('childOne');
			expect(items).not.to.have.property('childTwo');
			expect(items).not.to.have.property('childThree');
			done();
		})
	})

	describe('basic object', function () {
		it('should have text property with value "basic001"', function (done) {
			var basic = chum.items.basic;
			expect(basic).to.have.property('text');
			expect(basic.text).to.equal('basic001');
			done();
		})	
	})

	describe('deep object', function () {
		it('should have text property with value "deep000"', function (done) {
			var deep = chum.items.deep;
			expect(deep).to.have.property('text');
			expect(deep.text).to.equal('deep000');
			done();
		})
	})

	describe('parent object', function () {
		it('should have text property with value "parent001"', function (done) {
			var parent = chum.items.parent;
			expect(parent).to.have.property('text');
			expect(parent.text).to.equal('parent001');
			done();
		})
	})
})