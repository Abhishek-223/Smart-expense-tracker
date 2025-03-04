const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['src/index.jsx'],
  bundle: true,
  outfile: 'dist/bundle.js',
  loader: { '.js': 'jsx', '.jsx': 'jsx' },
}).catch(() => process.exit(1));