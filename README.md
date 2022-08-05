# Linemod

[![npm version](https://img.shields.io/npm/v/linemod.svg?style=flat)](https://www.npmjs.com/package/linemod)
[![npm downloads](https://img.shields.io/npm/dm/linemod.svg?style=flat)](https://www.npmjs.com/package/linemod)
[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg)](https://github.com/voxpelli/eslint-config)
[![Follow @voxpelli](https://img.shields.io/twitter/follow/voxpelli?style=social)](https://twitter.com/voxpelli)

CLI companion for [linemod-core](https://github.com/voxpelli/linemod-core/), a comment driven line modification tool.

## Usage

### As npm script

```json
"scripts": {
  "test": "linemod -e new index.js lib/utils.js"
}
```

### Command line

```bash
npm install -g linemod
```

Then run it at on your files that has modifications:

```bash
linemod -e new index.js lib/utils.js
```

If your command line supports globbing, then you can do:

```bash
linemod -e new *.js lib/**/*.js
```

### Programmatic use

Use [linemod-core](https://github.com/voxpelli/linemod-core) directly.

## Flags

* `--extension` / `-e` – **required** – the file extension used on the output files.

### Additional command line flags

* `--help` / `-h` – prints all available flags
* `--strict` / `-s` – treats warnings as errors
* `--verbose` / `-v` – prints warnings and notices

## Available modifications

All [`linemod-core` modifications](https://github.com/voxpelli/linemod-core/#available-modifications) are supported. Linemods are added at the end of the line they are supposed to apply to.

### `linemod-prefix-with:`

Prefixes the line with whatever is specified after the keyword:

```javascript
const exportedMethod = () => {}; // esm-prefix-with: export
```

Becomes:

```javascript
export const exportedMethod = () => {};
```

### `linemod-replace-with:`

Replaces the line with whatever is specified after the keyword:

```javascript
const escape = require('stringify-entities'); // esm-replace-with: import escape from 'stringify-entities';
```

Becomes:

```javascript
import escape from 'stringify-entities';
```

### `linemod-remove`

Simply removes the entire line.

Quite useful when combined with `linemod-prefix-with`:

```javascript
const exportedMethod = () => {}; // esm-prefix-with: export
module.exports = { exportedMethod }; // esm-remove
```

Becomes:

```javascript
export const exportedMethod = () => {};
```
