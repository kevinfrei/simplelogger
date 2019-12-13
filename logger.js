// @flow

const disabled /*: Set<mixed>*/ = new Set();
const enabled /*: Set<mixed>*/ = new Set();

let defaultToShow = true;

/*::
type logType = {
  (id: mixed, ...args: Array<mixed>): void,
  disable: (id: mixed) => void,
  enable: (id: mixed) => void,
  defaultToOff: () => void,
  defaultToOn: () => void,
  bind: (id: mixed) => (...args: Array<mixed>) => void
};
*/ 

const log /*:logType*/ = (id /*: mixed*/, ...args /*: Array<mixed>*/) => {
  if (
    (defaultToShow && !disabled.has(id)) ||
    (!defaultToShow && enabled.has(id))
  ) {
    console.log(...args);
  }
};

log.disable = (id /*: mixed*/) => {
  disabled.add(id);
};

log.enable = (id /*: mixed*/) => {
  disabled.delete(id);
};

log.defaultToOff = () => {
  defaultToShow = false;
};

log.defaultToOn = () => {
  defaultToShow = true;
};

log.bind = (id /*:mixed*/) => (...args /*:Array<mixed>*/) => log(id, ...args);

module.exports = log;
