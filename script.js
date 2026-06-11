const menuButton = document.querySelector('.menu-button');
const mobileMenu = document.querySelector('.mobile-menu');
const cursorGlow = document.querySelector('.cursor-glow');

menuButton?.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  mobileMenu.setAttribute('aria-hidden', String(!open));
});

document.querySelectorAll('.mobile-menu a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

window.addEventListener('mousemove', (event) => {
  if (!cursorGlow) return;
  cursorGlow.style.opacity = '1';
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
});

window.addEventListener('mouseleave', () => {
  if (!cursorGlow) return;
  cursorGlow.style.opacity = '0';
});

// Brand logo behavior: on the home page, scroll to top with controlled speed.
// This uses a capturing click listener so the browser cannot jump instantly to #top first.
(() => {
  const scrollToTopSmooth = () => {
    const startY = window.scrollY || window.pageYOffset;
    if (startY <= 0) return;

    const duration = 1800;
    const startTime = performance.now();

    const easeInOutQuad = (t) => (
      t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
    );

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutQuad(progress);
      const nextY = Math.round(startY * (1 - easedProgress));

      window.scrollTo(0, nextY);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        window.scrollTo(0, 0);
        window.history.replaceState(null, '', window.location.pathname);
      }
    };

    requestAnimationFrame(animate);
  };

  document.addEventListener('click', (event) => {
    const homeBrand = event.target.closest('[data-home-brand]');
    if (!homeBrand) return;

    event.preventDefault();
    event.stopPropagation();
    scrollToTopSmooth();
  }, true);
})();
