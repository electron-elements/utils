class AttributeManager {
  constructor(el) {
    if (!el) {
      throw Error('Element must be passed to AttributeManager!');
    }

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

  set(attr, value = '') {
    this.el.setAttribute(attr, value);
  }

  onAttributeChange(attrs, handler) {
    this.changeHandlers.set(attrs, handler);
  }

  getChangeHandler(attr) {
    let handler = [];
    this.changeHandlers.forEach((func, attrs) => {
      if (attrs.include(attr)) {
        handler.push(func);
      }
    });

    return handler;
  }

  attributeChangeEvent(attr, _old, _new) {
    this.changeHandlers.forEach((handler, attrs) => {
      if (attrs.includes(attr)) {
        handler.call(this.el, attr, _old, _new);
      }
    });
  }

  createAttrToPropBridge(attrs, { addDataAttrs = false }) {
    if (addDataAttrs) {
      attrs.forEach(attr => attrs.push(`data-${attr}`));
    }

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
    /* eslint-disable-next-line accessor-pairs */
    Object.defineProperty(this.el, prop, {
      set(value) {
        const oldValue = this.get(attr) || null;
        this.set(attr, value);

        attr = attr.replace(/^data-/, '');
        this.attributeChangeEvent(attr, oldValue, value);
      }
    });
  }
}

module.exports = AttributeManager;
