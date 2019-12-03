// @flow
const disabled/*: Set<mixed>*/ = new Set();
const enabled/*: Set<mixed>*/ = new Set();

let defaultToShow = true;

const log = (id/*: mixed*/, ...args/*: Array<mixed>*/) => {
  if (
    (defaultToShow && !disabled.has(id)) ||
    (!defaultToShow && enabled.has(id))
  ) {
    console.log(...args);
  }
};

log.disable = (id/*: mixed*/) => {
  disabled.add(id);
};

log.enable = (id/*: mixed*/) => {
  disabled.delete(id);
};

log.defaultToOff = () => defaultToShow = false;
log.defaultToOn = () => defaultToShow = true;

log.bind = (name/*:id*/) => (...args/*:mixed*/) => log(id, ...args);

module.exports = log;

