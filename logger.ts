const disabled: Set<unknown> = new Set();
const enabled: Set<unknown> = new Set();

let defaultToShow = true;

type logType = {
  (id: unknown, ...args: Array<unknown>): void;
  disable: (id: unknown) => void;
  enable: (id: unknown) => void;
  defaultToOff: () => void;
  defaultToOn: () => void;
  isEnabled: (id: unknown) => boolean;
  isDisabled: (id: unknown) => boolean;
  bind: (id: unknown, enabled?: boolean) => (...args: Array<unknown>) => void;
};

const log = (id: unknown, ...args: Array<unknown>) => {
  if (
    (defaultToShow && !disabled.has(id)) ||
    (!defaultToShow && enabled.has(id))
  ) {
    console.log(...args);
  }
};

log.disable = (id: unknown) => {
  disabled.add(id);
  enabled.delete(id);
};

log.enable = (id: unknown) => {
  disabled.delete(id);
};

log.defaultToOff = () => {
  defaultToShow = false;
};

log.defaultToOn = () => {
  defaultToShow = true;
};

log.enable = (id: unknown) => {
  enabled.add(id);
  disabled.delete(id);
};

log.isEnabled = (id: unknown): boolean => enabled.has(id);

log.isDisabled = (id: unknown): boolean => disabled.has(id);

log.bind = (
  id: unknown,
  enabled?: boolean
): ((...args: Array<unknown>) => void) => {
  const boundLogger = (...args: Array<unknown>) => log(id, ...args);
  if (enabled) {
    log.enable(id);
  } else {
    log.disable(id);
  }
  return boundLogger;
};

const theLogger: logType = log;

export default theLogger;
