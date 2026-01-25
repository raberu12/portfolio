/**
 * Scroll Observer Script
 * Handles fade-in/fade-out animations for sections based on scroll direction
 */

const observerOptions: IntersectionObserverInit = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1,
};

let lastScrollY = window.scrollY;

const observer = new IntersectionObserver((entries) => {
  const currentScrollY = window.scrollY;
  const isScrollingDown = currentScrollY > lastScrollY;
  lastScrollY = currentScrollY;

  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      entry.target.classList.remove('is-hidden-below');
    } else {
      entry.target.classList.remove('is-visible');
      // Check if we are scrolling UP and the element is leaving towards the BOTTOM
      if (!isScrollingDown && entry.boundingClientRect.top > 0) {
        entry.target.classList.add('is-hidden-below');
      }
    }
  });
}, observerOptions);

// Listen to scroll to update direction accurately for the observer
window.addEventListener(
  'scroll',
  () => {
    lastScrollY = window.scrollY;
  },
  { passive: true },
);

// Initialize observer on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.fade-in-section');
  sections.forEach((section) => {
    observer.observe(section);
  });
});
