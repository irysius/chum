(function (definition) {
    var exports = definition();
    window.chum = exports.chum;
})(function () {
    var selObject = 'data-chum-obj';
    var selProp = 'data-chum-prop';
    var selType = 'data-chum-type';
    var showDebug = false;
    var dictionary = {};
    var customAccessors = {};

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

    function createObject($unit) {
        var name = $unit.attr(selObject);
        var unit = {};
        var events = {};
        var props = $unit.find('[' + selProp + ']');
        showDebug && console.log(props);
        var propNames = [];

        _.each(props, function (prop) {
            var $prop = $(prop);
            var propName = $prop.attr(selProp);
            propNames.push(propName);
            var accessors = null;
            if ($prop.is('[' + selType + ']')) {
                showDebug && console.log('createObject - custom');
                var type = $prop.attr(selType);
                if (!!customAccessors[type]) {
                    showDebug && console.log('createObject - custom, found');
                    accessors = customAccessors[type]($prop, function (before, after) {
                        if (events['change'].length > 0) {
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
                    if (events['change'].length > 0) {
                        _.each(events['change'], function (callback) {
                            callback(unit, propName, before, after);
                        })
                    }
                });
            }

            if (!accessors && $prop.is('[type="number"]')) {
                showDebug && console.log('createObject - number');
                accessors = new NumberAccessor($prop, function (before, after) {
                    if (events['change'].length > 0) {
                        _.each(events['change'], function (callback) {
                            callback(unit, propName, before, after);
                        })
                    }
                });
            }

            if (!accessors) {
                showDebug && console.log('createObject - default');
                accessors = new BasicAccessor($prop, function (before, after) {
                    if (events['change'].length > 0) {
                        _.each(events['change'], function (callback) {
                            console.log(callback);
                            callback(unit, propName, before, after);
                        })
                    }
                });
            }

            Object.defineProperty(unit, propName,
                {
                    get: accessors.get,
                    set: accessors.set
                });
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
            console.log(events[event]);
        }

        unit.off = function (event, callback) {
            events[event] = _.remove(events[event], callback);
            console.log(events[event]);
        }

        dictionary[name] = unit;
        return dictionary[name];
    }

    function registerAccessor(typeName, accessor) {
        customAccessors[typeName] = accessor;
        rescan();
    }

    function rescan() {
        var units = $('[' + selObject + ']');
        _.each(units, function (unit) {
            createObject($(unit));
        })
    }

    var chum = {
        rescan: rescan,
        registerType: registerAccessor,
        items: dictionary
    }

    $(function () {
        chum.rescan();
    })

    return {
        chum: chum
    };
})