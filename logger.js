"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var disabled = new Set();
var enabled = new Set();
var defaultToShow = true;
var log = function (id) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    if ((defaultToShow && !disabled.has(id)) ||
        (!defaultToShow && enabled.has(id))) {
        console.log.apply(console, args);
    }
};
log.disable = function (id) {
    disabled.add(id);
    enabled.delete(id);
};
log.enable = function (id) {
    disabled.delete(id);
};
log.defaultToOff = function () {
    defaultToShow = false;
};
log.defaultToOn = function () {
    defaultToShow = true;
};
log.enable = function (id) {
    enabled.add(id);
    disabled.delete(id);
};
log.isEnabled = function (id) { return enabled.has(id); };
log.isDisabled = function (id) { return disabled.has(id); };
log.bind = function (id, enabled) {
    var boundLogger = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return log.apply(void 0, __spreadArrays([id], args));
    };
    if (enabled) {
        log.enable(id);
    }
    else {
        log.disable(id);
    }
    return boundLogger;
};
var theLogger = log;
exports.default = theLogger;
