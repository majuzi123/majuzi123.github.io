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

  /* ---------- 1. Title ---------- */
  var TITLES = {
    zh: '马搏 Bo Ma · 移动端自动化测试 / 大模型质量效能',
    en: 'Bo Ma · Mobile Testing Automation / LLM for Quality Engineering'
  };

  /* ---------- 2. Theme ---------- */
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

  /* ---------- 3. Language ---------- */
  var langToggle = document.getElementById('langToggle');
  var langLabel = document.getElementById('langLabel');

  function applyLang(lang) {
    root.setAttribute('lang', lang);
    if (langLabel) langLabel.textContent = lang === 'zh' ? 'EN' : '中文';
    if (langToggle) {
      langToggle.setAttribute(
        'aria-label',
        lang === 'zh' ? 'Switch to English' : '切换为中文'
      );
    }
    document.title = TITLES[lang] || TITLES.en;
  }

  applyLang(read(STORE.lang, 'en'));

  if (langToggle) {
    langToggle.addEventListener('click', function () {
      var next = root.getAttribute('lang') === 'zh' ? 'en' : 'zh';
      applyLang(next);
      write(STORE.lang, next);
    });
  }

  /* ---------- 4. Sidebar contents highlight ---------- */
  var sections = Array.prototype.slice.call(
    document.querySelectorAll('.content > .section[id]')
  );
  var links = Array.prototype.slice.call(
    document.querySelectorAll('#sideNav a')
  );

  if ('IntersectionObserver' in window && sections.length && links.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var id = entry.target.getAttribute('id');
          links.forEach(function (a) {
            a.classList.toggle('is-active', a.getAttribute('href') === '#' + id);
          });
        });
      },
      { rootMargin: '-15% 0px -70% 0px', threshold: 0 }
    );
    sections.forEach(function (s) {
      observer.observe(s);
    });
  }

  /* ---------- 5. Scroll reveal ---------- */
  var items = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          obs.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.06 }
    );
    items.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    items.forEach(function (el) {
      el.classList.add('is-in');
    });
  }
})();
