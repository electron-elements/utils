# `TemplateManager`

`TemplateManager` can be used easily when working with custom elements.
It was created keeping in mind the functionality that was used in first
[electron-element](https://github.com/electron-elements/electron-elements#electron-elements)
[send-feedback](https://github.com/electron-elements/send-feedback). It provides
basic templating utilities.

Through this docs `templates` will be:
```javascript
const { TemplateManager } = require('../lib');
const templates = new TemplateManager();
```

## `add(name, html[, data])`

  * `name` (string) - the name of template you are adding
  * `html` (string) - html of the template
  * data (object: optional) - the data for the template bindings

You can add multiple templates, which allows you to have organized templates
for the different parts of your element. The data and template bindings are case sensitive.

Example:
```javascript
const data = { name: 'utils' };
templates.add('first-template', `
  <div>Hello, {{ name }}</div>
`, data)
```

## `update(name, data[, noCache])`

  * `name` (string) - the name of the template to update
  * `data` (object) - data to update the template bindings with
  * `noCache` (boolean: optional, default: false) - weather to use cached data

This method can be used to update the templates. You can update a pre-existing
template, use cached data so you don't have to provide old template binding data:
```javascript
// update the previously added template
// to have `<div>Hello, Utils</div>`
templates.update('first-template', { name: 'Utils' });

// example of caching
templates.add('second-template', `
  first key: {{ key-one }}
  second key: {{ key-two }}
`, { 'key-one': '<First Key>' });
/* now the template would be:
    first key: <First Key>
    second key: {{ key-two }}
*/

// to update the second key without having
// to provide the first key
templates.update('second-template', { 'second-key': '<Second key>' })
/* now the template would be
    first key: <First Key>
    second key: <Second Key>
*/

// To disable this behavoir you can use noCache option
templates.update('second-template', { 'key-one': 'First Key' }, true);
/* now the template would be
    first key: First Key
    second key: {{ key-two }}
*/
```

## `has(name)`

  * `name` (string) - name of the template

returns `true` if the template is added otherwise `false`.

## `get(name)`
 
  * `name` (string) - name of the template

returns `DocumentFragment` of the template, internally `<template>` element is
used to keep track and update the template so the DOM is pre-parsed.

## `updateTemplate(name, html[, data])`

  * `name` (string) - the name of template
  * `html` (string) - the html of template
  * `data` (object: optional) - the data for template bindings

To update the whole template's html you can use this method.

## `remove(name)`

  * `name` - the name of the template to remove

Remove the templates from `TemplateManager`

