describe('chum.duplicates', function () {
	before(function (done) {
		$(function () { done(); })
	})

	describe('the control object', function () {
		it('is expected to exist on items', function (done) {
			var items = chum.items;
			expect(items).to.have.property('control');
			done();
		});
		it('is expected to have a text property with the value "control"', function (done) {
			var control = chum.items.control;
			expect(control.text).to.equal('control');
			done();
		})
	})
	describe('duplicate object names', function () {
		it('are expected to form an array', function (done) {
			var item = chum.items.item;
			expect(item).to.be.an.Array;
			expect(item.length).to.equal(3);
			done();
		})
		describe('item1', function () {
			it('is expected to have a text property', function (done) {
				var item1 = chum.items.item[0];
				expect(item1).to.have.property('text');
				expect(item1.text).to.equal('001');
				done();
			})
			it('that is expected to be settable', function (done) {
				var item1 = chum.items.item[0];
				item1.text = '101';
				expect(item1.text).to.equal('101');

				var $item = $($('[data-chum-obj="item"]')[0]);
				var $prop = $($item.find('[data-chum-prop="text"]')[0]);
				expect($prop.val()).to.equal('101');
				done();
			})
		})
		describe('item2', function () {
			it('is expected to have a property named boolean', function (done) {
				var item2 = chum.items.item[1];
				expect(item2).to.have.property('boolean');
				expect(item2.boolean).to.be(true);
				done();
			})
			it('that is expected to be settable', function (done) {
				var item2 = chum.items.item[1];
				item2.boolean = false;
				expect(item2.boolean).to.be(false);

				var $item = $($('[data-chum-obj="item"]')[1]);
				var prop = $item.find('[data-chum-prop="boolean"]')[0];
				expect(prop.checked).to.be(false);
				done();
			})
		})
		describe('item3', function () {
			it('is expected to have a text property', function (done) {
				var item3 = chum.items.item[2];
				expect(item3).to.have.property('text');
				expect(item3.text).to.equal('002');
				done();
			})
			it('that is expected to be settable', function (done) {
				var item3 = chum.items.item[2];
				item3.text = '102';
				expect(item3.text).to.equal('102');

				var $item = $($('[data-chum-obj="item"]')[2]);
				var $prop = $($item.find('[data-chum-prop="text"]')[0]);
				expect($prop.val()).to.equal('102');
				done();
			})
		})
	})

	describe('duplicate property names', function () {
		describe('on doodadA', function () {
			it('is expected not to exist', function (done) {
				var doodadA = chum.items.doodadA;
				expect(doodadA.props.length).to.equal(0);
				done();
			})
		})
		describe('on doodadB', function () {
			it('is expected not to exist', function (done) {
				var doodadB = chum.items.doodadB;
				expect(doodadB.props.length).to.equal(0);
				done();
			})
		})
		describe('on doodadC', function () {
			it('is expected not to exist', function (done) {
				var doodadC = chum.items.doodadC;
				expect(doodadC.props.length).to.equal(0);
				done();
			})
		})
		describe('on doodadD', function () {
			it('is expected not to exist', function (done) {
				var doodadD = chum.items.doodadD;
				expect(doodadD.props.length).to.equal(1);
				expect(doodadD).to.have.property('text');
				expect(doodadD.text).to.equal('blue');
				done();
			})
		})
	})
})