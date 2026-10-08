// Builds "Rounak Burman - Resume.pdf" from resume/resume.html with the Edge or
// Chrome already installed on this machine (playwright-core downloads nothing).
//
//   npm run resume      then   npm run assets   to refresh the site from it
//
// The resume must stay on one Letter page: the build fails if the content
// overflows the page box instead of silently spilling onto page two.
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { chromium } from 'playwright-core'

const root = path.resolve(import.meta.dirname, '..')
const src = path.join(root, 'resume', 'resume.html')
const out = path.join(root, 'Rounak Burman - Resume.pdf')

if (!fs.existsSync(src)) {
  console.error('missing resume/resume.html')
  process.exit(1)
}

let browser
for (const channel of ['msedge', 'chrome']) {
  try {
    browser = await chromium.launch({ channel })
    break
  } catch {
    // try the next installed browser
  }
}
if (!browser) {
  console.error('needs Microsoft Edge or Google Chrome installed')
  process.exit(1)
}

const page = await browser.newPage()
await page.goto(pathToFileURL(src).href, { waitUntil: 'load' })
await page.evaluate(() => document.fonts.ready)
const overflow = await page.evaluate(() => {
  const sheet = document.querySelector('.page')
  return sheet ? sheet.scrollHeight - sheet.clientHeight : 0
})
if (overflow > 0) {
  console.error(`the resume overflows its page by ${overflow}px: tighten the content or the spacing in resume/resume.html`)
  await browser.close()
  process.exit(1)
}
await page.pdf({ path: out, preferCSSPageSize: true, printBackground: true })
await browser.close()
console.log(`wrote ${path.relative(root, out)}`)
