/**
 * work.js
 * ─────────────────────────────────────────────────────────────
 * Two behaviours for the case study card:
 *
 * 1. TOGGLE (toggleCase)
 *    Opens/closes the collapsible case body.
 *    When CLOSING: if the card header has already scrolled above
 *    the viewport, scrolls it back into view so the user lands
 *    at the top of the card rather than a blank gap.
 *
 * 2. STICKY COLLAPSE BAR (updateStickyBar)
 *    Shows a fixed bar at the bottom of the screen when:
 *      - the case body is open, AND
 *      - the card header has scrolled above the viewport
 *    This lets the user collapse the case without scrolling
 *    all the way back up. Hidden automatically on close.
 * ─────────────────────────────────────────────────────────────
 */

const caseBody    = document.getElementById('case-body');
const caseChevron = document.getElementById('case-chevron');
const caseToggle  = document.querySelector('.case-toggle');
const caseHead    = document.querySelector('.case-head');
const caseSection = document.getElementById('case-booking');
const stickyBar   = document.getElementById('sticky-collapse');

// ── Toggle open / close ───────────────────────────────────────
function toggleCase() {
  const isOpen = caseBody.classList.contains('open');

  caseBody.classList.toggle('open');
  caseChevron.classList.toggle('open');
  caseChevron.querySelector('.chevron-label').textContent = isOpen ? 'Read case study' : 'Collapse';
  caseToggle.setAttribute('aria-expanded', String(!isOpen));

  if (isOpen) {
    // Closing: hide the sticky bar immediately
    stickyBar.classList.remove('visible');

    // If the card header is above the viewport, scroll back to it
    if (caseHead.getBoundingClientRect().top < 0) {
      setTimeout(() => {
        caseHead.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50); // small delay so collapse animation registers first
    }
  }

  updateStickyBar();
}

// ── Sticky bar visibility ─────────────────────────────────────
function updateStickyBar() {
  if (!caseBody.classList.contains('open')) {
    stickyBar.classList.remove('visible');
    return;
  }

  const headRect    = caseHead.getBoundingClientRect();
  const sectionRect = caseSection.getBoundingClientRect();

  // Show when: header is above viewport AND bottom of section is still visible
  const shouldShow = headRect.bottom < 0 && sectionRect.bottom > window.innerHeight * 0.2;
  stickyBar.classList.toggle('visible', shouldShow);
}

window.addEventListener('scroll', updateStickyBar, { passive: true });
