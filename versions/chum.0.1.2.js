(function (definition) {
	var exports = definition();
	window.chum = exports.chum;
})(function () {
	var version = '0.1.2';
	var selObject = 'data-chum-obj';
	var selProp = 'data-chum-prop';
	var selArray = 'data-chum-arr';
	var selType = 'data-chum-type';
	var showDebug = false;
	// 0 - only warnings
	// 1 - add informational
	var debugLevel = 0;
	var dictionary = {};
	var customAccessors = {};
	var radioNames = []; // Limit one property ever on grouped radios.

	function reset() {
		dictionary = {};
		radioNames = [];
	}

	function getBasic($elem) {
		return $elem.val();
	}
	function setBasic($elem, val) {
		$elem.val(val);
	}
	function BasicAccessor($elem, change) {
		var accessor = {
			get: function () {
				return getBasic($elem);
			},
			set: function (val) {
				var before, after;
				if (_.isFunction(change)) { before = accessor.get(); }

				setBasic($elem, val);

				if (_.isFunction(change)) {
					after = accessor.get();
					change(before, after);
				}
			}
		}
		return accessor;
	}
	function getCheckbox($elem) {
		return $elem[0].checked;
	}
	function setCheckbox($elem, checked) {
		if (_.isBoolean(checked)) {
			$elem[0].checked = checked;
		}
	}
	function CheckboxAccessor($elem, change) {
		var accessor = {
			get: function () {
				return getCheckbox($elem);
			},
			set: function (val) {
				var before, after;
				if (_.isFunction(change)) { before = accessor.get(); }

				setCheckbox($elem, val);

				if (_.isFunction(change)) {
					after = accessor.get();
					change(before, after);
				}
			}
		}
		return accessor;
	}
	function getNumber($elem) {
		return parseFloat($elem.val());
	}
	function setNumber($elem, val) {
		var raw = parseFloat(val);
		$elem.val(raw);
	}
	function NumberAccessor($elem, change) {
		var accessor = {
			get: function () {
				return getNumber($elem);
			},
			set: function (val) {
				var before, after;
				if (_.isFunction(change)) { before = accessor.get(); }

				setNumber($elem, val);

				if (_.isFunction(change)) {
					after = accessor.get();
					change(before, after);
				}
			}
		}
		return accessor;
	}
	function getRadio($elem) {
		var name = $elem.attr('name');
		var val = $('input[type="radio"][name="' + name + '"]:checked').val();
		if (_.isUndefined(val)) { val = null; }
		return val;
	}
	function setRadio($elem, val) {
		var name = $elem.attr('name');
		var radioes = $('input[type="radio"][name="' + name + '"]');
		_.each(radioes, function (radio) {
			var $radio = $(radio);
			if ($radio.val() == val) {
				$radio[0].checked = true;
			} else {
				$radio[0].checked = false;
			}
		})
	}
	function RadioAccessor($elem, change) {
		var accessor = {
			get: function () {
				return getRadio($elem);
			},
			set: function (val) {
				var before, after;
				if (_.isFunction(change)) { before = accessor.get(); }

				setRadio($elem, val);

				if (_.isFunction(change)) {
					after = accessor.get();
					change(before, after);
				}
			}
		}
		return accessor;
	}
	function getRange($elem) {
		return parseInt($elem.val());
	}
	function setRange($elem, val) {
		$elem.val(val);
	}
	function RangeAccessor($elem, change) {
		var accessor = {
			get: function () {
				return getRange($elem);
			},
			set: function (val) {
				var before, after;
				if (_.isFunction(change)) { before = accessor.get(); }

				setRange($elem, val);

				if (_.isFunction(change)) {
					after = accessor.get();
					change(before, after);
				}
			}
		}
		return accessor;
	}
	function ArrayAccessor($elems, unit, events, name) {
		var array = {};
		var index = 0;
		_.each($elems, function (elem) {
			var $elem = $(elem);
			var elemName = name + ':' + index;

			var accessors = null;
			if ($elem.is('[' + selType + ']')) {
				showDebug && debugLevel > 0 && console.log('createArray', name, '- custom');
				var type = $elem.attr(selType);
				if (!!customAccessors[type]) {
					showDebug && debugLevel > 0 && console.log('createArray', name, '- custom, found');
					accessors = new customAccessors[type]($elem, function (before, after) {
						if (!!events['change'] && events['change'].length > 0) {
							_.each(events['change'], function (callback) {
								callback(unit, elemName, before, after);
							})
						}
					});
				}
			}

			if (!accessors && $elem.is('[type="checkbox"]')) {
				showDebug && debugLevel > 0 && console.log('createArray', name, '- checkbox');
				accessors = new CheckboxAccessor($elem, function (before, after) {
					if (!!events['change'] && events['change'].length > 0) {
						_.each(events['change'], function (callback) {
							callback(unit, elemName, before, after);
						})
					}
				});
			}

			if (!accessors && $elem.is('[type="number"]')) {
				showDebug && debugLevel > 0 && console.log('createArray', name, '- number');
				accessors = new NumberAccessor($elem, function (before, after) {
					if (!!events['change'] && events['change'].length > 0) {
						_.each(events['change'], function (callback) {
							callback(unit, elemName, before, after);
						})
					}
				});
			}

			if (!accessors && $elem.is('[type="range"]')) {
				showDebug && debugLevel > 0 && console.log('createArray', name, '- range');
				accessors = new RangeAccessor($elem, function (before, after) {
					if (!!events['change'] && events['change'].length > 0) {
						_.each(events['change'], function (callback) {
							callback(unit, elemName, before, after);
						})
					}
				});
			}

			if (!accessors && $elem.is('[type="radio"]')) {
				showDebug && debugLevel > 0 && console.log('createArray', name, '- radio');
				var radioName = $elem.attr('name');
				var unique = true;
				_.each(radioNames, function (item) {
					if (item.name == radioName) {
						item.duplicate = true;
						propNames = _.without(propNames, elemName);
						unique = false;
					}
				})
				if (unique) {
					radioNames.push({
						name: radioName,
						prop: elemName,
						container: name,
						duplicate: false
					});
					accessors = new RadioAccessor($elem, function (before, after) {
						if (!!events['change'] && events['change'].length > 0) {
							_.each(events['change'], function (callback) {
								callback(unit, elemName, before, after);
							})
						}
					});
				} else {
					skip = true;
				}
			}

			if (!accessors) {
				showDebug && debugLevel > 0 && console.log('createArray', name, '- default');
				accessors = new BasicAccessor($elem, function (before, after) {
					if (!!events['change'] && events['change'].length > 0) {
						_.each(events['change'], function (callback) {
							callback(unit, elemName, before, after);
						})
					}
				});
			}

			Object.defineProperty(array, index, {
				get: accessors.get,
				set: accessors.set
			})
			index++;
		})

		Object.defineProperty(array, 'length', {
			get: function () {
				return index;
			}
		})
		array.serialize = function () {
			var _array = [];
			var i = 0;
			for (; i < array.length; ++i) {
				_array.push(array[i]);
			}
			return _array;
		}

		var accessor = {
			get: function () {
				return array;
			}
		};
		return accessor;
	}

	function createObject($unit) {
		var name = $unit.attr(selObject);
		if (!name) { return null; }
		showDebug && debugLevel > 0 && console.log('---', name);
		var unit = {};
		var events = {};
		var arrays = $unit.find('[' + selArray + ']');

		var propNames = findPropNames($unit);
		var arrayNames = findArrayNames($unit);
		var commonNames = _.intersection(propNames, arrayNames);
		_.each(commonNames, function (commonName) {
			propNames = _.without(propNames, commonName);
			arrayNames = _.without(arrayNames, commonName);
			showDebug && console.log(name + "'s", commonName, 'violated uniqueness constraint');
		})

		_.each(propNames, function (propName) {
			var result = createPropAccessor($unit, propName, propNames, unit, events);
			propNames = result.propNames;
			unit = result.unit;
			events = result.events;
			if (result.accessor) {
				if (!unit[propName]) {
					Object.defineProperty(unit, propName,
					{
						configurable: true,
						get: result.accessor.get,
						set: result.accessor.set
					});
				} else {
					showDebug && console.log('Could not define property', propName, 'for', name);
				}
			}
		})

		_.each(arrayNames, function (arrayName) {
			var result = createArrayAccessor($unit, arrayName, unit, events);
			unit = result.unit;
			events = result.events;
			if (result.accessor) {
				if (!unit[arrayName]) {
					Object.defineProperty(unit, arrayName,
					{
						get: result.accessor.get
					});
				} else {
					showDebug && console.log('Could not define property', arrayName, 'for', name);
				}
			}
		})

		unit.serialize = function () {
			var data = {};
			_.each(propNames, function (propName) {
				data[propName] = unit[propName];
			})
			_.each(arrayNames, function (arrayName) {
				var array = unit[arrayName].serialize();
				data[arrayName] = array;
			})
			return data;
		}

		unit.on = function (event, callback) {
			if (!events[event] || !_.isArray(events[event])) {
				events[event] = [];
			}
			events[event].push(callback);
			showDebug && debugLevel > 0 && console.log(events[event]);
		}

		unit.off = function (event, callback) {
			events[event] = _.remove(events[event], callback);
			showDebug && debugLevel > 0 && console.log(events[event]);
		}

		_.each(radioNames, function (item) {
			if (item.duplicate && item.container == name) {
				propNames = _.without(propNames, item.prop);
				showDebug && console.log(name, 'tried to bind radio group', item.name, 'under different names');
				delete unit[item.prop];
			}
		})

		unit.props = propNames;

		if (!dictionary[name]) {
			dictionary[name] = unit;
		} else {
			if (!_.isArray(dictionary[name])) {
				var array = [];
				array.push(dictionary[name]);
				dictionary[name] = array;
			}
			dictionary[name].push(unit);
		}
		return unit;
	}

	function findPropNames($unit) {
		var name = $unit.attr(selObject);
		var propNames = [];
		var propNameViolations = [];
		var props = $unit.find('[' + selProp + ']');

		_.each(props, function (prop) {
			var $prop = $(prop);
			if ($prop.closest('[' + selObject + ']')[0] == $unit[0]) {
				var propName = $prop.attr(selProp);
				if (!!propName) {
					if (!_.contains(propNames, propName)) {
						propNames.push(propName);
					} else {
						showDebug && console.log(name + "'s", propName, 'violated uniqueness constraint');
						if (!_.contains(propNameViolations, propName)) {
							propNameViolations.push(propName);
						}
					}
				}
			}
		})

		_.each(propNameViolations, function (violation) {
			propNames = _.without(propNames, violation);
		})

		showDebug && debugLevel > 0 && console.log('properties found:', propNames.length);

		return propNames;
	}

	function findArrayNames($unit) {
		var name = $unit.attr(selArray);
		var arrayNames = [];
		var arrayNameViolations = [];
		var arrays = $unit.find('[' + selArray + ']');

		arrayNames = _.map(arrays, function (array) {
			var $array = $(array);
			return $array.attr(selArray);
		})
		arrayNames = _.uniq(arrayNames);

		showDebug && debugLevel > 0 && console.log('arrays found:', arrayNames.length);

		return arrayNames;
	}

	function createPropAccessor($unit, propName, propNames, unit, events) {
		var name = $unit.attr(selObject);
		var $prop = $unit.find('[' + selProp + '="' + propName + '"]');
		var accessors = null;
		var skip = false;

		if ($prop.is('[' + selType + ']')) {
			showDebug && debugLevel > 0 && console.log('createObject - custom');
			var type = $prop.attr(selType);
			if (!!customAccessors[type]) {
				showDebug && debugLevel > 0 && console.log('createObject - custom, found');
				accessors = new customAccessors[type]($prop, function (before, after) {
					if (!!events['change'] && events['change'].length > 0) {
						_.each(events['change'], function (callback) {
							callback(unit, propName, before, after);
						})
					}
				});
			}
		}

		if (!accessors && $prop.is('[type="checkbox"]')) {
			showDebug && debugLevel > 0 && console.log('createObject - checkbox');
			accessors = new CheckboxAccessor($prop, function (before, after) {
				if (!!events['change'] && events['change'].length > 0) {
					_.each(events['change'], function (callback) {
						callback(unit, propName, before, after);
					})
				}
			});
		}

		if (!accessors && $prop.is('[type="number"]')) {
			showDebug && debugLevel > 0 && console.log('createObject - number');
			accessors = new NumberAccessor($prop, function (before, after) {
				if (!!events['change'] && events['change'].length > 0) {
					_.each(events['change'], function (callback) {
						callback(unit, propName, before, after);
					})
				}
			});
		}

		if (!accessors && $prop.is('[type="range"]')) {
			showDebug && debugLevel > 0 && console.log('createObject - range');
			accessors = new RangeAccessor($prop, function (before, after) {
				if (!!events['change'] && events['change'].length > 0) {
					_.each(events['change'], function (callback) {
						callback(unit, propName, before, after);
					})
				}
			});
		}

		if (!accessors && $prop.is('[type="radio"]')) {
			showDebug && debugLevel > 0 && console.log('createObject - radio');
			var radioName = $prop.attr('name');
			var unique = true;
			_.each(radioNames, function (item) {
				if (item.name == radioName) {
					item.duplicate = true;
					propNames = _.without(propNames, propName);
					unique = false;
				}
			})
			if (unique) {
				radioNames.push({
					name: radioName,
					prop: propName,
					container: name,
					duplicate: false
				});
				accessors = new RadioAccessor($prop, function (before, after) {
					if (!!events['change'] && events['change'].length > 0) {
						_.each(events['change'], function (callback) {
							callback(unit, propName, before, after);
						})
					}
				});
			} else {
				skip = true;
			}
		}

		if (!accessors) {
			showDebug && debugLevel > 0 && console.log('createObject - default');
			accessors = new BasicAccessor($prop, function (before, after) {
				if (!!events['change'] && events['change'].length > 0) {
					_.each(events['change'], function (callback) {
						callback(unit, propName, before, after);
					})
				}
			});
		}

		if (!skip) {
			return {
				accessor: accessors,
				propNames: propNames,
				unit: unit,
				events: events
			};
		} else {
			return {
				propNames: propNames,
				unit: unit,
				events: events
			};
		}
	}

	function createArrayAccessor($unit, arrayName, unit, events) {
		var name = $unit.attr(selObject);
		var $arrays = $unit.find('[' + selArray + '="' + arrayName + '"]');
		var accessors = null;
		var skip = false;
		accessors = new ArrayAccessor($arrays, unit, events, arrayName);

		return {
			accessor: accessors,
			unit: unit,
			events: events
		}
	}

	function registerAccessor(typeName, accessor) {
		customAccessors[typeName] = accessor;
	}

	function rescan() {
		var units = $('[' + selObject + ']');
		_.each(units, function (unit) {
			var $unit = $(unit);
			if ($unit.parent().closest('[' + selObject + ']').length == 0) {
				createObject($unit);
			}
		})
	}

	var settings = {};

	Object.defineProperty(settings, 'selObject',
	{
		get: function () { return selObject; },
		set: function (val) {
			if (_.isString(val)) {
				selObject = val;
			}
		}
	});
	Object.defineProperty(settings, 'selProp',
	{
		get: function () { return selProp; },
		set: function (val) {
			if (_.isString(val)) {
				selProp = val;
			}
		}
	});
	Object.defineProperty(settings, 'selType',
	{
		get: function () { return selType; },
		set: function (val) {
			if (_.isString(val)) {
				selType = val;
			}
		}
	});
	Object.defineProperty(settings, 'showDebug',
	{
		get: function () { return showDebug; },
		set: function (val) {
			if (_.isBoolean(val)) {
				showDebug = val;
			}
		}
	});
	Object.defineProperty(settings, 'debugLevel',
	{
		get: function () { return debugLevel; },
		set: function (val) {
			var _val = parseInt(val);
			if (_.isNaN(_val)) { _val = 0; }
			debugLevel = _val;
		}
	});

	var chum = {
		rescan: function () {
			reset();
			rescan();
		},
		registerType: registerAccessor,
		settings: settings
	};
	Object.defineProperty(chum, 'items',
	{
		get: function () { return dictionary; }
	})
	Object.defineProperty(chum, 'version',
	{
		get: function () { return version; }
	})

	$(function () {
		if (!window.console) {
			showDebug = false;
		}
		chum.rescan();
	})

	return {
		chum: chum
	};
})