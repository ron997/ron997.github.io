/**
 * The resume's layout, as PyMuPDF read it at build time (scripts/prepare_assets.py).
 * Every box drawn over the page in the hero is one of these elements.
 */
import layoutJson from '../data/resume-layout.json'

export type LayoutClass =
  | 'title' | 'contact' | 'section-header' | 'text' | 'key-value' | 'org' | 'role' | 'meta' | 'list-item'

export type LayoutElement = {
  order: number
  cls: LayoutClass
  bbox: [number, number, number, number]
  text: string
}

type LayoutData = {
  source: string
  extractor: string
  page: [number, number]
  elements: LayoutElement[]
  redactions: { cls: string; bbox: [number, number, number, number] }[]
}

export const layout = layoutJson as LayoutData
export const elements = layout.elements
export const classCount = new Set(elements.map((e) => e.cls)).size

const normalize = (s: string) => s.replace(/^•\s*/, '').replace(/[^a-z0-9]+/gi, ' ').trim().toLowerCase()

/** The reading-order number of the element whose text starts like `prefix`. */
export function orderOf(prefix: string): number | undefined {
  const p = normalize(prefix)
  return elements.find((e) => normalize(e.text).startsWith(p))?.order
}

/** Order numbers spanned by a run of resume text (first and last line of a role, say). */
export function span(first: string, last: string): string {
  const a = orderOf(first)
  const b = orderOf(last)
  if (a === undefined) return ''
  return b === undefined || b === a ? `line ${a}` : `lines ${a}–${b}`
}

const SECTION_TARGETS: Record<string, { id: string; label: string }> = {
  'PROFESSIONAL SUMMARY': { id: 'summary', label: 'Summary' },
  'TECHNICAL SKILLS': { id: 'skills', label: 'Skills' },
  'WORK EXPERIENCE': { id: 'experience', label: 'Experience' },
  PROJECTS: { id: 'projects', label: 'Projects' },
  EDUCATION: { id: 'education', label: 'Education' },
}

const slug = (s: string) => s.toLowerCase().replace(/,.*$/, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

/**
 * Where each element lives on this site, so a box on the page links to the
 * section that renders it. Roles in Work Experience link to their own card.
 */
export const targets: Map<number, { id: string; label: string }> = (() => {
  const map = new Map<number, { id: string; label: string }>()
  let current = { id: 'top', label: 'Top' }
  let pendingOrg: number[] = []
  let inExperience = false
  for (const e of elements) {
    if (e.cls === 'title') { map.set(e.order, { id: 'top', label: 'Top' }); continue }
    if (e.cls === 'contact') { map.set(e.order, { id: 'contact', label: 'Contact' }); continue }
    if (e.cls === 'section-header') {
      current = SECTION_TARGETS[e.text] ?? current
      inExperience = e.text === 'WORK EXPERIENCE'
      map.set(e.order, current)
      continue
    }
    if (inExperience && e.cls === 'org') { pendingOrg = [e.order]; continue }
    if (inExperience && e.cls === 'role') {
      current = { id: `exp-${slug(e.text)}`, label: e.text }
      for (const o of pendingOrg) map.set(o, current)
      pendingOrg = []
    }
    if (inExperience && e.cls === 'meta' && pendingOrg.length) { pendingOrg.push(e.order); continue }
    map.set(e.order, current)
  }
  return map
})()
