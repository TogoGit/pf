(function () {
  'use strict';

  /* ---------- Language toggle ---------- */
  var langButtons = document.querySelectorAll('[data-set-lang]');
  var titles = {
    en: 'Togo — Offensive Security & Business',
    fr: 'Togo — Sécurité offensive & Business'
  };

  function setLang(lang) {
    document.querySelectorAll('body [data-lang]').forEach(function (el) {
      el.hidden = el.getAttribute('data-lang') !== lang;
    });
    document.documentElement.setAttribute('lang', lang);
    document.title = titles[lang] || titles.en;

    langButtons.forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(btn.getAttribute('data-set-lang') === lang));
    });
  }

  langButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      setLang(btn.getAttribute('data-set-lang'));
    });
  });

  /* ---------- Scroll reveal ---------- */
  var revealTargets = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealTargets.length) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealTargets.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Credential bar fill ---------- */
  var bars = document.querySelectorAll('.bar-fill');

  if ('IntersectionObserver' in window && bars.length) {
    var barObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var target = entry.target.getAttribute('data-target') || '0';
            entry.target.style.width = target + '%';
            barObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    bars.forEach(function (el) { barObserver.observe(el); });
  } else {
    bars.forEach(function (el) {
      el.style.width = (el.getAttribute('data-target') || '0') + '%';
    });
  }
})();
