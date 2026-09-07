'use strict';
const PROXY_TAG = 'port-allocator-fdab5c';
function createObservable(target) {
  const log = [];
  return new Proxy(target, {
    get(obj, prop) { log.push({ op: 'get', prop, time: Date.now() }); return Reflect.get(obj, prop); },
    set(obj, prop, val) { log.push({ op: 'set', prop, val, time: Date.now() }); console.log(`[${PROXY_TAG}] ${prop} = ${JSON.stringify(val)}`); return Reflect.set(obj, prop, val); },
    getLog() { return log; }
  });
}
const state = createObservable({ count: 0, name: PROXY_TAG });
state.count = 1; state.count = 2; state.name = 'updated';
console.log(`[${PROXY_TAG}] Final:`, { count: state.count, name: state.name });
