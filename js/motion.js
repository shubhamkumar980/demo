/* Punjab Ki Rasoi — scroll choreography.
   Budget, held deliberately: one pinned section, parallax on decorative layers
   only, everything else a short rise-and-fade. All of it is optional — if GSAP
   fails to load or the visitor prefers reduced motion, the page renders in its
   final state and nothing is lost. */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function revealAll() {
    root.classList.remove('js-on');
    document.querySelectorAll('[data-anim]').forEach(function (el) {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }

  /* ── Things that work with or without GSAP ──────────────────────────── */

  // Today's row in the hours table
  var today = new Date().getDay();
  var row = document.querySelector('[data-day="' + today + '"]');
  if (row) {
    row.style.fontWeight = '700';
    row.style.color = 'var(--accent-text)';
    var th = row.querySelector('th');
    if (th) th.insertAdjacentHTML('beforeend', ' <span class="text-xs">· today</span>');
  }

  // Sticky action bar, once the hero is behind you
  var bar = document.getElementById('actionbar');
  var hero = document.querySelector('header');
  if (bar && hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      bar.classList.toggle('translate-y-full', entries[0].isIntersecting);
    }, { rootMargin: '-40% 0px 0px 0px' }).observe(hero);
  }

  /* ── Auto-advancing rails ────────────────────────────────────────────
     Phone only. The track is duplicated once; when the scroll position
     passes the end of the first copy we subtract exactly one copy's width,
     which lands on an identical frame. Motion therefore only ever runs one
     direction and never rewinds. Snapping is suspended for that single
     frame so the snap engine doesn't drag the jump back. */
  function initMarquee(rail) {
    var interval = parseInt(rail.dataset.marqueeInterval, 10) || 2000;
    var mq = window.matchMedia('(max-width: 767px)');
    var originals = Array.prototype.slice.call(rail.children);
    var timer = null, resumeTimer = null, wired = false, cloned = false;
    var animating = false, animTimer = null;

    function addClones() {
      if (cloned) return;
      originals.forEach(function (el) {
        var c = el.cloneNode(true);
        c.setAttribute('aria-hidden', 'true');
        c.setAttribute('data-clone', '');
        c.removeAttribute('data-anim');
        c.style.opacity = '1';
        c.style.transform = 'none';
        c.querySelectorAll('a, button, summary').forEach(function (n) { n.tabIndex = -1; });
        rail.appendChild(c);
      });
      cloned = true;
    }

    function removeClones() {
      rail.querySelectorAll('[data-clone]').forEach(function (n) { n.remove(); });
      cloned = false;
    }

    // Distance from the first original to its clone == one full set.
    function setWidth() {
      var firstClone = rail.querySelector('[data-clone]');
      return firstClone ? firstClone.offsetLeft - originals[0].offsetLeft : 0;
    }

    function step() {
      if (originals.length < 2) return 0;
      return originals[1].offsetLeft - originals[0].offsetLeft;
    }

    function wrapIfNeeded() {
      // A programmatic smooth scroll always starts from inside the first copy,
      // so it never needs a wrap; letting one fire here would cancel it.
      if (animating) return;
      var w = setWidth();
      if (w > 0 && rail.scrollLeft >= w) {
        rail.classList.add('is-wrapping');
        rail.scrollLeft = rail.scrollLeft - w;
        requestAnimationFrame(function () { rail.classList.remove('is-wrapping'); });
      }
    }

    function advance() {
      if (document.hidden) return;
      wrapIfNeeded();
      animating = true;
      clearTimeout(animTimer);
      animTimer = setTimeout(function () { animating = false; }, 700);
      rail.scrollBy({ left: step(), behavior: 'smooth' });
    }

    function play() { stop(); timer = setInterval(advance, interval); }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }

    function pauseThenResume() {
      animating = false;
      stop();
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(play, 5000);
    }

    function wire() {
      if (wired) return;
      rail.addEventListener('scroll', wrapIfNeeded, { passive: true });
      rail.addEventListener('pointerdown', pauseThenResume, { passive: true });
      rail.addEventListener('touchstart', pauseThenResume, { passive: true });
      rail.addEventListener('mouseenter', stop);
      rail.addEventListener('mouseleave', play);
      rail.addEventListener('focusin', stop);
      wired = true;
    }

    function enable() { addClones(); wire(); play(); }
    function disable() { stop(); clearTimeout(resumeTimer); removeClones(); rail.scrollLeft = 0; }

    function sync() { mq.matches ? enable() : disable(); }

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stop(); else if (mq.matches) play();
    });
    mq.addEventListener('change', sync);
    sync();
  }

  if (!reduced) {
    document.querySelectorAll('[data-marquee]').forEach(initMarquee);
  }

  if (reduced || !window.gsap) { revealAll(); return; }

  /* ── GSAP ───────────────────────────────────────────────────────────── */

  var gsap = window.gsap;
  var ST = window.ScrollTrigger;
  if (ST) gsap.registerPlugin(ST);

  root.classList.remove('js-on');

  // Hero headline, split to characters. SplitText is optional — without it the
  // headline simply fades, which is why the fallback sets opacity directly.
  var headline = document.querySelector('[data-split]');
  if (headline) {
    if (window.SplitText) {
      var split = new window.SplitText(headline, { type: 'chars' });
      gsap.from(split.chars, {
        opacity: 0, y: 20, rotateX: -40,
        duration: 0.6, stagger: 0.015, ease: 'expo.out', delay: 0.15
      });
    } else {
      gsap.from(headline, { opacity: 0, y: 20, duration: 0.7, ease: 'expo.out' });
    }
  }

  // Everything tagged for a reveal
  gsap.utils.toArray('[data-anim="rise"]').forEach(function (el) {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 0.5, ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true }
    });
  });
  // Hero's own reveals fire on load rather than on scroll
  gsap.to(document.querySelectorAll('header [data-anim]'), {
    opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'expo.out', delay: 0.3
  });

  // Count-ups in the proof strip
  gsap.utils.toArray('[data-count]').forEach(function (el) {
    var end = parseFloat(el.dataset.count);
    var decimals = (el.dataset.count.split('.')[1] || '').length;
    var obj = { v: 0 };
    gsap.to(obj, {
      v: end, duration: 0.9, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      onUpdate: function () { el.textContent = obj.v.toFixed(decimals); }
    });
  });

  if (!ST) return;

  // Hero image drifts slower than the page
  var heroImg = document.querySelector('[data-parallax]');
  if (heroImg) {
    gsap.to(heroImg, {
      yPercent: 12, ease: 'none',
      scrollTrigger: { trigger: 'header', start: 'top top', end: 'bottom top', scrub: 0.5 }
    });
  }

  // The one pinned section. Pinning is desktop-only — on a phone it fights
  // native scroll and costs more than it gives.
  var tandoor = document.getElementById('tandoor');
  var tandoorBg = document.querySelector('[data-tandoor-bg]');
  if (tandoor && tandoorBg) {
    gsap.matchMedia().add('(min-width: 768px)', function () {
      gsap.timeline({
        scrollTrigger: {
          trigger: tandoor, start: 'top top', end: '+=150%',
          scrub: 1, pin: true, anticipatePin: 1
        }
      }).to(tandoorBg, { yPercent: -15, ease: 'none' }, 0);
    });
    gsap.matchMedia().add('(max-width: 767px)', function () {
      gsap.to(tandoorBg, {
        yPercent: -10, ease: 'none',
        scrollTrigger: { trigger: tandoor, scrub: true }
      });
    });
  }

  var tandoorHead = document.querySelector('[data-split-2]');
  if (tandoorHead) {
    gsap.from(tandoorHead, {
      opacity: 0, y: 30, duration: 0.7, ease: 'expo.out',
      scrollTrigger: { trigger: tandoorHead, start: 'top 85%', once: true }
    });
  }

  // Pinning measures layout, so re-measure once fonts and images have settled.
  window.addEventListener('load', function () { ST.refresh(); });
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () { ST.refresh(); });
  }
})();
