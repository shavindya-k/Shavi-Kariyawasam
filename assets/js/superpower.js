/**
 * superpower.js
 * ─────────────────────────────────────────────────────────────
 * Fires two animations when the #superpower section enters
 * the viewport — both use IntersectionObserver so they only
 * trigger once (not on every scroll).
 *
 * 1. VENN DIAGRAM
 *    Adds .lit to each SVG element in sequence, triggering
 *    the CSS opacity transitions defined in superpower.css.
 *    Sequence: circle 1 → circle 2 → circle 3 → centre badge
 *             → orbit ring → label groups
 *
 * 2. TRAIT SLIDE-INS
 *    Adds .visible to each .sp-trait in sequence, triggering
 *    the CSS translateX + opacity transition.
 * ─────────────────────────────────────────────────────────────
 */

const superpowerSection = document.getElementById('superpower');
if (!superpowerSection) throw new Error('superpower.js: #superpower section not found');

const vennSvg = document.getElementById('venn-svg');

/** Shorthand: add a class to an element after a delay (ms) */
const addClassAfter = (element, className, delayMs) => {
  if (!element) return;
  setTimeout(() => element.classList.add(className), delayMs);
};

// ── Venn animation ────────────────────────────────────────────
let vennFired = false;

const vennObserver = new IntersectionObserver(entries => {
  if (vennFired) return;

  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    vennFired = true;

    addClassAfter(vennSvg.querySelector('.vc-1'),      'lit',  100);
    addClassAfter(vennSvg.querySelector('.vc-2'),      'lit',  450);
    addClassAfter(vennSvg.querySelector('.vc-3'),      'lit',  800);
    addClassAfter(vennSvg.querySelector('.vc-centre'), 'lit', 1200);
    addClassAfter(vennSvg.querySelector('.vc-name'),   'lit', 1350);
    addClassAfter(vennSvg.querySelector('.vc-tag'),    'lit', 1500);
    addClassAfter(vennSvg.querySelector('.orbit-ring'),'lit', 1400);
    addClassAfter(vennSvg.querySelector('.vl-1'),      'lit', 1700);
    addClassAfter(vennSvg.querySelector('.vl-2'),      'lit', 1900);
    addClassAfter(vennSvg.querySelector('.vl-3'),      'lit', 2100);
  });
}, { threshold: 0.3 });

vennObserver.observe(superpowerSection);

// ── Trait slide-in animation ──────────────────────────────────
let traitsFired = false;

const traitObserver = new IntersectionObserver(entries => {
  if (traitsFired) return;

  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    traitsFired = true;

    document.querySelectorAll('.sp-trait').forEach((trait, index) => {
      setTimeout(() => trait.classList.add('visible'), 600 + index * 200);
    });
  });
}, { threshold: 0.2 });

traitObserver.observe(superpowerSection);
