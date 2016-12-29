# A Simple Moudle Loader
[![NPM version][npm-version-image]][npm-url] 
[![NPM downloads][npm-downloads-image]][npm-url] 
[![Build Status][travis-image]][travis-url]
[![Coverage Status][coverage-image]][coverage-url]
[![MIT License][license-image]][license-url]

[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[npm-version-image]: http://img.shields.io/npm/v/clmloader.svg?style=flat
[npm-downloads-image]: http://img.shields.io/npm/dm/clmloader.svg?style=flat
[travis-image]: https://travis-ci.org/conglai/clmloader.svg?branch=master?t=1
[coverage-image]: https://coveralls.io/repos/github/conglai/clmloader/badge.svg?t=1


[license-url]: LICENSE
[npm-url]: https://npmjs.org/package/clmloader
[travis-url]:https://travis-ci.org/conglai/clmloader
[coverage-url]:https://coveralls.io/github/conglai/clmloader

## Install

`NodeJS >= 4.6.0`

```
~ npm install clmloader
```

## Usage

```js
const clmLoad = require('clmloader');

clmLoad({
  path: 'abspath/dir', // absolute dir path
  deps: [dep1, dep2], // deps pass to module function
  defaultFile: 'router', // read which default file
  attach: { //attach some args
    common: 'xx'
  }
});
```


### Example `router.js`

```js
module.exports = function(deps1, deps2) {
  return Promise.resolve({
    test: 2
  });
};

```

### Directory Struct

```
- target_dir
  - module1
    - router.js
  - module2
    - router.js
```

Load results:
```
{ 
  dir2: { 
    test: 2,
    common: 'xx',
    path: 'clmloader/tests/examples-1/dir2',
    name: 'dir2' 
  },
  dir1:{ 
    test: 1,
    path: 'clmloader/tests/examples-1/dir1',
    name: 'dir1',
    common: 'xx' 
  } 
}
```
If you load with `attach`, then result map sub object will all has `common`.





