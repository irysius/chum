# Chum

Be best buddies with input elements with Chum!

Chum has a hard dependency on jQuery and lodash/underscore.

Chum relies on data attributes to make its magic work.

## Why Chum?

jQuery does a wonderful job of helping me locate DOM elements and their values.  I really like jQuery.  But having to write data-binding javascript over and over again isn't fun, and it's especially not fun having to account for careful relations between elements if the UI changes on you.

Initially I thought my solution was with the likes of knockout or backbone; but alas, model binding with those libraries requires you to know what the model is before hand.  Often times, the model gets modified to quickly, or worse, gets composed at the client.

Angular crossed my mind, but to be frank, knowledge of jQuery is better know among other developers.  Besides, I might as well write the app in angular since it kind of solves my dilemma already.  But jQuery is far more agreeable with other javascript libraries.

## Getting Started

View the examples to get a better idea of what Chum is, and what kind of pain points it is trying to soothe.  For now, here's a gist of how Chum works:

1. Tag html (or generated html) elements with data-chum-* attributes, signalling Chum that an object-like relationship exists across these elements.
2. Load Chum in a script tag.  If you ajax in new elements, simply tell Chum to rescan the document for updates.
3. When the document has finished loaded, access the object Chum parses from the DOM.
4. Manipulate the object to your liking - there's a two-way binding between the object, and the elements you've tagged.

That's really it.

## Chum Data Attributes

### `data-chum-obj`

Tagged element represents an container whose properties can be found within as `data-chum-prop` tagged elements.

### `data-chum-prop`

Represents a property in an item.

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
