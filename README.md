# Chum

Be best buddies with input elements with Chum!

Chum has a hard dependency on jQuery and lodash.

Chum relies on data attributes to make its magic work.

## Chum Data Attributes

### `data-chum-obj`

Represents an item.

### `data-chum-prop`

Represents a property in an item.

### `data-chum-type`

Indicates to Chum that this property requires a custom binding object.  This custom binding object can be registered via `chum.registerType(string, function)`

## Chum Usage

### `chum.items`

Returns a dictionary of items parsed by Chum.

### `chum.rescan()`

Causes Chum to rescan the DOM for parsable objects.

### `chum.registerType(string, function)`

Registers a custom binding object to Chum for non-standard input types.

The binding function returns an object with the signature: `{ get: function () { return any; }, set: function (val: any) { } }`

The binding function takes the following parameters: `($elem: jQueryObject, change: function)`

The change function in the parameter of the binding function has the following signature: `(oldValue: any, newValue: any)`

## Chum item usage

### `item.serialize()`

Returns a non-complicated object (for use in posting back and stuff).

### `item.on('change', callback)`

Registers a callback to the item's change event.  Change is fired whenever the item's properties are set programmatically, or via user input.

The callback takes a function with the following signature: `(item: Object, property: string, oldValue: any, newValue: any)`

### `item.off('change', callback)`

Removes callback from the change event.
