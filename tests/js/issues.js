describe('chum.issues', function () {
	before(function (done) {
		$(function () { done(); })
	})

	it('calling rescan() multiple times should not increase the number of objects', function (done) {
		var item = chum.items.item;
		console.log(item);
		expect(item.text).to.equal('100');

		chum.rescan();
		item = chum.items.item;
		console.log(item);
		expect(item.text).to.equal('100');

		chum.rescan();
		item = chum.items.item;
		console.log(item);
		expect(item.text).to.equal('100');

		chum.rescan();
		item = chum.items.item;
		console.log(item);
		expect(item.text).to.equal('100');
		done();
	})
})