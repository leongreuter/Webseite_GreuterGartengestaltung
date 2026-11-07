// Interaktive Animations-Vorschau (nur Entwicklung, nicht Teil des Builds).
import '@fontsource/dm-sans/latin-400.css'
import '@fontsource/dm-sans/latin-500.css'
import '@fontsource/dm-sans/latin-600.css'
import '@fontsource/dm-sans/latin-700.css'
import '@fontsource/manrope/latin-400.css'
import '@fontsource/manrope/latin-500.css'
import '../src/styles/base.css'

const $ = (s, r = document) => r.querySelector(s)
const $$ = (s, r = document) => [...r.querySelectorAll(s)]
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches

// Restart a CSS animation by toggling the .play class.
function replay(el) {
  el.classList.remove('play')
  void el.offsetWidth
  el.classList.add('play')
  if (el.id === 'd10s') countUp(el)
}

// Split headings into words (demo 04).
for (const h of $$('[data-words]')) {
  h.innerHTML = h.textContent
    .split(' ')
    .map((w, i) => `<span class="w" style="--i:${i}">${w}</span>`)
    .join(' ')
}

// Counter (demo 10).
function countUp(root) {
  for (const el of $$('[data-count]', root)) {
    const to = Number(el.dataset.count)
    const from = Number(el.dataset.from ?? 0)
    const start = performance.now()
    const dur = 1800
    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur)
      const eased = 1 - Math.pow(1 - p, 4)
      el.textContent = String(Math.round(from + (to - from) * eased))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }
}

// Play scroll-triggered demos when they enter the viewport.
const io = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (e.isIntersecting) { replay(e.target); io.unobserve(e.target) }
  }),
  { threshold: 0.3 },
)
$$('[data-io]').forEach((el) => io.observe(el))
$$('[data-replay]').forEach((b) => b.addEventListener('click', () => replay(document.getElementById(b.dataset.replay))))

// 03 Parallax and 13 line drawing, both driven by page scroll.
const parallax = $$('[data-parallax]')
const svgPaths = $$('#d13svg path')
svgPaths.forEach((p) => {
  const len = p.getTotalLength()
  p.style.strokeDasharray = len
  p.style.strokeDashoffset = len
})
function onScroll() {
  const vh = innerHeight
  for (const f of parallax) {
    const r = f.getBoundingClientRect()
    const progress = (r.top + r.height / 2 - vh / 2) / vh
    f.firstElementChild.style.transform = `translateY(${progress * -12}%)`
  }
  const svg = $('#d13svg')
  if (svg) {
    const r = svg.getBoundingClientRect()
    const p = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.75)))
    svgPaths.forEach((path, i) => {
      const local = Math.min(1, Math.max(0, p * 1.6 - i * 0.12))
      path.style.strokeDashoffset = path.getTotalLength() * (1 - local)
    })
  }
}
if (!reduced) { addEventListener('scroll', onScroll, { passive: true }); onScroll() }

// 05 Page transition.
let mode = 'fade'
$$('.seg button').forEach((b) => b.addEventListener('click', () => {
  mode = b.dataset.mode
  $$('.seg button').forEach((o) => o.setAttribute('aria-pressed', String(o === b)))
}))
const pages = $$('.pg')
$$('#d5nav button').forEach((b) => b.addEventListener('click', () => {
  const next = pages[Number(b.dataset.p)]
  const cur = $('.pg.on')
  if (next === cur) return
  $$('#d5nav button').forEach((o) => o.toggleAttribute('aria-current', o === b))
  const swap = () => {
    cur.classList.remove('on'); cur.classList.add('out')
    next.classList.add('on')
    setTimeout(() => cur.classList.remove('out'), 400)
  }
  if (mode === 'veil') {
    const veil = $('.veil')
    veil.classList.remove('go'); void veil.offsetWidth; veil.classList.add('go')
    setTimeout(swap, 330)
  } else swap()
}))

// 06 Magnetic buttons.
if (matchMedia('(hover: hover)').matches) {
  for (const btn of $$('[data-mag]')) {
    const zone = btn.parentElement
    zone.addEventListener('mousemove', (e) => {
      const r = btn.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width / 2)
      const dy = e.clientY - (r.top + r.height / 2)
      const near = Math.hypot(dx, dy) < r.width
      btn.style.transform = near ? `translate(${dx * 0.25}px, ${dy * 0.35}px)` : ''
    })
    zone.addEventListener('mouseleave', () => (btn.style.transform = ''))
  }
}

// 07 Header compact / hide.
const sc7 = $('#d7s'), h7 = $('#d7h')
let last7 = 0
sc7.addEventListener('scroll', () => {
  const y = sc7.scrollTop
  h7.classList.toggle('compact', y > 40)
  h7.classList.toggle('hide', y > 260 && y > last7)
  last7 = y
}, { passive: true })

// 08 Progress line with seven topics.
const topics = [
  ['01', 'Holz', ['story-home-14', 'story-home-5', 'story-home-2']],
  ['02', 'Stein', ['greuter-stein-02', 'greuter-stein-03', 'greuter-stein-04']],
  ['03', 'Wasser', ['greuter-wasser-01', 'greuter-wasser-05', 'greuter-wasser-06']],
  ['04', 'Licht', ['greuter-licht-01', 'greuter-licht-03', 'greuter-licht-04']],
  ['05', 'Mauern', ['greuter-mauern-01', 'greuter-mauern-03', 'greuter-mauern-04']],
  ['06', 'Beläge', ['greuter-belaege-01', 'greuter-belaege-02', 'greuter-belaege-04']],
  ['07', 'Pläne', ['greuter-plaene-02', 'greuter-plaene-05', 'greuter-plaene-07']],
]
const sc8 = $('#d8s')
$('#d8t').innerHTML = topics.map(([n, t]) => `<a href="#" data-t="${n}">${n} ${t}</a>`).join('')
$('#d8c').innerHTML = topics.map(([n, t, imgs]) =>
  `<div class="ch" id="t${n}"><h4><span>${n}</span>${t}</h4><div class="imgs">${imgs.map((i) => `<div><img src="/assets/${i}.webp" alt="" loading="lazy"></div>`).join('')}</div></div>`).join('')
$$('#d8t a').forEach((a) => a.addEventListener('click', (e) => {
  e.preventDefault()
  const ch = document.getElementById('t' + a.dataset.t)
  sc8.scrollTo({ top: ch.offsetTop - $('.topics').offsetHeight + 1, behavior: 'smooth' })
}))
sc8.addEventListener('scroll', () => {
  const max = sc8.scrollHeight - sc8.clientHeight
  $('#d8p').style.width = `${(sc8.scrollTop / max) * 100}%`
  const mark = sc8.scrollTop + $('.topics').offsetHeight + 40
  let active = topics[0][0]
  for (const [n] of topics) if (document.getElementById('t' + n).offsetTop <= mark) active = n
  $$('#d8t a').forEach((a) => a.classList.toggle('on', a.dataset.t === active))
}, { passive: true })
sc8.dispatchEvent(new Event('scroll'))

// 09 Mobile menu.
const phone = $('#d9p'), burger = $('.burger', phone)
burger.addEventListener('click', () => {
  const open = phone.classList.toggle('open')
  burger.setAttribute('aria-expanded', String(open))
  burger.setAttribute('aria-label', open ? 'Menü schliessen' : 'Menü öffnen')
})
$$('.ovl a', phone).forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); burger.click() }))

// 11 Before / after.
const ba = $('#d11s')
const setBA = (clientX) => {
  const r = ba.getBoundingClientRect()
  const p = Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100))
  $('.before', ba).style.clipPath = `inset(0 ${100 - p}% 0 0)`
  $('.handle', ba).style.left = $('.knob', ba).style.left = `${p}%`
}
let dragging = false
ba.addEventListener('pointerdown', (e) => { dragging = true; ba.setPointerCapture(e.pointerId); setBA(e.clientX) })
ba.addEventListener('pointermove', (e) => dragging && setBA(e.clientX))
ba.addEventListener('pointerup', () => (dragging = false))

// 12 Marquee.
const words = ['Holz', 'Stein', 'Wasser', 'Licht', 'Mauern', 'Beläge', 'Pläne']
const words2 = ['Planen', 'Gestalten', 'Pflegen', 'Mit der Natur', 'Seit 2005', 'Greifensee']
const fill = (el, list) => (el.innerHTML = [...list, ...list, ...list, ...list].map((w) => `<span>${w}</span>`).join(''))
fill($('#d12a'), words)
fill($('#d12b'), words2)
