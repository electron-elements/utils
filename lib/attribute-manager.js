class AttributeManager {
  constructor(el, propertyBridge) {
    this.el = el;
    this.attrs = new Map();
    this.changeHandlers = new Map();

    this.init();
  }

  init() {
    const { el, attrs } = this;
    for (let attr of el.attributes) {
      attrs.set(attr.name, attr.value);
    }
  }

  set(attr, value = '') {
    this.el.setAttribute(attr, value);
  }

  get(attr) {
    return this.el.getAttribute(attr);
  }
}

module.exports = AttributeManager;
