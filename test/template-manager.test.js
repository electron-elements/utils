const assert = require('assert');
const TemplateManager = require('../lib/template-manager');

describe('TemplateManager tests', () => {
  let templates;
  beforeEach(() => {
    templates = new TemplateManager();
  });

  describe('TemplateManager.has() tests', () => {
    it('should return false if there is not template', () => {
      assert.deepStrictEqual(templates.has('EEXIST'), false);
    });

    it('should return true if template was added', () => {
      const templateName = 'add-me';
      templates.add(templateName, 'html');
      assert(templates.has(templateName));
    });
  });

  describe('TemplateManager.add() tests', () => {
    it('should correctly add template', () => {
      const templateName = 'first-part';
      const content = '<h1>First Part</h1>';
      templates.add(templateName, content);
      const template = templates.get(templateName);
      const templateElement = templates.templates.get(templateName);

      assert(templates.has(templateName));
      assert(template instanceof DocumentFragment);
      assert.deepStrictEqual(templateElement.innerHTML, content);
      assert(templates.templatesTracker.has(templateName));
    });

    it('should works template passed data', () => {
      const templateName = 'template-data-passed';
      const content = '{{ a }}{{b }}{{ c}} {{d}}';
      const data = {
        a: 'one',
        b: 'two',
        c: 'three',
        d: 'four'
      };

      const expected = 'onetwothree four';
      templates.add(templateName, content, data);
      assert(templates.get(templateName), expected);
    });
  });

  describe('TemplateManager.update() tests', () => {
    it('should propertly update stuff', () => {
      const templateName = 'update';
      const content = 'Hello, {{name}}';
      templates.add(templateName, content);

      const el = templates.templates.get(templateName);
      assert.deepStrictEqual(el.innerHTML, content);
      templates.update(templateName, { name: 'foo' });
      assert.deepStrictEqual(el.innerHTML, 'Hello, foo');
    });

    it('should remember old data passed', () => {
      const templateName = 'old-data';
      const content = '{{ foo }}{{ bar }}';
      templates.add(templateName, content, { foo: 'foo' });

      const el = templates.templates.get(templateName);
      assert.deepStrictEqual(el.innerHTML, 'foo{{ bar }}');
      templates.update(templateName, { bar: 'bar' });
      assert.deepStrictEqual(el.innerHTML, 'foobar');
    });

    it('test noCache option', () => {
      const templateName = 'noCache';
      const content = '{{ a }}{{ b }}';
      templates.add(templateName, content, { a: 'a' });

      const el = templates.templates.get(templateName);
      assert.deepStrictEqual(el.innerHTML, 'a{{ b }}');
      templates.update(templateName, { b: 'b' }, true);
      assert.deepStrictEqual(el.innerHTML, '{{ a }}b');
    });
  });
});
