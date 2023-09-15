const { build } = require('esbuild');
const { copy } = require('esbuild-plugin-copy');

build({
  entryPoints: ['./index.ts'],
  bundle: true,
  minify: true,
  platform: 'node',
  outdir: './dist',
  target: 'es2022',
  plugins: [
    copy({
      resolveFrom: 'cwd',
      assets: {
        from: ['./node_modules/@zeswen/db/schema.prisma'],
        to: ['./dist'],
      },
    }),
  ],
});
