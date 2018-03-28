class AttributeManager {
  constructor(el, propertyBridge) {
    this.el = el;
    this.changeHandlers = new Map();
  }

  init() {
    const { el, attrs } = this;
    for (let attr of el.attributes) {
      attrs.set(attr.name, attr.value);
    }
  }

  get(attr) {
    return this.el.getAttribute(attr);
  }

  onchange(attrs, handler) {
    this.changeHandlers.set(attrs, handler);
  }

  getChangeHandler(attr) {
    let handler = [];
    this.changeHandlers.forEach((attrs, func) => {
      if (attrs.include(attr)) {
        handler.push(func);
      }
    });

    return handler;
  }

  onchangeEvent(attr, _old, _new) {
    /* Pending implementation of attribut to proto bridge */
  }

  createAttrToPropBridge(attrs) {
    attrs.forEach(attr => {
      const prop = this._getPropFromAttr(attr);
      this._defineProp(prop, attr);
    });
  }

  _getPropFromAttr(attr) {
    while (attr.includes('-')) {
      const latter = attr.match(/-(.)/)[1].toUpperCase();
      attr = attr.replace(/-./, latter);
    }

    return attr;
  }

  _defineProp(prop, attr) {
    Object.defineProperty(prop, {
      set(value) {
        const oldValue = this.get(attr);
        this.set(attr, value);

        attr = attr.replace(/^data-/, '');
        this.onchangeEvent(attr, oldValue, value);
      }
    });
  }
}

module.exports = AttributeManager;
