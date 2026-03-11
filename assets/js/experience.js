/**
 * experience.js
 * ─────────────────────────────────────────────────────────────
 * Handles tab switching in the Experience section.
 *
 * showExp(id, tabElement)
 *   - Hides all panels, removes .active from all tabs
 *   - Shows the panel matching `id`, marks `tabElement` active
 *   - On mobile (≤960px), scrolls the active tab into view
 *     so the user doesn't have to swipe to find it
 *
 * Called inline from each tab's onclick attribute in index.html.
 * ─────────────────────────────────────────────────────────────
 */

function showExp(id, clickedTab) {
  // Hide all panels and deactivate all tabs
  document.querySelectorAll('.exp-panel').forEach(panel => panel.classList.remove('active'));
  document.querySelectorAll('.exp-tab').forEach(tab => tab.classList.remove('active'));

  // Show the selected panel and activate the clicked tab
  document.getElementById('exp-' + id).classList.add('active');
  clickedTab.classList.add('active');

  // On mobile the tabs are in a horizontal scroll container —
  // scroll the newly active tab into the centre of view
  if (window.innerWidth <= 960) {
    clickedTab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }
}
