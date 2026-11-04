import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const packageDir = 'packages/desktop-pet'
const pkg = JSON.parse(fs.readFileSync(path.join(root, packageDir, 'package.json'), 'utf8'))
const indexPath = path.join(root, 'index.json')
const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'))

if (index.format !== 1) throw new Error('index.json format must be 1')

const commit = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim()
if (!/^[0-9a-f]{40}$/.test(commit)) throw new Error(`invalid git commit: ${commit}`)

const existing = index.plugins.find((plugin) => plugin.name === pkg.name)
const previous = existing?.versions?.find((version) => version.version === pkg.version)
const publishTimestamp = previous?.publishTimestamp ?? Math.floor(Date.now() / 1000)

const versions = (existing?.versions ?? []).filter((version) => version.version !== pkg.version)
versions.unshift({
  version: pkg.version,
  publishTimestamp,
  source: {
    type: 'git',
    url: 'https://github.com/miinum5017/DSH-',
    commit,
    path: packageDir,
  },
  engines: {
    dsh: '>=0.2.1-rc.5 <0.3.0',
  },
})

const entry = {
  name: pkg.name,
  title: {
    en: 'Desktop Pet',
    zh: '桌宠',
  },
  description: {
    en: 'A tiny whale that floats in the corner, blinks, talks and follows your drag.',
    zh: '一只待在右下角的小鲸灵：会漂浮、眨眼、说话，还能拖着换位置。',
  },
  icon: `./${packageDir}/icon.svg`,
  author: 'miinum5017',
  homepage: `https://github.com/miinum5017/DSH-/tree/main/${packageDir}`,
  repository: {
    url: 'https://github.com/miinum5017/DSH-',
    directory: packageDir,
  },
  metadata: {
    keywords: ['desktop pet', 'pet', 'whale', 'decoration', '桌宠'],
  },
  versions,
}

const plugins = (index.plugins ?? []).filter((plugin) => plugin.name !== pkg.name)
plugins.push(entry)
index.plugins = plugins

fs.writeFileSync(indexPath, `${JSON.stringify(index, null, 2)}\n`)
console.log(`updated ${pkg.name}@${pkg.version} -> ${commit}`)
