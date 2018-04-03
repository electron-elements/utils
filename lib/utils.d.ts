declare namespace EEUtils {
  interface AttributeChangeOpts {
    /*
      Weather to add `data-` attributes for
      the attributes passed in.
    */
    addDataAttrs?: boolean,

    /*
      The handler that would be called when
      and attribute you want to observe is changed
    */
    handler: Function
  }

  class AttributeManager {
    /*
      The element that passed in the constructor
    */
    el: Node;

    /*
      The primitive object of attributes
    */
    attrs: object;

    /*
      change handler Map
    */
    changeHandlers: Map;

    constructor(el: Node);

    /*
      Get a value of an attribute
    */
    get(attributeName: string): null | string;

    /*
      set an attribute on element
    */
    set(attributeName: string, value?: string): undefined;

    /*
      Set up callback handler for specefic group of attributes
    */
    onAttributeChange(attributes: string, opts: AttributeChangeOpts): any;
    onAttributeChange(attributes: Array<string>, opts: AttributeChangeOpts): any;

    /*
      Get all the change handler associated with
      a specefic attribute.
    */
    getChangeHandlers(attr: string): Function[];

    /*
      Create a bridge that will call attribute change
      callback if the property is set on the element.
    */
    createAttrToPropBridge(attr: string): Function[];
  }

  class TemplateManager {
    constructor();
    add(name: string, html: string, data?: object): void;
    update(name: string, data: object, noCache?: boolean): void;
    has(name: string): boolean;
    get(name: string): DocumentFragment;
    getHTMLTemplat(name: string): string;
    getCachedData(name: string): object;
    deleteCachedData(name: string): void;
    updateTemplate(name: string, html: string, data?: object): void;
    remove(name: string): void;
  }
}

declare module '@electron-elements/utils' {
  export = EEUtils;
}
