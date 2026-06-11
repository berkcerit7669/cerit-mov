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
// The temporary scrollBehavior override prevents CSS smooth-scroll from fighting the custom animation.
(() => {
  let brandScrollFrame = null;

  const scrollToTopSmooth = () => {
    const startY = window.scrollY || window.pageYOffset;
    if (startY <= 0) return;

    if (brandScrollFrame) {
      cancelAnimationFrame(brandScrollFrame);
    }

    const duration = 1800;
    const startTime = performance.now();
    const html = document.documentElement;
    const body = document.body;
    const previousHtmlScrollBehavior = html.style.scrollBehavior;
    const previousBodyScrollBehavior = body.style.scrollBehavior;

    html.style.scrollBehavior = 'auto';
    body.style.scrollBehavior = 'auto';

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
        brandScrollFrame = requestAnimationFrame(animate);
        return;
      }

      window.scrollTo(0, 0);
      window.history.replaceState(null, '', window.location.pathname);
      html.style.scrollBehavior = previousHtmlScrollBehavior;
      body.style.scrollBehavior = previousBodyScrollBehavior;
      brandScrollFrame = null;
    };

    brandScrollFrame = requestAnimationFrame(animate);
  };

  document.addEventListener('click', (event) => {
    const homeBrand = event.target.closest('[data-home-brand]');
    if (!homeBrand) return;

    event.preventDefault();
    event.stopImmediatePropagation();
    scrollToTopSmooth();
  }, true);
})();
