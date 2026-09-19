/* =============================================================================
   Punjab Ki Rasoi — main.js
   Vanilla JS, no dependencies. Progressive: the page reads fine without it.
   Sections: nav · hours · menu · reveal · rail · parallax · order · lightbox · map
   ========================================================================== */
(function () {
  'use strict';

  var cfg = window.PKR || {};
  var MENU = window.PKR_MENU || [];
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var scrollMode = reduceMotion ? 'auto' : 'smooth';
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var get = function (path) { return path.split('.').reduce(function (o, k) { return o && o[k]; }, cfg); };

  /* ---------- review mode (?review) flags placeholders for the owner ---------- */
  if (/[?&]review\b/.test(location.search)) document.documentElement.classList.add('review-mode');

  /* ---------- config-driven links ---------- */
  $$('[data-link]').forEach(function (a) {
    var key = a.getAttribute('data-link');
    var href = key === 'phone' ? cfg.phoneHref : get(key);
    if (href) a.setAttribute('href', href);
  });

  /* ---------- navigation ---------- */
  var nav = $('#nav');
  function onScrollNav() { nav.classList.toggle('is-scrolled', window.scrollY > 24); }
  onScrollNav();
  window.addEventListener('scroll', onScrollNav, { passive: true });

  var spyLinks = $$('.nav__links a[href^="#"]');
  var spyTargets = spyLinks.map(function (a) { return $(a.getAttribute('href')); }).filter(Boolean);
  if ('IntersectionObserver' in window && spyTargets.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        spyLinks.forEach(function (a) { a.removeAttribute('aria-current'); });
        var link = spyLinks.filter(function (a) { return a.getAttribute('href') === '#' + e.target.id; })[0];
        if (link) link.setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    spyTargets.forEach(function (t) { spy.observe(t); });
  }

  function closeOnBackdrop(d) {
    d.addEventListener('click', function (e) { if (e.target === d) d.close(); });
  }
  var navSheet = $('#nav-sheet');
  var navOpen = $('#nav-open');
  if (navSheet && navOpen && navSheet.showModal) {
    navOpen.addEventListener('click', function () { navSheet.showModal(); });
    $$('[data-close]', navSheet).forEach(function (b) { b.addEventListener('click', function () { navSheet.close(); }); });
    $$('a', navSheet).forEach(function (a) { a.addEventListener('click', function () { navSheet.close(); }); });
  }

  /* ---------- live "Open now" (Indian Standard Time) ---------- */
  function istMinutes() {
    try {
      var parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date());
      var h = 0, m = 0;
      parts.forEach(function (p) { if (p.type === 'hour') h = +p.value % 24; if (p.type === 'minute') m = +p.value; });
      return h * 60 + m;
    } catch (e) { return null; }
  }
  function toMin(s) { var a = s.split(':'); return (+a[0]) * 60 + (+a[1]); }
  function fmt12(s) { var a = s.split(':'); var h = +a[0], m = +a[1]; var ap = h >= 12 ? 'PM' : 'AM'; h = h % 12 || 12; return h + (m ? ':' + (m < 10 ? '0' + m : m) : '') + ' ' + ap; }
  function updateOpen() {
    var el = $('#open-now');
    if (!el || !cfg.hours) return;
    var now = istMinutes();
    if (now == null) return;
    var o = toMin(cfg.hours.open), c = toMin(cfg.hours.close);
    var open = now >= o && now < c;
    var text = open ? 'Open now' : (now < o ? 'Opens ' + fmt12(cfg.hours.open) : 'Closed · opens ' + fmt12(cfg.hours.open));
    el.innerHTML = '<span class="dot' + (open ? '' : ' dot--closed') + '"></span>' + text;
  }
  updateOpen();
  setInterval(updateOpen, 60000);

  /* ---------- menu ---------- */
  var tabsEl = $('#menu-tabs'), panelEl = $('#menu-panel');
  var toggleBtns = $$('#menu-toggle, [data-menu-toggle]');
  var active = MENU.length ? MENU[0].id : null, showAll = false;
  try { var saved = sessionStorage.getItem('pkr-cat'); if (saved && MENU.some(function (c) { return c.id === saved; })) active = saved; } catch (e) {}
  var hm = location.hash.match(/^#menu-([a-z-]+)$/);
  if (hm && MENU.some(function (c) { return c.id === hm[1]; })) active = hm[1];

  function price(p) { return typeof p === 'number' ? '₹' + p : '₹' + String(p).replace(/\s*\/\s*/g, ' / ₹'); }
  function vnClass(v) { return v === true ? 'vn' : v === 'egg' ? 'vn vn--egg' : 'vn vn--nonveg'; }
  function vnLabel(v) { return v === true ? 'Vegetarian' : v === 'egg' ? 'Contains egg' : 'Non-vegetarian'; }
  function itemHTML(it) {
    return '<li class="mi">' +
      '<span class="' + vnClass(it.veg) + '" role="img" aria-label="' + vnLabel(it.veg) + '"></span>' +
      '<div><div class="mi__row"><h4 class="mi__name">' + esc(it.name) +
      (it.popular ? '<span class="mi__pop">Popular</span>' : '') +
      (it.confirmed ? '' : '<span class="mi__flag" title="Indicative price — confirm with the restaurant">Indicative</span>') +
      '</h4><span class="mi__leader" aria-hidden="true"></span><span class="mi__price">' + price(it.price) + '</span></div>' +
      (it.desc ? '<p class="mi__desc">' + esc(it.desc) + '</p>' : '') +
      '</div></li>';
  }
  function catHTML(c) {
    return '<section class="menu__cat" id="menu-' + c.id + '" aria-labelledby="menu-' + c.id + '-h">' +
      '<div class="menu__cat-head"><h3 class="menu__cat-name" id="menu-' + c.id + '-h">' + esc(c.name) + '</h3>' +
      '<span class="menu__cat-count">' + c.items.length + ' items</span></div>' +
      (c.tagline ? '<p class="menu__cat-tag">' + esc(c.tagline) + '</p>' : '') +
      '<ul class="menu__list">' + c.items.map(itemHTML).join('') + '</ul></section>';
  }
  function renderTabs() {
    if (!tabsEl) return;
    tabsEl.innerHTML = MENU.map(function (c) {
      var sel = !showAll && c.id === active;
      return '<button class="tab" role="tab" type="button" id="tab-' + c.id + '" aria-selected="' + sel + '" tabindex="' + (sel || showAll ? 0 : -1) + '" aria-controls="menu-panel" data-cat="' + c.id + '">' + esc(c.name) + '</button>';
    }).join('');
  }
  function renderPanel() {
    if (!panelEl) return;
    var cat = MENU.filter(function (c) { return c.id === active; })[0] || MENU[0];
    panelEl.innerHTML = showAll ? MENU.map(catHTML).join('') : (cat ? catHTML(cat) : '');
  }
  function centerTab(id) {
    var t = $('#tab-' + id);
    if (!t || !tabsEl) return;
    var left = t.offsetLeft - tabsEl.clientWidth / 2 + t.offsetWidth / 2;
    if (tabsEl.scrollTo) tabsEl.scrollTo({ left: left, behavior: scrollMode }); else tabsEl.scrollLeft = left;
  }
  function setToggleLabels() {
    toggleBtns.forEach(function (b) { b.textContent = showAll ? 'Show By Category' : 'View Full Menu'; b.setAttribute('aria-pressed', String(showAll)); });
  }
  function setCat(id, scrollToMenu) {
    active = id; showAll = false;
    setToggleLabels(); renderTabs(); renderPanel(); centerTab(id);
    try { sessionStorage.setItem('pkr-cat', id); } catch (e) {}
    if (scrollToMenu) { var m = $('#menu'); if (m) m.scrollIntoView({ behavior: scrollMode, block: 'start' }); }
  }
  if (tabsEl) {
    tabsEl.addEventListener('click', function (e) {
      var b = e.target.closest('.tab'); if (!b) return;
      var id = b.getAttribute('data-cat');
      if (showAll) {
        $$('.tab', tabsEl).forEach(function (t) { t.setAttribute('aria-selected', String(t === b)); });
        var sec = $('#menu-' + id); if (sec) sec.scrollIntoView({ behavior: scrollMode, block: 'start' });
      } else { setCat(id, false); }
    });
    tabsEl.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      var tabs = $$('.tab', tabsEl); var i = tabs.indexOf(document.activeElement); if (i < 0) return;
      e.preventDefault();
      var n = tabs[(i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length];
      n.focus(); n.click();
    });
  }
  toggleBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      showAll = !showAll; setToggleLabels(); renderTabs(); renderPanel();
      if (!showAll) centerTab(active);
      if (b.hasAttribute('data-menu-toggle')) { var m = $('#menu'); if (m) m.scrollIntoView({ behavior: scrollMode, block: 'start' }); }
    });
  });
  $$('[data-menu-cat]').forEach(function (a) {
    a.addEventListener('click', function (e) { e.preventDefault(); setCat(a.getAttribute('data-menu-cat'), true); });
  });
  renderTabs(); renderPanel();
  if (hm) { var m0 = $('#menu'); if (m0) setTimeout(function () { m0.scrollIntoView({ block: 'start' }); }, 50); }

  // Menu structured data (only confirmed prices are published as offers)
  try {
    var ld = {
      '@context': 'https://schema.org', '@type': 'Menu', name: 'Punjab Ki Rasoi Menu', inLanguage: 'en-IN',
      hasMenuSection: MENU.map(function (c) {
        return { '@type': 'MenuSection', name: c.name, description: c.tagline || undefined,
          hasMenuItem: c.items.map(function (it) {
            var o = { '@type': 'MenuItem', name: it.name, description: it.desc || undefined };
            if (it.confirmed && typeof it.price === 'number') o.offers = { '@type': 'Offer', price: String(it.price), priceCurrency: 'INR' };
            if (it.veg === true) o.suitableForDiet = 'https://schema.org/VegetarianDiet';
            return o;
          }) };
      })
    };
    var s = document.createElement('script'); s.type = 'application/ld+json'; s.textContent = JSON.stringify(ld); document.head.appendChild(s);
  } catch (e) {}

  /* ---------- scroll reveal ---------- */
  $$('[data-stagger]').forEach(function (g) {
    $$(':scope > .reveal, :scope > .reveal-img', g).forEach(function (el, i) { el.style.setProperty('--rd', Math.min(i * 0.07, 0.56).toFixed(2) + 's'); });
  });
  var revealEls = $$('.reveal, .reveal-img');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.04 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else { revealEls.forEach(function (el) { el.classList.add('in'); }); }

  /* ---------- signature rail ---------- */
  var rail = $('#rail'), prevBtn = $('#rail-prev'), nextBtn = $('#rail-next'), bar = $('#rail-progress-bar');
  if (rail) {
    function railUpdate() {
      var max = rail.scrollWidth - rail.clientWidth, x = rail.scrollLeft;
      if (prevBtn) prevBtn.disabled = x <= 2;
      if (nextBtn) nextBtn.disabled = x >= max - 2;
      if (bar) {
        var frac = Math.min(1, rail.clientWidth / rail.scrollWidth);
        bar.style.width = (frac * 100) + '%';
        bar.style.transform = 'translateX(' + ((x / rail.scrollWidth) * 100 / frac) + '%)';
      }
    }
    function step() {
      var card = rail.querySelector('.dish');
      var gap = parseFloat(getComputedStyle(rail).columnGap) || 20;
      return card ? card.getBoundingClientRect().width + gap : rail.clientWidth * 0.8;
    }
    if (prevBtn) prevBtn.addEventListener('click', function () { rail.scrollBy({ left: -step(), behavior: scrollMode }); });
    if (nextBtn) nextBtn.addEventListener('click', function () { rail.scrollBy({ left: step(), behavior: scrollMode }); });
    rail.addEventListener('scroll', railUpdate, { passive: true });
    window.addEventListener('resize', railUpdate);
    railUpdate();
  }

  /* ---------- tandoor parallax (subtle, transform only) ---------- */
  var tBg = $('#tandoor-bg'), tSec = $('#tandoor');
  if (tBg && tSec && !reduceMotion && 'IntersectionObserver' in window) {
    var inView = false, raf = 0;
    var tick = function () {
      raf = 0;
      var r = tSec.getBoundingClientRect(), vh = window.innerHeight;
      var p = (r.top + r.height / 2 - vh / 2) / (vh + r.height); // -0.5 … 0.5
      tBg.style.transform = 'translate3d(0,' + (-p * 0.16 * r.height).toFixed(1) + 'px,0)';
    };
    var request = function () { if (inView && !raf) raf = requestAnimationFrame(tick); };
    new IntersectionObserver(function (es) { inView = es[0].isIntersecting; request(); }).observe(tSec);
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request);
  }

  /* ---------- order sheet ---------- */
  var orderDlg = $('#order-sheet'), orderList = $('#order-list');
  var ext = '<svg aria-hidden="true"><use href="#i-external"/></svg>';
  if (orderList) {
    var html = '<a class="sheet__opt sheet__opt--primary" href="' + esc(cfg.phoneHref || '#') + '"><div><strong>Call to order</strong><span>' + esc(cfg.phone || '') + ' · quickest for pickup</span></div><svg aria-hidden="true"><use href="#i-phone"/></svg></a>';
    if (cfg.whatsapp) html += '<a class="sheet__opt" href="' + esc(cfg.whatsapp) + '" target="_blank" rel="noopener"><div><strong>WhatsApp</strong><span>Message your order</span></div>' + ext + '</a>';
    ((cfg.order && cfg.order.platforms) || []).filter(function (p) { return p && p.url; }).forEach(function (p) {
      html += '<a class="sheet__opt" href="' + esc(p.url) + '" target="_blank" rel="noopener"><div><strong>' + esc(p.name) + '</strong><span>' + esc(p.note || '') + '</span></div>' + ext + '</a>';
    });
    orderList.innerHTML = html;
  }
  var primary = cfg.order && cfg.order.primary;
  $$('[data-order]').forEach(function (a) {
    if (primary) { a.setAttribute('href', primary); a.setAttribute('target', '_blank'); a.setAttribute('rel', 'noopener'); return; }
    if (orderDlg && orderDlg.showModal) a.addEventListener('click', function (e) { e.preventDefault(); orderDlg.showModal(); });
  });
  if (orderDlg) { $$('[data-close]', orderDlg).forEach(function (b) { b.addEventListener('click', function () { orderDlg.close(); }); }); closeOnBackdrop(orderDlg); }

  /* ---------- gallery lightbox ---------- */
  var lb = $('#lightbox'), lbImg = $('#lb-img'), lbCap = $('#lb-cap'), lbCount = $('#lb-count');
  var tiles = $$('.tile[data-full]'), idx = 0;
  if (lb && lb.showModal && tiles.length) {
    var show = function (i) {
      idx = (i + tiles.length) % tiles.length;
      var t = tiles[idx], img = t.querySelector('img');
      lbImg.src = t.getAttribute('data-full');
      lbImg.alt = img ? img.alt : '';
      lbCap.textContent = t.getAttribute('data-cap') || '';
      lbCount.textContent = (idx + 1) + ' / ' + tiles.length;
      var n = tiles[(idx + 1) % tiles.length]; if (n) { var pre = new Image(); pre.src = n.getAttribute('data-full'); }
    };
    tiles.forEach(function (t, i) { t.addEventListener('click', function () { show(i); lb.showModal(); }); });
    $('#lb-prev').addEventListener('click', function () { show(idx - 1); });
    $('#lb-next').addEventListener('click', function () { show(idx + 1); });
    $$('[data-close]', lb).forEach(function (b) { b.addEventListener('click', function () { lb.close(); }); });
    lb.addEventListener('keydown', function (e) { if (e.key === 'ArrowLeft') show(idx - 1); if (e.key === 'ArrowRight') show(idx + 1); });
    var tx = 0;
    lb.addEventListener('touchstart', function (e) { tx = e.changedTouches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) { var dx = e.changedTouches[0].clientX - tx; if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1)); }, { passive: true });
    lb.addEventListener('click', function (e) { if (e.target === lb || e.target.classList.contains('lightbox__stage')) lb.close(); });
    lb.addEventListener('close', function () { lbImg.removeAttribute('src'); });
  }

  /* ---------- map facade → interactive embed on demand ---------- */
  var mapBtn = $('#map-load');
  if (mapBtn) {
    mapBtn.addEventListener('click', function () {
      var m = $('#map'), src = get('maps.embed'); if (!m || !src) return;
      var f = document.createElement('iframe');
      f.src = src; f.title = 'Map showing Punjab Ki Rasoi on Velankani Road, Electronic City Phase I';
      f.loading = 'lazy'; f.referrerPolicy = 'no-referrer-when-downgrade'; f.allowFullscreen = true;
      m.appendChild(f);
      var over = $('#map-over'); if (over) over.hidden = true;
    });
  }

  /* ---------- footer social (only configured accounts) ---------- */
  var soc = $('#footer-social');
  if (soc && cfg.social) {
    var icons = { instagram: 'i-instagram', facebook: 'i-facebook', youtube: 'i-youtube' };
    var out = Object.keys(cfg.social).filter(function (k) { return cfg.social[k] && icons[k]; }).map(function (k) {
      return '<a href="' + esc(cfg.social[k]) + '" target="_blank" rel="noopener" aria-label="' + k.charAt(0).toUpperCase() + k.slice(1) + '"><svg aria-hidden="true"><use href="#' + icons[k] + '"/></svg></a>';
    }).join('');
    soc.innerHTML = out; soc.hidden = !out;
  }
})();
