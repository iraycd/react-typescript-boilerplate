const depcheck = require('depcheck');

const options = {
  withoutDev: false, // [DEPRECATED] check against devDependencies
  ignoreBinPackage: false, // ignore the packages with bin entry
  skipMissing: false, // skip calculation of missing dependencies
  ignoreDirs: [ // folder with these names will be ignored
    'sandbox',
    'dist',
    'build',
    'node_modules',
  ],
  ignoreMatches:['@types'],
  ignores:[
    "@types/react",
  ],
  parsers: {
    '*.js': depcheck.parser.es6,
    '*.jsx': depcheck.parser.jsx,
    '*.ts': depcheck.parser.typescript,
    '*.tsx': depcheck.parser.typescript,
  },
  detectors: [ // the target detectors
    depcheck.detector.requireCallExpression,
    depcheck.detector.importDeclaration
  ],
  specials: [ // the target special parsers
    depcheck.special.eslint,
    depcheck.special.webpack
  ],
};

depcheck(__dirname, options, (unused) => {
  console.log(unused); // an array containing the unused dependencies
});