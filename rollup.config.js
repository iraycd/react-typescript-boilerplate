import babel from "rollup-plugin-babel";
import replace from 'rollup-plugin-replace';
import commonjs from "rollup-plugin-commonjs";
import nodeResolve from "rollup-plugin-node-resolve";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { sizeSnapshot } from "rollup-plugin-size-snapshot";
import sourcemaps from "rollup-plugin-sourcemaps";
import typescript from "rollup-plugin-typescript2";
import globals from 'rollup-plugin-node-globals';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import clear from "rollup-plugin-clear";

import pkg from "./package.json";

const input = "src/index.tsx";
const external = Object.keys(pkg.peerDependencies || {});

/**
 * Where our output will be written to disk
 */
const outputDir = "./public/dist/";

function createPlugins({
  useSizeSnapshot,
  prod
} = {
  useSizeSnapshot: false,
}) {
  const plugins = [
    clear({
      targets: [outputDir],
      watch: true
    }),
    peerDepsExternal(),
    nodeResolve(),
    babel({
      exclude: "node_modules/**"
    }),
    commonjs({
      include: [
        'node_modules/**'
      ],
      exclude: [
        'node_modules/process-es6/**'
      ],
      namedExports: {
        'node_modules/react/index.js': ['Children', 'Component', 'PropTypes', 'createElement'],
        'node_modules/react-dom/index.js': ['render']
      }
    }),
    replace({
      ENVIRONMENT: JSON.stringify('production')
    }),
    globals(),
    typescript(),
    sourcemaps(),
    serve({
      open: true,
      contentBase: 'public',
      port: process.env.PORT || 3000,
    })
  ];
  !prod && plugins.push(livereload('public'));
  useSizeSnapshot && plugins.push(sizeSnapshot());
  return plugins;
}

export default [
  {
    input: input,
    output: {
      file: './public/dist/index.js',
      format: "es",
      banner: "/* eslint-disable */",
      sourcemap: true
    },
    watch: {
      clearScreen: false
    },
    external: external,
    plugins: createPlugins(),
  }
];