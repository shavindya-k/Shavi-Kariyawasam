/**
 * nav.js
 * ─────────────────────────────────────────────────────────────
 * Shrinks the nav bar's vertical padding when the user scrolls
 * down. Uses different padding values for mobile vs desktop to
 * avoid the nav overflowing on small screens.
 * ─────────────────────────────────────────────────────────────
 */

const navEl = document.getElementById('nav');

window.addEventListener('scroll', () => {
  const isMobile   = window.innerWidth <= 960;
  const padDefault = isMobile ? '1rem 1.5rem'   : '1.25rem 4rem';
  const padScrolled = isMobile ? '0.6rem 1.5rem' : '0.8rem 4rem';

  navEl.style.padding = window.scrollY > 60 ? padScrolled : padDefault;
}, { passive: true });
