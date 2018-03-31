# `AttributeManager`

`AttributeManager` will allow you manage your attributes of custom elements.
This also provides way to handle change event event with properties on element.

## `AttributeManager(el)`

  * `el` (element: Node) - Element to control attributes of.

The constructor expects a element to grep handle of normally this
should be done in constructor of your custom element:
```javascript
class CustomElement extends HTMLElement {
  constructor() {
    this.attr = new AttributeManager(this);
  }
}
```

## `get(attributeName)`

  * `attributeName` (string) - the name of attribute to get

Return the value of the attribute.

## `set(attribute[, value])`

  * `attribute` - the name of attribute to set
  * `value` (string: optional, default='') - the value to set

Sets the attribute on the elements.

## `onAttributeChange(attributes, opts)`

  * `attrs` (string or array) - The attributes watch.
  * `opts` (object):
    * `addDataAttrs` (boolean, optional, default=false) - To also watch `data` attributes
    * `handler` (function) - the function that will be called when attribute is changed
      handler will be called with `attribute`, `oldvalue`, `newValue` and `namespace` this
      is same as `attributeChangedCallback`. The handler will have `this` to be the `element`
      you passed in to the constructor.

This allows to watch set of attributes and have custom function in middle for the
set of attribute you want. This functionality is provided by watching the attributes using
`MutationObserver` internally. It is possible to have multiple function for each set of attributes.

## `getChangeHandlers(attr)`

  * `attr` - the name of attribute to get handler from.

Return an array of handlers.

## `createAttrToPropBridge(attrs)`

  * `attrs` (string or array) - The attribute to handle circles. 
