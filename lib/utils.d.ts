declare namespace EEUtils {
  interface AttributeChangeOpts {
    addDataAttrs?: boolean,
    handler: Function
  }

  class AttributeManager {
    constructor(el: Node);
    get(attributeName: string): null | string;
    set(attributeName: string, value?: string): undefined;
    onAttributeChange(attributes: string, opts: AttributeChangeOpts): any;
    onAttributeChange(attributes: Array<string>, opts: AttributeChangeOpts): any;
    getChangeHandlers(attr: string): Function[];
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
