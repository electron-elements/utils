class AttributeManager {
  constructor(el) {
    if (!el) {
      throw Error('Element must be passed to AttributeManager!');
    }

    this.el = el;
    this.changeHandlers = new Map();
    this._mutationHandler = this._mutationHandler.bind(this);
    this.observer = new MutationObserver(this._mutationHandler);
    this.observer.observe(el, {
      attributes: true,
      attributeOldValue: true
    });
  }

  get(attr) {
    return this.el.getAttribute(attr);
  }

  set(attr, value = '') {
    this.el.setAttribute(attr, value);
  }

  onAttributeChange(attrs, { addDataAttrs = false, handler }) {
    attrs = [].concat(attrs);
    if (addDataAttrs) {
      attrs.forEach(attr => attrs.push(`data-${attr}`));
    }

    this.changeHandlers.set(attrs, handler);
  }

  getChangeHandlers(attr) {
    let handler = [];
    this.changeHandlers.forEach((func, attrs) => {
      if (attrs.includes(attr)) {
        handler.push(func);
      }
    });

    return handler;
  }

  attributeChangeEvent(attr, _old, _new, namespace) {
    this.changeHandlers.forEach((handler, attrs) => {
      if (attrs.includes(attr)) {
        handler.call(this.el, attr, _old, _new, namespace);
      }
    });
  }

  createAttrToPropBridge(attrs) {
    attrs = [].concat(attrs);
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

  _mutationHandler(record) {
    record = record[0];
    const attr = record.attributeName;
    const _old = record.oldValue;
    const _new = this.get(attr);
    const namespace = record.attributeNamespace;
    this.attributeChangeEvent(attr, _old, _new, namespace);
  }

  _defineProp(prop, attr) {
    const instance = this;
    /* eslint-disable-next-line accessor-pairs */
    Object.defineProperty(this.el, prop, {
      set(value) {
        const oldValue = instance.get(attr) || null;
        instance.set(attr, value);

        attr = attr.replace(/^data-/, '');
        instance.attributeChangeEvent(attr, oldValue, value);
      }
    });
  }
}

module.exports = AttributeManager;
