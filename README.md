# Linemod

[![npm version](https://img.shields.io/npm/v/linemod.svg?style=flat)](https://www.npmjs.com/package/linemod)
[![npm downloads](https://img.shields.io/npm/dm/linemod.svg?style=flat)](https://www.npmjs.com/package/linemod)
[![neostandard javascript style](https://img.shields.io/badge/code_style-neostandard-7fffff?style=flat&labelColor=ff80ff)](https://github.com/neostandard/neostandard)
[![Follow @voxpelli@mastodon.social](https://img.shields.io/mastodon/follow/109247025527949675?domain=https%3A%2F%2Fmastodon.social&style=social)](https://mastodon.social/@voxpelli)

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

### `linemod-add:`

Prefixes the line with whatever is specified after the keyword:

```javascript
// linemod-add: import escape from 'stringify-entities';
```

Becomes:

```javascript
import escape from 'stringify-entities';
```

### `linemod-prefix-with:`

Prefixes the line with whatever is specified after the keyword:

```javascript
const exportedMethod = () => {}; // linemod-prefix-with: export
```

Becomes:

```javascript
export const exportedMethod = () => {};
```

### `linemod-replace-with:`

Replaces the line with whatever is specified after the keyword:

```javascript
const escape = require('stringify-entities'); // linemod-replace-with: import escape from 'stringify-entities';
```

Becomes:

```javascript
import escape from 'stringify-entities';
```

### `linemod-remove`

Simply removes the entire line.

Quite useful when combined with `linemod-prefix-with`:

```javascript
const exportedMethod = () => {}; // linemod-prefix-with: export
module.exports = { exportedMethod }; // linemod-remove
```

Becomes:

```javascript
export const exportedMethod = () => {};
```
