const assert = require('assert');
const TemplateManager = require('../lib/template-manager');

describe('TemplateManager tests', () => {
  describe('TemplateManager.has() tests', () => {
    let templates;
    beforeEach(() => {
      templates = new TemplateManager();
    });

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
    let templates;
    beforeEach(() => {
      templates = new TemplateManager();
    });

    it('should correctly add template', () => {
      const templateName = 'first-part';
      const content = '<h1>First Part</h1>';
      templates.add(templateName, content);
      const template = templates.get(templateName);

      assert(templates.has(templateName));
      assert.deepStrictEqual(template.innerHTML, content);
      assert(templates.templatesTracker.has(templateName));
    });
  });
});
