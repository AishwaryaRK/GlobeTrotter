# makara-builder

Lead Maintainer: [Matt Edelman](https://github.com/grawk)

[![Build Status](https://travis-ci.org/krakenjs/makara-builder.svg?branch=master)](https://travis-ci.org/krakenjs/makara-builder)

Identify all locales under a given directory and call a passed in "writer" for each one

## API

`module.exports = function build(appRoot, writer, cb) {`

- `appRoot {String}` filesystem directory where `locales` directory resides. Under that would be structure e.g. `US/en`, `XC/zh`
- `writer {Function}`
  - `appRoot {String}` same appRoot as above
  - `@returns {Function}`
    - `locale {String}` locale string e.g. `DE-fr`
    - `cb {Function}` errback
- `cb {Function}` called with error or upon successful writing of all locales
    
The writer function is structured as it is because `makara-builder` calls `async.each` for every locale. Thus, the function it calls 
needs to have appRoot in its closure scope.