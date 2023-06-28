const { build } = require('esbuild');
const { copy } = require('esbuild-plugin-copy');

build({
  bundle: true,
  minify: true,
  platform: 'node',
  outdir: './dist',
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
