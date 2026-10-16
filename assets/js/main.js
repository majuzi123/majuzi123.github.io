/* ==========================================================================
   Bo Ma · Personal Homepage — interactions
   Vanilla JS, no dependencies.
   ========================================================================== */
(function () {
  'use strict';

  var root = document.documentElement;
  var STORE = { theme: 'bm-theme', lang: 'bm-lang' };

  function read(key, fallback) {
    try {
      return localStorage.getItem(key) || fallback;
    } catch (e) {
      return fallback;
    }
  }

  function write(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      /* private mode — ignore */
    }
  }

  /* ---------- 1. Theme ---------- */
  var themeToggle = document.getElementById('themeToggle');

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (themeToggle) {
      themeToggle.setAttribute(
        'aria-label',
        theme === 'dark' ? '切换到浅色模式' : '切换到深色模式'
      );
    }
  }

  applyTheme(read(STORE.theme, ''));

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      write(STORE.theme, next);
    });
  }

  /* ---------- 2. Language ---------- */
  var langToggle = document.getElementById('langToggle');
  var langLabel = document.getElementById('langLabel');

  function applyLang(lang) {
    root.setAttribute('lang', lang);
    if (langLabel) langLabel.textContent = lang === 'zh' ? 'EN' : '中';
    if (langToggle) {
      langToggle.setAttribute(
        'aria-label',
        lang === 'zh' ? 'Switch to English' : '切换为中文'
      );
    }
    document.title =
      lang === 'zh'
        ? '马搏 Bo Ma · 测试开发 / 质量效能工程师'
        : 'Bo Ma · Test Development / Quality Engineering';
  }

  applyLang(read(STORE.lang, 'zh'));

  if (langToggle) {
    langToggle.addEventListener('click', function () {
      var next = root.getAttribute('lang') === 'zh' ? 'en' : 'zh';
      applyLang(next);
      write(STORE.lang, next);
    });
  }

  /* ---------- 3. Sticky nav state ---------- */
  var nav = document.getElementById('nav');
  var onScroll = function () {
    if (nav) nav.classList.toggle('is-stuck', window.scrollY > 12);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- 4. Mobile menu ---------- */
  var burger = document.getElementById('navBurger');
  var navLinks = document.getElementById('navLinks');

  if (burger && navLinks) {
    burger.addEventListener('click', function () {
      var open = navLinks.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(open));
    });

    navLinks.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        navLinks.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- 5. Active section highlight ---------- */
  var sections = Array.prototype.slice.call(
    document.querySelectorAll('main section[id]')
  );
  var links = Array.prototype.slice.call(
    document.querySelectorAll('.nav__links a')
  );

  if ('IntersectionObserver' in window && sections.length && links.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var id = entry.target.getAttribute('id');
          links.forEach(function (a) {
            a.classList.toggle(
              'is-active',
              a.getAttribute('href') === '#' + id
            );
          });
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    sections.forEach(function (s) {
      observer.observe(s);
    });
  }

  /* ---------- 6. Scroll reveal ---------- */
  var items = Array.prototype.slice.call(
    document.querySelectorAll('.reveal')
  );

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          obs.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    items.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    items.forEach(function (el) {
      el.classList.add('is-in');
    });
  }

  /* ---------- 7. Footer year ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
