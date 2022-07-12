#!/usr/bin/env node
/* eslint-disable no-console */

import chalk from 'chalk';
import meow from 'meow';

import { linemod } from 'linemod-core';

const cli = meow(`
  Usage
    $ linemod -e <output file extension> <path to files, separated by spaces>

  Applies linemods to all listed files and outputs them to their current location with their file extensions replaced by the specified one.

  Options
    -e, --extension  Required. The file extension used for the output files.
    -v, --verbose    Shows warnings and notices.
    --help           Print this help and exits.
    --version        Prints current version and exits.

  Examples
    $ linemod -e mjs index.js lib/utils.js
`, {
  importMeta: import.meta,
  flags: {
    extension: {
      alias: 'e',
      type: 'string',
    },
    verbose: {
      alias: 'v',
      type: 'boolean',
    },
  }
});

const {
  extension,
  verbose
} = cli.flags;

if (!extension) {
  console.error(chalk.bgRed('Missing --extension:') + ' You need to set the file extension to use for the output\n');
  process.exit(1);
}

if (/[^\da-z]/.test(extension)) {
  console.error(chalk.bgRed('Invalid --extension:') + ' Only lower case alpha numeric characters allowed in file extension\n');
  process.exit(1);
}

if (cli.input.length === 0) {
  console.error(chalk.bgRed('Missing files:') + ' You need to specify at least one file\n');
  process.exit(1);
}

try {
  await linemod(cli.input, { outputExtension: '.' + extension });

  if (verbose) {
    console.log(`Modifications applied successfully on ${chalk.bold(cli.input.length)} file(s)\n`);
  }
} catch (err) {
  console.error(
    chalk.bgRed('Unexpected error:') +
    (err instanceof Error ? ' ' + err.message + '\n\n' + err.stack : '') +
    '\n'
  );
  process.exit(1);
}
