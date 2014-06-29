# Chum

Be best buddies with input elements with Chum!

Chum has a hard dependency on jQuery and lodash/underscore.

Chum relies on data attributes to make its magic work.

Visit examples, download, view unit tests and roadmap [here](http://irysius.github.io/chum/)

## Quick Start

Reference Chum and its dependencies on the top of your page:

	<head>
		<script src="/js/jquery-2.1.1.js"></script>
        <script src="/js/lodash.js"></script>
        <script src="/js/chum.js"></script>
	</head>

If you have the following snippet in your html:

	<div data-chum-obj="person">
		<input type="text" data-chum-prop="name" value="Big Bad Wolf" />
		<input type="number" data-chum-prop="age" value="300" />
		<div>
			<input type="radio" name="gender" value="male" data-chum-prop="gender" checked />
			<input type="radio" name="gender" value="female" />
		</div>
		<ul>
			<li><input type="text" data-chum-arr="enemies" value="Colin" /></li>
			<li><input type="text" data-chum-arr="enemies" value="Dun" /></li>
			<li><input type="text" data-chum-arr="enemies" value="Posey" /></li>
		</ul>
	</div>

Then when the DOM is loaded, or when you call `chum.rescan()`, the following object is available to you:

	var x = chum.items.person;
	console.log(x.name); // prints "Big Bad Wolf"
	console.log(x.age); // prints 300
	console.log(x.gender); // prints "male"

	console.log(x.enemies); // returns an array-like object
	console.log(x.enemies[2]); // prints "Posey"


## Chum Data Attributes

### `data-chum-obj`

Tagged element represents a container whose properties can be found within as `data-chum-prop` tagged elements.

### `data-chum-prop`

Represents a property in an item.

### `data-chum-arr`

Represents a collection of properties in an item.

### `data-chum-type`

Indicates to Chum that this property requires a custom binding object.  This custom binding object can be registered via `chum.registerType(string, function)`

## Chum Usage

### `chum.items`

Returns a dictionary of items parsed by Chum.

### `chum.rescan()`

Causes Chum to rescan the DOM for `data-chum-obj` tagged elements.

### `chum.registerType(string, function)`

Registers a custom binding object to Chum for non-standard input types.

The binding function returns an object with the signature: 

	{ 
		get: () => any, 
		set: (val: any) => void 
	}

The binding function takes the following parameters: `($elem: jQueryObject, change: function)`

The change function in the parameter of the binding function has the following signature: `(oldValue: any, newValue: any)`

Please see the examples for a concrete implementation of a custom binding function.

## Chum item usage

### `item.serialize()`

Returns a non-complicated object (for use in posting back and stuff).

### `item.on('change', callback)`

Registers a callback to the item's change event.  Change is fired whenever the item's properties are set programmatically, or via user input.

The callback takes a function with the following signature: `(item: Object, property: string, oldValue: any, newValue: any)`

### `item.off('change', callback)`

Removes callback from the change event.
