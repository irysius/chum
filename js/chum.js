(function (definition) {
	var exports = definition();
	window.chum = exports.chum;
})(function () {
	var selObject = 'data-chum-obj';
	var selProp = 'data-chum-prop';
	var selType = 'data-chum-type';
	var showDebug = false;
	var dictionary = {};
	var events = {};
	var customAccessors = {};
	var radioNames = []; // Limit one property ever on grouped radios.

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
		$elem[0].checked = checked;
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
		return $('input[type="radio"][name="' + name + '"]:checked').val();
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

	function createObject($unit) {
		var name = $unit.attr(selObject);
		if (!name) { return null; }
		showDebug && console.log('---', name);
		var unit = {};
		var events = {};
		var propNames = [];
		var propNameViolations = [];
		var props = $unit.find('[' + selProp + ']');
		_.each(props, function (prop) {
			var $prop = $(prop);
			var propName = $prop.attr(selProp);
			if (!!propName) {
				console.log(propNames);
				if (!_.contains(propNames, propName)) {
					propNames.push(propName);
				} else {
					console.log(name + "'s", propName, 'violated uniqueness constraint');
					if (!_.contains(propNameViolations, propName)) {
						propNameViolations.push(propName);
					}
				}
			}
		})

		_.each(propNameViolations, function (violation) {
			propNames = _.without(propNames, violation);
		})


		showDebug && console.log('properties found:', propNames.length);

		_.each(propNames, function (propName) {
			var $prop = $unit.find('[' + selProp + '="' + propName + '"]');
			var accessors = null;
			var skip = false;

			if ($prop.is('[' + selType + ']')) {
				showDebug && console.log('createObject - custom');
				var type = $prop.attr(selType);
				if (!!customAccessors[type]) {
					showDebug && console.log('createObject - custom, found');
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
				showDebug && console.log('createObject - checkbox');
				accessors = new CheckboxAccessor($prop, function (before, after) {
					if (!!events['change'] && events['change'].length > 0) {
						_.each(events['change'], function (callback) {
							callback(unit, propName, before, after);
						})
					}
				});
			}

			if (!accessors && $prop.is('[type="number"]')) {
				showDebug && console.log('createObject - number');
				accessors = new NumberAccessor($prop, function (before, after) {
					if (!!events['change'] && events['change'].length > 0) {
						_.each(events['change'], function (callback) {
							callback(unit, propName, before, after);
						})
					}
				});
			}

			if (!accessors && $prop.is('[type="radio"]')) {
				showDebug && console.log('createObject - radio');
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
				showDebug && console.log('createObject - default');
				accessors = new BasicAccessor($prop, function (before, after) {
					if (!!events['change'] && events['change'].length > 0) {
						_.each(events['change'], function (callback) {
							console.log(callback);
							callback(unit, propName, before, after);
						})
					}
				});
			}

			try {
				if (!skip) {
					Object.defineProperty(unit, propName,
                    {
                    	get: accessors.get,
                    	set: accessors.set
                    });
				}
			} catch (err) {
				showDebug && console.log('Could not define property', propName, 'for', name);
			}
		})

		unit.serialize = function () {
			var data = {};
			_.each(propNames, function (propName) {
				data[propName] = unit[propName];
			})
			return data;
		}

		unit.on = function (event, callback) {
			if (!events[event] || !_.isArray(events[event])) {
				events[event] = [];
			}
			events[event].push(callback);
			showDebug && console.log(events[event]);
		}

		unit.off = function (event, callback) {
			events[event] = _.remove(events[event], callback);
			showDebug && console.log(events[event]);
		}

		_.each(radioNames, function (item) {
			if (item.duplicate && item.container == name) {
				propNames = _.without(propNames, item.prop);
				delete unit[item.prop];
			}
		})

		unit.props = propNames;

		dictionary[name] = unit;
		return dictionary[name];
	}

	function registerAccessor(typeName, accessor) {
		customAccessors[typeName] = accessor;
	}

	function rescan() {
		var units = $('[' + selObject + ']');
		_.each(units, function (unit) {
			createObject($(unit));
		})
		if (!!events['rescanned'] && events['rescanned'].length > 0) {
			_.each(events['rescanned'], function (callback) {
				callback();
			})
		}
	}

	function on(event, callback) {
		if (!events[event] || !_.isArray(events[event])) {
			events[event] = [];
		}
		events[event].push(callback);
	}

	function off(event, callback) {
		events[event] = _.remove(events[event], callback);
	}

	var chum = {
		rescan: rescan,
		registerType: registerAccessor,
		items: dictionary,
		on: on,
		off: off
	}

	$(function () {
		chum.rescan();
	})

	return {
		chum: chum
	};
})