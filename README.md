# simplelogger
A *VERY* simplistic console.log replacement to enable filtering

## Usage:

``` javascript
const logger = require('simplelogger');
const log = logger.bind('name');
// logger.disable('name')

log("Here's my message");
log(`Or maybe ${this} instead...`);
log(this);

logger.disable('name');
log("This won't get disabled, now");

if (logger.isEnabled('name')) {
  doSomethingSlowAndBig();
}
logger('otherName', this);
logger('otherName', "will also work");
logger('name', "and this won't get displayed now");
log('But just use it this way');
log('then you can turn it on and off easily');

```

## API:

The default export is a log function that takes an initial 'labelling' parameter, which is *only* used to to control whether the log message is displayed. Thus, you can just use the thing like this:
``` javascript
const logger = require('simplelogger');
logger(1234, "<- that thing won't ever get logged");
```
But that's not really the point.

The point is to use `logger.bind` to enable you to switch all your `console.log(...)` commands over to just `log(...)` commands and then be able to turn them on and off trivially.

`simplelogger.bind(name)` returns a function that works just like `console.log`, but can be enabled or disabled using the rest of the API.

`simplelogger.disable(name)` will disable logging for any logger bound to that name.

`simplelogger.enable(name)` will enable logging for any logger bound to that name.

`simplelogger.defaultToOff()` makes the logger only show logs for names which have been *explicitly enabled* using the `enable` API.

`simplelogger.defaultToOn()` makes the logger show any logs for names unless they have been *explicitly disabled* using the `disable` API. **This is the default mode of operation.**

`simplelogger.isDisabled(name)` returns true if name has logging disabled.

`simplelogger.isEnabled(name)` returns true if name has logging enabled.


