const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const path = require('path');

module.exports = {
  input: {
    index: path.resolve(__dirname, 'src/index.ts'),
    'react/hooks': path.resolve(__dirname, 'src/react/hooks.ts'),
  },
  output: [
    {
      dir: path.resolve(__dirname, '../../dist/packages/sdk'),
      entryFileNames: '[name].js',
      format: 'esm',
      sourcemap: true,
    },
    {
      dir: path.resolve(__dirname, '../../dist/packages/sdk'),
      entryFileNames: '[name].cjs',
      format: 'cjs',
      sourcemap: true,
    },
  ],
  plugins: [
    nodeResolve({ preferBuiltins: true }),
    commonjs(),
    typescript({
      tsconfig: path.resolve(__dirname, 'tsconfig.rollup.json'),
      declaration: false,
      include: ['src/**/*.ts', 'src/**/*.json'],
      resolveJsonModule: true,
    }),
  ],
  external: [
    '@solana/web3.js',
    '@coral-xyz/anchor',
    'buffer',
    'js-sha256',
    'tweetnacl',
    'react',
  ],
};
