const result = await Bun.build({
  entrypoints: ['./index.ts'],
  outdir: './dist',
  target: 'bun',
  minify: true
})

// eslint-disable-next-line no-console
console.log(result)
