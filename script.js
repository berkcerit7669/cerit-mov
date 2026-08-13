const menuButton = document.querySelector('.menu-button');
const mobileMenu = document.querySelector('.mobile-menu');
const cursorGlow = document.querySelector('.cursor-glow');

document.querySelector('.brand')?.addEventListener('click', (event) => {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  history.replaceState(null, '', `${location.pathname}${location.search}`);
});

// Mobile devices should hand e-mail links to the user's default mail app.
// On desktop, open Gmail in a new tab so the link also works without a
// configured system mail client.
const isMobileDevice = navigator.userAgentData?.mobile === true
  || /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)
  || (window.matchMedia('(pointer: coarse)').matches && window.innerWidth <= 1024);

if (!isMobileDevice) {
  document.querySelectorAll('.email-link[data-email]').forEach((link) => {
    const email = link.dataset.email;
    link.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;
    link.target = '_blank';
    link.rel = 'noreferrer';
  });
}

menuButton?.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  mobileMenu.setAttribute('aria-hidden', String(!open));
});

document.querySelectorAll('.mobile-menu a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
  });
});

const revealElements = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });

  revealElements.forEach((el) => observer.observe(el));
} else {
  revealElements.forEach((el) => el.classList.add('visible'));
}

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
