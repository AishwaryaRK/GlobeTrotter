# makara-writer-amd

Creates AMD formatted language bundles from `.properties` files.

## API

### Default exported function

`module.exports = function writeLocale(appRoot) {...`

- `appRoot {String}`: filesystem path where locale directory resides
- `@returns {Function}`: `function (locale, cb) {`
  - `locale {String}`: (e.g. `fr-FR`)
  - `cb {Function}`: errback or called when all `.properties` files under the given locale directory (`appRoot/FR/fr/`) are 
   transformed into an AMD module `appRoot/.build/fr-FR/_languagepack.js`

### amdBuilder

`module.exports.amdBuilder = function (localeRoot, m, cb) {...`

- `localeRoot {String}`:  filesystem folder under which your `COUNTRY/language` directories reside
- `m {Array}`: where `m[1]` is a language code (en) and `m[2]` is a country code (US)
- `cb {Function}`: called as errback if any downstream errors, otherwise returns a String of the AMD module
