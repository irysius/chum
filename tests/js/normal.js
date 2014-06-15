suite('Chum parsed object item', function () {
	setup(function (done) {
		$(function () {
			done();
		})
	})

	suite('input[type="text"] property name', function () {
		test('should have a default value of ""', function (done) {
			var item = chum.items.item;
			assert.strictEqual(item.name, '');
			done();
		})
		test('should be programmatically settable', function (done) {
			var item = chum.items.item;
			item.name = 'test-text';
			assert.strictEqual(item.name, 'test-text');
			assert.strictEqual($('#item-text').val(), 'test-text');
			done();
		})
		test('should be updated via user input', function (done) {
			var item = chum.items.item;
			$('#item-text').val('text-test');
			assert.strictEqual(item.name, 'text-test');
			done();
		})
	})
	suite('input[type="number"] property number', function () {
		test('should have a default value of NaN', function (done) {
			var item = chum.items.item;
			assert(_.isNaN(item.number));
			done();
		})
		suite('on normal input', function () {
			test('should be settable', function (done) {
				var item = chum.items.item;
				item.number = 100.25;
				assert.strictEqual(item.number, 100.25);
				assert.strictEqual(parseFloat($('#item-number').val()), 100.25);
				done();
			})
			test('should be updated via user input', function (done) {
				var item = chum.items.item;
				$('#item-number').val(25.75);
				assert.strictEqual(item.number, 25.75);
				done();
			})
		})
		suite('on invalid input', function () {
			test('when programmatically set, should default to NaN', function (done) {
				var item = chum.items.item;
				item.number = 'not-a-number';
				assert(_.isNaN(item.number));
				assert.strictEqual($('#item-number').val(), '');
				done();
			})
			test('when modified by user input, should default to NaN', function (done) {
				var item = chum.items.item;
				$('#item-number').val('number-a-not');
				assert(_.isNaN(item.number));
				done();
			})
		})
	})
	suite('select property color', function () {
		test('should have a default value of the first option', function (done) {
			var item = chum.items.item;
			var $option = $('#item-select option:first');
			assert.equal(item.color, $option.val());
			done();
		})
		suite('on normal input', function () {
			test('should be settable', function (done) {
				var item = chum.items.item;
				item.color = 'green';
				assert.strictEqual(item.color, 'green');
				assert.strictEqual($('#item-select').val(), 'green');
				done();
			})
			test('should be updated via user input', function (done) {
				var item = chum.items.item;
				$('#item-select').val('red');
				assert.strictEqual(item.color, 'red');
				done();
			})
		})
		suite('on invalid input', function () {
			test('when programmatically set, should default to null', function (done) {
				var item = chum.items.item;
				item.color = 'black';
				assert.isNull(item.color);
				assert.isNull($('#item-select').val());
				done();
			})
		})
	})
	suite('input[type="checkbox"] property boolean', function () {
		test('should have a default value of false', function (done) {
			var item = chum.items.item;
			assert.equal(item.boolean, false);
			done();
		})
		suite('on normal input', function () {
			test('should be settable', function (done) {
				var item = chum.items.item;
				item.boolean = true;
				assert.strictEqual(item.boolean, true);
				assert.strictEqual($('#item-checkbox')[0].checked, true);
				item.boolean = false;
				done();
			})
			test('should be updated via user input', function (done) {
				var item = chum.items.item;
				$('#item-checkbox').prop('checked', true);
				assert.strictEqual(item.boolean, true);
				$('#item-checkbox').prop('checked', false);
				done();
			})
		})
		suite('on invalid input', function () {
			test('when programmatically set, should ignore new value', function (done) {
				var item = chum.items.item;
				var originalValue = $('#item-checkbox')[0].checked;
				item.boolean = 'not-a-boolean';
				assert.strictEqual(item.boolean, originalValue);
				assert.strictEqual($('#item-checkbox')[0].checked, originalValue);
				done();
			})
		})
	})
	suite('textarea property textarea', function () {
		var lorem = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit';
		var lorem2 = 'Duis aute irure dolor in reprehenderit in voluptate';
		test('should have a default value of ""', function (done) {
			var item = chum.items.item;
			assert.strictEqual(item.textarea, '');
			done();
		})
		test('should be programmatically settable', function (done) {
			var item = chum.items.item;
			item.textarea = lorem;
			assert.strictEqual(item.textarea, lorem);
			assert.strictEqual($('#item-textarea').val(), lorem);
			done();
		})
		test('should be updated via user input', function (done) {
			var item = chum.items.item;
			$('#item-textarea').val(lorem2);
			assert.strictEqual(item.textarea, lorem2);
			done();
		})
	})
	suite('input[type="radio"] property shapes', function () {
		test('should have a default value of null', function (done) {
			var item = chum.items.item;
			assert.isNull(item.shapes);
			done();
		})
		suite('on normal input', function () {
			test('should be settable', function (done) {
				var item = chum.items.item;
				item.shapes = 'square';
				assert.strictEqual(item.shapes, 'square');
				assert.strictEqual($('.item-radio:checked').val(), 'square');
				done();
			})
			test('should be updated via user input', function (done) {
				var item = chum.items.item;
				$('.item-radio[value="circle"]').prop('checked', true);
				assert.strictEqual(item.shapes, 'circle');
				done();
			})
		})
		suite('on invalid input', function () {
			test('when programmatically set, should default to null', function (done) {
				var item = chum.items.item;
				item.shapes = 'oblong';
				assert.isNull(item.shapes);
				done();
			})
		})
	})
	suite('input[type="color"] property background', function () {
		test('should have a default value of #000000', function (done) {
			var item = chum.items.item;
			assert.strictEqual(item.background, '#000000');
			done();
		})
		suite('on normal input', function () {
			test('should be settable', function (done) {
				var item = chum.items.item;
				item.background = '#00FF00';
				assert.strictEqual(item.background, '#00ff00');
				assert.strictEqual($('#item-color').val(), '#00ff00');
				done();
			})
			test('should be updated via user input', function (done) {
				var item = chum.items.item;
				$('#item-color').val('#0000FF');
				assert.strictEqual(item.background, '#0000ff');
				done();
			})
		})
		suite('on invalid input', function () {
			test('when programmatically set, should default to #000000', function (done) {
				var item = chum.items.item;
				$('#item-color').val('31DAFE');
				assert.strictEqual(item.background, '#000000');
				done();
			})
		})
	})
	suite('input[type="range"] property range', function () {
		test('should have a default value of mid', function (done) {
			var item = chum.items.item;
			var range = $('#item-range').range();
			assert.strictEqual(item.range, range.mid);
			done();
		})

		suite('on normal input', function () {
			test('should be settable', function (done) {
				var item = chum.items.item;
				var range = $('#item-range').range();
				item.range = range.min;
				assert.strictEqual(item.range, range.min);
				assert.strictEqual(parseInt($('#item-range').val()), range.min);
				done();
			})
			test('should be updated via user input', function (done) {
				var item = chum.items.item;
				var range = $('#item-range').range();
				$('#item-range').val(range.max);
				assert.strictEqual(item.range, range.max);
				done();
			})
		})
		suite('on invalid input', function () {
			test('when programmatically set to a non-number, should default to mid', function (done) {
				var item = chum.items.item;
				var range = $('#item-range').range();
				$('#item-range').val('not-a-number');
				assert.strictEqual(item.range, range.mid);
				done();
			})
			test('when programmatically set to a float, should round to the nearest integer', function (done) {
				var item = chum.items.item;
				var range = $('#item-range').range(); ;
				var target = ((range.max - range.min) / Math.PI) + range.min;
				item.range = target;
				var iTarget = Math.round(target);
				assert.strictEqual(item.range, iTarget);
				assert.strictEqual(parseInt($('#item-range').val()), iTarget);
				done();
			})
			test('when programmatically set to less than min, should default to min', function (done) {
				var item = chum.items.item;
				var range = $('#item-range').range();
				$('#item-range').val(range.min - 100);
				assert.strictEqual(item.range, range.min);
				done();
			})
			test('when programmatically set to more than max, should default to max', function (done) {
				var item = chum.items.item;
				var range = $('#item-range').range();
				$('#item-range').val(range.max + 100);
				assert.strictEqual(item.range, range.max);
				done();
			})
		})
	})
})

$.fn.range = function () {
	var $self = $(this);
	if (!$self.is('input[type="range"]')) {
		return null;
	}

	var min = parseInt($self.attr('min'));
	if (_.isNaN(min)) { min = 0; }
	var max = parseInt($self.attr('max'));
	if (_.isNaN(max)) { max = 100; }
	var mid = (Math.round((max - min) / 2)) + min;
	return {
		min: min,
		max: max,
		mid: mid,
		val: parseInt($self.val())
	}
}