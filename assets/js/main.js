/* ===== PRELOADER ===== */
window.addEventListener('load', () => {
  const preloader = document.querySelector('.preloader');
  setTimeout(() => {
    preloader.classList.add('hidden');
    setTimeout(() => preloader.remove(), 500);
  }, 800);
});

/* ===== NAVBAR SCROLL EFFECT ===== */
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ===== SMOOTH SCROLL FOR ANCHOR LINKS ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const navbarCollapse = document.querySelector('.navbar-collapse');
      if (navbarCollapse?.classList.contains('show')) {
        bootstrap.Collapse.getInstance(navbarCollapse).hide();
      }
    }
  });
});

/* ===== SCROLL REVEAL ANIMATIONS ===== */
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
revealElements.forEach(el => revealObserver.observe(el));

/* ===== SCROLL-TRIGGERED COUNTER ANIMATION ===== */
const counters = document.querySelectorAll('.counter');
let countersAnimated = false;
const counterObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !countersAnimated) {
    countersAnimated = true;
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;
      const updateCounter = () => {
        current += increment;
        if (current < target) {
          counter.innerText = Math.ceil(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.innerText = target + '+';
        }
      };
      updateCounter();
    });
  }
}, { threshold: 0.5 });
if (counters.length > 0) counterObserver.observe(counters[0].closest('.stats'));

/* ===== LIGHTBOX ===== */
// ⚠️ GLightbox is initialized in videos.html for independent video playback
// Do NOT re-initialize here to avoid conflicts with loop/settings
// This file handles: preloader, navbar, scroll, counters, lazy load, menu, parallax

/* ===== BACK TO TOP BUTTON ===== */
const backToTopBtn = document.createElement('button');
backToTopBtn.className = 'back-to-top';
backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
backToTopBtn.setAttribute('aria-label', 'Back to top');
document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ===== LAZY LOADING FALLBACK ===== */
if (!('loading' in HTMLImageElement.prototype)) {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
        }
        img.removeAttribute('loading');
        imageObserver.unobserve(img);
      }
    });
  });
  lazyImages.forEach(img => { if (img.dataset.src) imageObserver.observe(img); });
}

/* ===== MOBILE MENU ENHANCEMENTS ===== */
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

navbarToggler?.addEventListener('click', () => {
  document.body.style.overflow = navbarCollapse?.classList.contains('show') ? '' : 'hidden';
});

document.addEventListener('click', (e) => {
  if (window.innerWidth < 992 && 
      navbarCollapse?.classList.contains('show') && 
      !navbarCollapse.contains(e.target) && 
      !navbarToggler?.contains(e.target)) {
    bootstrap.Collapse.getInstance(navbarCollapse)?.hide();
    document.body.style.overflow = '';
  }
});

/* ===== PARALLAX EFFECT FOR HERO ===== */
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  const scrolled = window.scrollY;
  if (hero && scrolled < window.innerHeight) {
    hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
  }
});

/* ===== CONSOLE WELCOME MESSAGE ===== */
console.log('%c✨ 7 Changes Enterprise %c\n💎 Luxury Event Decor & Rentals\n📍 South Africa\n📱 +27 76 113 5095\n🎨 Colors: White, Black, Lime Green',
  'color: #39FF14; font-size: 18px; font-weight: bold; text-shadow: 0 0 10px rgba(57,255,20,0.8);',
  'color: #000; font-size: 12px;'
);