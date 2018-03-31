
class TemplateManager {
  constructor() {
    this.templates = new Map();
    this.html = new Map();
    this.data = new Map();
    this.templatesTracker = new Set();
  }

  has(name) {
    return this.templatesTracker.has(name);
  }

  add(name, html, data = {}) {
    const template = document.createElement('template');
    this.html.set(name, html);
    this.data.set(name, data);

    template.innerHTML = this._parse(html, data);
    this.templates.set(name, template);
    this.templatesTracker.add(name);
  }

  update(name, data = {}, noCache = false) {
    if (!this.templatesTracker.has(name)) {
      throw new Error('Can\'t update a templates that\'s not added!');
    }

    const { data: cachedData, template, html } = this._get(name);
    if (!noCache) {
      data = Object.assign(cachedData, data);
    }

    template.innerHTML = this._parse(html, data);
    this.templates.set(name, template);
    this.data.set(name, data);
  }

  updateTemplate(name, html, data) {
    this.remove(name);
    this.add(name, html, data);
  }

  remove(name) {
    this.templates.delete(name);
    this.data.delete(name);
    this.html.delete(name);
    this.templatesTracker.delete(name);
  }

  get(name) {
    const template = this.templates.get(name);
    if (!template) {
      return false;
    }

    return template.content.cloneNode(true);
  }

  _get(name) {
    const data = this.data.get(name);
    const template = this.templates.get(name);
    const html = this.html.get(name);

    return {
      template,
      data,
      html
    };
  }

  // instead of looping over template elements
  // and updating each and every element setting
  // the innerHTML of template to a new one is
  // faster due to less updating of DOM.
  // So this is a idiomatic function that updates
  // html and returns it
  _parse(html, data) {
    for (let key in data) {
      const value = data[key];
      const regex = new RegExp(`{{ *${key} *}}`, 'mg');
      html = html.replace(regex, value);
    }

    return html;
  }
}

module.exports = TemplateManager;
