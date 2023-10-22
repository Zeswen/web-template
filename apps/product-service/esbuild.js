import { context } from 'esbuild'
import { copy } from 'esbuild-plugin-copy'
import { spawn } from 'node:child_process'

let previousProcess

const isWatchMode = process.argv.includes('--watch')

const copyPlugin = copy({
  resolveFrom: 'cwd',
  assets: {
    from: ['./node_modules/@zeswen/db/schema.prisma'],
    to: ['./dist']
  }
})

const rebuildPlugin = {
  name: 'on-end',
  setup: build =>
    build.onEnd(() => {
      if (previousProcess) {
        console.log('Build successful.')
        previousProcess.kill()
      }
      const currentProcess = spawn('node', ['dist'])
      currentProcess.stdout.on('data', data => console.log(data.toString()))
      currentProcess.stderr.on('data', data => console.log(data.toString()))
      previousProcess = currentProcess
    })
}

const buildContext = await context({
  entryPoints: ['./index.ts'],
  bundle: true,
  minify: true,
  splitting: true,
  treeShaking: true,
  platform: 'node',
  format: 'esm',
  outdir: './dist',
  target: 'es2022',
  plugins: [copyPlugin, ...(isWatchMode ? [rebuildPlugin] : [])],
  banner: {
    js: `import r from"path";import{fileURLToPath as e}from"url";import{createRequire as m}from"module";let require=m(import.meta.url),__filename=e(import.meta.url),__dirname=r.dirname(__filename);`
  }
})

if (isWatchMode) {
  await buildContext.watch()
  console.log(`Watching for changes...`)
} else {
  await buildContext.rebuild()
  buildContext.dispose()
  console.log('Build successful.')
}
