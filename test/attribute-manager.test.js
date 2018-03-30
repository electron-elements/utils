const assert = require('assert');
const AttributeManager = require('../lib/attribute-manager');

const test = it;
describe('AttributeManager tests', () => {
  let el, attrs;
  beforeEach(() => {
    el = document.createElement('main');
    attrs = new AttributeManager(el);
  });

  test('AttributeManager.get', () => {
    attrs.set('first');
    attrs.set('data-value', 'test');

    assert.deepStrictEqual(attrs.get('first'), '');
    assert.deepStrictEqual(attrs.get('data-value'), 'test');
  });

  test('AttributeManager.set', () => {
    attrs.set('data-test', 'true');
    assert.deepStrictEqual(el.getAttribute('data-test'), 'true');
  });

  test('AttributeManager.onAttributeChange', async() => {
    let assertCalled = false;
    const callbackPromise = new Promise((resolve) => {
      attrs.onAttributeChange('test', {
        handler: function(attr, _old, _new) {
          assert.deepStrictEqual(this, el);
          assert.deepStrictEqual(attr, 'test');
          assert.deepStrictEqual(_old, null);
          assert.deepStrictEqual(_new, 'new');
          assertCalled = true;
          resolve(true);
        }
      });
    });

    attrs.set('test', 'new');
    await callbackPromise;
    assert(assertCalled);
  });

  test('AttributeManager.getChangeHandlers', () => {
    function a() {}
    function callbackA() {}
    function b() {}
    function callbackB() {}

    let handlers;
    attrs.onAttributeChange('a', { handler: a });
    attrs.onAttributeChange('b', { handler: b });

    handlers = attrs.getChangeHandlers('a');
    assert.deepStrictEqual(handlers, [a]);
    handlers = attrs.getChangeHandlers('b');
    assert.deepStrictEqual(handlers, [b]);

    attrs.onAttributeChange(['a', 'b'], { handler: callbackA });
    handlers = attrs.getChangeHandlers('a');
    assert.deepStrictEqual(handlers, [a, callbackA]);
    handlers = attrs.getChangeHandlers('b');
    assert.deepStrictEqual(handlers, [b, callbackA]);

    attrs.onAttributeChange(['b'], { handler: callbackB });
    handlers = attrs.getChangeHandlers('b');
    assert.deepStrictEqual(handlers, [b, callbackA, callbackB]);
  });

  test('createAttrToPropBridge should work as expected', () => {
    let timesCalled = 0;
    const aProp = 'one';
    const aLongProp = 'two';
    const testColor = 'three';

    attrs.createAttrToPropBridge('aprop');
    attrs.createAttrToPropBridge(['a-long-prop', 'test-color']);
    attrs.onAttributeChange(['aprop', 'a-long-prop', 'test-color'], {
      handler: function() {
        switch (timesCalled) {
          case 0:
            assert.deepStrictEqual(attrs.get('aprop'), aProp);
            break;
          case 1:
            assert.deepStrictEqual(attrs.get('a-long-prop'), aLongProp);
            break;
          case 2:
            assert.deepStrictEqual(attrs.get('test-color'), testColor);
            break;
        }

        timesCalled++;
      }
    });

    el.aprop = aProp;
    el.aLongProp = aLongProp;
    el.testColor = testColor;
    assert.deepStrictEqual(timesCalled, 3);
  });

  test('AttributeManager._getPropFromAttr', () => {
    assert.deepStrictEqual(attrs._getPropFromAttr('aprop'), 'aprop');
    assert.deepStrictEqual(attrs._getPropFromAttr('a-prop'), 'aProp');
    assert.deepStrictEqual(attrs._getPropFromAttr('a-long-prop'), 'aLongProp');
    assert.deepStrictEqual(attrs._getPropFromAttr('a-PrOp'), 'aPrOp');
  });
});
