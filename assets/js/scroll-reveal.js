/**
 * scroll-reveal.js
 * ─────────────────────────────────────────────────────────────
 * Generic scroll-reveal for any element with the .sr class.
 *
 * How it works:
 *   - Elements start invisible (opacity: 0, translateY: 28px)
 *     via the .sr rule in base.css
 *   - This observer adds .visible when the element enters the
 *     viewport, triggering the CSS transition
 *   - Once revealed, the element is unobserved (fires once only)
 *
 * Optional delay modifiers (also defined in base.css):
 *   .sr-d1  — 100ms delay
 *   .sr-d2  — 200ms delay
 *   .sr-d3  — 300ms delay
 *
 * To make any new element animate in on scroll, simply add
 * class="sr" (or "sr sr-d1" etc.) to it in index.html.
 * ─────────────────────────────────────────────────────────────
 */

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    revealObserver.unobserve(entry.target); // fire once only
  });
}, {
  threshold: 0.08,
  rootMargin: '0px 0px -20px 0px',
});

document.querySelectorAll('.sr').forEach(el => revealObserver.observe(el));
