/* Rendering, scrolling, case studies, lightbox and theme. */
(function () {
  'use strict';

  var P = window.PORTFOLIO;
  var Scene = window.Scene || {};
  var html = document.documentElement;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var EASE = 'cubic-bezier(.77, 0, .18, 1)';
  var EASE_OUT = 'cubic-bezier(.22, 1, .36, 1)';

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function hist(method, state, url) { try { history[method](state, '', url); } catch (e) { /* sandboxed frames */ } }
  function call(fn) { if (typeof fn === 'function') fn.apply(null, Array.prototype.slice.call(arguments, 1)); }

  /* =====================================================================
     Generated covers (SVG)
     ===================================================================== */
  var AREAS = ['Inventory', 'Supply chain', 'Staffing', 'Personalisation', 'Customer service'];
  var PRINCIPLES = ['Transparency', 'Data security and privacy', 'Avoiding human bias', 'Accountability', 'Ethical standards', 'Human rights law', 'Impact of automation on jobs', 'Accessibility'];
  var COUNTRIES = [
    ['A', 50, 460, 'left'], ['B', 31, 300], ['C', 75, 420, 0, 1], ['D', 90, 700, 'left'],
    ['E', 20, 540], ['F', 62, 480], ['G', 49, 420]
  ];
  var SHORT = { A: 1, C: 1, F: 1 };

  // Photos in the My background section, opened in the lightbox.
  var BG = [
    ['delta-frame', 'Automation & Robotics engineering: a delta robot I helped model, build and simulate at KLE Tech.'],
    ['geist-batch', 'Product design for additive manufacturing: copper pendants for Geist Brewing, straight off the build plate at Intech.'],
    ['tate-team', 'MA Design, Innovation & Brand Management: our team’s research visit to Tate Modern.']
  ].map(function (b) { var d = P.dim(b[0]); return { src: P.img(b[0]), name: b[0], cap: b[1], w: d[0], h: d[1] }; });

  function svgOpen(alt, extra) {
    return '<svg class="gen' + (extra || '') + '" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet" role="img" aria-label="' + esc(alt) + '" xmlns="http://www.w3.org/2000/svg">';
  }

  function genFramework(alt) {
    var cx = 400, cy = 300, s = svgOpen(alt);
    s += '<circle class="g-ring" cx="400" cy="300" r="100"/><circle class="g-ring" cx="400" cy="300" r="165"/>';
    s += '<circle class="g-ring" cx="400" cy="300" r="238" stroke-dasharray="2 9"/>';
    AREAS.forEach(function (a, j) {
      var ang = (-90 + j * 72) * Math.PI / 180, c = Math.cos(ang), sn = Math.sin(ang);
      s += '<line class="g-spoke" x1="' + (cx + c * 48) + '" y1="' + (cy + sn * 48) + '" x2="' + (cx + c * 165) + '" y2="' + (cy + sn * 165) + '"/>';
      s += '<circle class="g-dot" cx="' + (cx + c * 165) + '" cy="' + (cy + sn * 165) + '" r="9"/>';
      var lx = cx + c * 192, ly = cy + sn * 192 + (sn < -0.9 ? -6 : 7);
      var anchor = c > 0.3 ? 'start' : (c < -0.3 ? 'end' : 'middle');
      s += '<text class="g-label" x="' + lx.toFixed(1) + '" y="' + ly.toFixed(1) + '" text-anchor="' + anchor + '">' + a + '</text>';
    });
    s += '<g class="g-orbit">';
    PRINCIPLES.forEach(function (p, i) {
      var ang = (-90 + 22.5 + i * 45) * Math.PI / 180;
      s += '<circle class="g-pdot" cx="' + (cx + Math.cos(ang) * 100).toFixed(1) + '" cy="' + (cy + Math.sin(ang) * 100).toFixed(1) + '" r="6"/>';
    });
    s += '</g><circle class="g-core" cx="400" cy="300" r="46"/>';
    s += '<text class="g-core-label" x="400" y="311" text-anchor="middle">Trust</text></svg>';
    return s;
  }

  function genChart(alt, mini) {
    var x0 = 120, x1 = 730, y0 = 512, y1 = 92;
    var X = function (v) { return x0 + v / 100 * (x1 - x0); };
    var Y = function (v) { return y0 - v / 800 * (y0 - y1); };
    var s = svgOpen(alt, mini ? ' gen--mini' : '');
    [0, 200, 400, 600, 800].forEach(function (v) {
      s += '<line class="c-grid" x1="' + x0 + '" x2="' + x1 + '" y1="' + Y(v) + '" y2="' + Y(v) + '"/>';
      if (!mini) s += '<text class="c-axis" x="' + (x0 - 14) + '" y="' + (Y(v) + 6) + '" text-anchor="end">£' + v + 'k</text>';
    });
    if (!mini) {
      [0, 25, 50, 75, 100].forEach(function (v) {
        s += '<text class="c-axis" x="' + X(v) + '" y="' + (y0 + 32) + '" text-anchor="middle">' + v + '</text>';
      });
      s += '<text class="c-title" x="' + ((x0 + x1) / 2) + '" y="' + (y0 + 66) + '" text-anchor="middle">Score (higher is better)</text>';
      s += '<text class="c-title" x="' + x0 + '" y="' + (y1 - 30) + '">Set-up cost (lower is better)</text>';
    }
    COUNTRIES.forEach(function (c) {
      var cls = 'c-pt' + (SHORT[c[0]] ? ' is-short' : '') + (c[4] ? ' is-chosen' : '');
      var x = X(c[1]), y = Y(c[2]);
      var left = c[3] === 'left';
      var label = mini ? c[0] : c[0] + ': ' + c[1] + ', £' + c[2] + 'k';
      s += '<g class="' + cls + '">';
      if (c[4]) s += '<circle class="c-halo" cx="' + x + '" cy="' + y + '" r="' + (mini ? 26 : 20) + '"/>';
      s += '<circle cx="' + x + '" cy="' + y + '" r="' + (mini ? 10 : 7) + '"/>';
      var off = c[4] ? (mini ? 36 : 28) : (mini ? 22 : 18);
      s += '<text x="' + (left ? x - off : x + off) + '" y="' + (y + (mini ? 9 : 6)) + '" text-anchor="' + (left ? 'end' : 'start') + '">' + label + '</text></g>';
    });
    return s + '</svg>';
  }

  function genWave(alt) {
    var s = svgOpen(alt), n = 64, w = 7, gap = 4, start = (800 - (n * (w + gap) - gap)) / 2;
    s += '<text class="g-core-label" x="' + start + '" y="128">Brand Builders</text>';
    for (var i = 0; i < n; i++) {
      var t = i / n;
      var h = 24 + Math.abs(Math.sin(i * 0.61) * 92 + Math.sin(i * 0.23 + 1) * 70 + Math.sin(i * 1.7) * 26) * (0.55 + 0.45 * Math.sin(t * Math.PI));
      s += '<rect class="w-bar' + (i >= n / 2 ? ' is-b' : '') + '" style="--i:' + i + '" x="' + (start + i * (w + gap)).toFixed(1) + '" y="' + (300 - h / 2).toFixed(1) + '" width="' + w + '" height="' + h.toFixed(1) + '" rx="3.5"/>';
    }
    s += '<text class="w-label" x="' + start + '" y="492">Episode 1</text>';
    s += '<text class="w-label" x="' + (800 - start) + '" y="492" text-anchor="end">Episode 2</text>';
    return s + '</svg>';
  }

  function genCover(cover, mini) {
    if (cover.svg === 'framework') return genFramework(cover.alt);
    if (cover.svg === 'chart') return genChart(cover.alt, mini);
    if (cover.svg === 'wave') return genWave(cover.alt);
    return '';
  }

  function imgTag(name, alt, cls, opts) {
    opts = opts || {};
    var d = P.dim(name);
    return '<img' + (cls ? ' class="' + cls + '"' : '') + ' src="' + P.img(name) + '" alt="' + esc(alt) + '" width="' + d[0] + '" height="' + d[1] + '"' +
      (opts.eager ? '' : ' loading="lazy"') + ' decoding="async" draggable="false"' +
      (opts.pos ? ' style="object-position:' + opts.pos + '"' : '') + (opts.attrs || '') + '>';
  }

  function coverHTML(p, mini) {
    if (p.cover.svg) return genCover(p.cover, mini);
    return imgTag(p.cover.img, p.cover.alt, '', { pos: p.cover.pos, eager: mini === 'eager' });
  }

  /* =====================================================================
     Render work, archive and filters
     ===================================================================== */
  function renderWork() {
    var list = $('#work-grid');
    if (!list) return;
    list.innerHTML = P.ma.map(function (p, i) {
      return '<li class="work-item work-item--' + (i % 4) + '" data-id="' + p.id + '">' +
        '<div class="work-item__media" data-media>' + (p.cover.svg ? genCover(p.cover, true) : coverHTML(p, i < 2 ? 'eager' : false)) + '</div>' +
        '<p class="work-item__type">' + esc(p.type) + '</p>' +
        '<h3 class="work-item__title"><button class="work-item__btn" type="button" data-case="' + p.id + '">' + esc(p.cardTitle || p.title) + '</button></h3>' +
        '<p class="work-item__summary">' + esc(p.card) + '</p>' +
        '<p class="work-item__meta">' + esc(p.team) + ', ' + esc(p.when) + '</p>' +
        '<span class="work-item__more" aria-hidden="true">Read the case study</span>' +
        '</li>';
    }).join('');
  }

  var filter = 'all';
  function renderArchive() {
    var grid = $('#arc-grid'), bar = $('#filters');
    if (!grid || !bar) return;
    grid.innerHTML = P.archive.map(function (a, i) {
      return '<li class="arc" data-cat="' + a.cat + '">' +
        '<button class="arc__btn" type="button" data-arc="' + i + '">' +
        '<span class="arc__media' + (a.fit === 'contain' ? ' is-contain' : '') + '">' + imgTag(a.cover, a.title) + '</span>' +
        '<span class="arc__title">' + esc(a.title) + '</span>' +
        '<span class="arc__ctx">' + esc(a.short) + '</span>' +
        '</button></li>';
    }).join('');
    var counts = { all: P.archive.length };
    P.archive.forEach(function (a) { counts[a.cat] = (counts[a.cat] || 0) + 1; });
    var opts = [['all', 'All']].concat(Object.keys(P.cats).map(function (k) { return [k, P.cats[k]]; }));
    bar.innerHTML = opts.map(function (o) {
      return '<button class="filter" type="button" data-filter="' + o[0] + '" aria-pressed="' + (o[0] === filter) + '">' +
        esc(o[1]) + '<span class="filter__n">' + counts[o[0]] + '</span></button>';
    }).join('');
  }

  function setFilter(next, instant) {
    if (next === filter) return;
    filter = next;
    $$('.filter').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.filter === next)); });
    var items = $$('#arc-grid .arc');
    var show = function (el) { return next === 'all' || el.dataset.cat === next; };

    if (instant || reduced || !Element.prototype.animate) {
      items.forEach(function (el) { el.hidden = !show(el); });
      return;
    }
    var first = new Map();
    items.forEach(function (el) { if (!el.hidden) first.set(el, el.getBoundingClientRect()); });
    var leaving = items.filter(function (el) { return !el.hidden && !show(el); });
    var go = function () {
      items.forEach(function (el) { el.hidden = !show(el); el.style.opacity = ''; });
      items.forEach(function (el) {
        if (el.hidden) return;
        var b = el.getBoundingClientRect(), a = first.get(el);
        if (a) {
          var dx = a.left - b.left, dy = a.top - b.top;
          if (dx || dy) el.animate([{ transform: 'translate(' + dx + 'px,' + dy + 'px)' }, { transform: 'none' }], { duration: 750, easing: EASE_OUT });
        } else {
          el.animate([{ opacity: 0, transform: 'translateY(18px) scale(.97)' }, { opacity: 1, transform: 'none' }], { duration: 650, delay: 120, easing: EASE_OUT, fill: 'backwards' });
        }
      });
    };
    if (!leaving.length) { go(); return; }
    var done = 0;
    leaving.forEach(function (el) {
      var an = el.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'scale(.96)' }], { duration: 220, easing: 'ease-in', fill: 'forwards' });
      an.onfinish = function () {
        el.style.opacity = '0'; an.cancel();
        if (++done === leaving.length) go();
      };
    });
  }

  /* =====================================================================
     Scrolling
     ===================================================================== */
  var lenis = null, nativeY = window.scrollY, nativeV = 0;
  function initScroll() {
    if (!reduced && window.Lenis) {
      try {
        lenis = new window.Lenis({ lerp: 0.085, smoothWheel: true, wheelMultiplier: 1, touchMultiplier: 1.4 });
        lenis.on('scroll', function (e) { call(Scene.setVelocity, e.velocity); tick(); });
        var loop = function (t) { lenis.raf(t); requestAnimationFrame(loop); };
        requestAnimationFrame(loop);
      } catch (e) { lenis = null; }
    }
    window.addEventListener('scroll', function () {
      if (!lenis) {
        var y = window.scrollY; nativeV = y - nativeY; nativeY = y;
        call(Scene.setVelocity, nativeV);
      }
      tick();
    }, { passive: true });
    window.addEventListener('resize', tick);
  }

  function scrollToY(target, immediate) {
    if (lenis) lenis.scrollTo(target, { offset: 0, duration: 1.6, immediate: !!immediate, force: true, easing: function (t) { return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2; } });
    else if (typeof target === 'number') window.scrollTo({ top: target, behavior: immediate || reduced ? 'auto' : 'smooth' });
    else target.scrollIntoView({ behavior: immediate || reduced ? 'auto' : 'smooth' });
  }

  var locks = 0;
  function lockScroll() {
    if (++locks > 1) return;
    if (lenis) lenis.stop();
    html.style.overflow = 'hidden';
  }
  function unlockScroll() {
    if (--locks > 0) return;
    locks = 0;
    html.style.overflow = '';
    if (lenis) lenis.start();
  }

  /* ---------- Per-frame scroll effects ---------- */
  var ticking = false, lastY = 0, nav, sections, links, timeline, tlItems;
  function tick() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(onScroll);
  }
  function onScroll() {
    ticking = false;
    if (caseOpen) return;
    var y = window.scrollY, vh = window.innerHeight, dy = y - lastY;
    lastY = y;

    nav.classList.toggle('is-solid', y > 40);
    if (y > 640 && dy > 4) nav.classList.add('is-hidden');
    else if (dy < -4 || y < 640) nav.classList.remove('is-hidden');

    var line = vh * 0.55, active = sections[0];
    sections.forEach(function (s) { if (s.getBoundingClientRect().top <= line) active = s; });
    call(Scene.setShape, active.dataset.scene);
    links.forEach(function (a) { a.classList.toggle('is-active', a.getAttribute('href') === '#' + active.id); });

    if (timeline) {
      var r = timeline.getBoundingClientRect(), mark = vh * 0.62;
      var p = Math.min(Math.max((mark - r.top) / Math.max(r.height - 40, 1), 0), 1);
      timeline.style.setProperty('--p', p.toFixed(4));
      tlItems.forEach(function (li) { li.classList.toggle('is-past', li.getBoundingClientRect().top + 10 <= mark); });
    }
  }

  /* =====================================================================
     FLIP helpers
     ===================================================================== */
  function rectOf(el) { var r = el.getBoundingClientRect(); return { left: r.left, top: r.top, width: r.width, height: r.height }; }

  // The rectangle an image of w×h occupies when fitted with object-fit: contain inside box.
  function containRect(box, w, h, pad) {
    pad = pad || 0;
    var bw = box.width - pad * 2, bh = box.height - pad * 2, s = Math.min(bw / w, bh / h);
    return { left: box.left + pad + (bw - w * s) / 2, top: box.top + pad + (bh - h * s) / 2, width: w * s, height: h * s };
  }

  function makeGhost(inner, rect, radius) {
    var g = document.createElement('div');
    g.className = 'ghost';
    g.setAttribute('aria-hidden', 'true');
    g.style.cssText = 'position:fixed;z-index:300;overflow:hidden;pointer-events:none;background:var(--plate);' +
      'left:' + rect.left + 'px;top:' + rect.top + 'px;width:' + rect.width + 'px;height:' + rect.height + 'px;border-radius:' + (radius || 0) + 'px';
    g.appendChild(inner);
    document.body.appendChild(g);
    return g;
  }

  function flyGhost(g, from, to, opts) {
    opts = opts || {};
    var kf = [
      { left: from.left + 'px', top: from.top + 'px', width: from.width + 'px', height: from.height + 'px', borderRadius: (opts.r0 || 0) + 'px' },
      { left: to.left + 'px', top: to.top + 'px', width: to.width + 'px', height: to.height + 'px', borderRadius: (opts.r1 || 0) + 'px' }
    ];
    var a = g.animate(kf, { duration: reduced ? 1 : (opts.duration || 900), easing: opts.easing || EASE, fill: 'forwards' });
    return new Promise(function (res) { a.onfinish = res; a.oncancel = res; });
  }

  function cloneMedia(el) {
    var c = el.cloneNode(true);
    c.removeAttribute('style');
    c.removeAttribute('loading');
    if (el.tagName === 'IMG' && el.style.objectPosition) c.style.objectPosition = el.style.objectPosition;
    c.style.width = '100%'; c.style.height = '100%'; c.style.maxWidth = 'none';
    if (el.tagName === 'IMG') c.style.objectFit = 'cover';
    return c;
  }

  function setInert(els, on) {
    els.forEach(function (el) { if (!el) return; if (on) el.setAttribute('inert', ''); else el.removeAttribute('inert'); });
  }

  /* =====================================================================
     Case study overlay
     ===================================================================== */
  var caseEl, casePanel, caseMedia, caseBody, caseCount, caseOpen = false, caseId = null, caseBusy = false, caseReturn = null;

  function findCase(id) { for (var i = 0; i < P.ma.length; i++) if (P.ma[i].id === id) return i; return -1; }

  function extraHTML(kind, p) {
    if (kind === 'framework') {
      return '<div class="x-framework"><p class="x-label">Five areas of retail</p><ol class="x-areas">' +
        AREAS.map(function (a) { return '<li>' + a + '</li>'; }).join('') + '</ol>' +
        '<p class="x-label">Eight principles underneath</p><ul class="x-principles">' +
        PRINCIPLES.map(function (a) { return '<li>' + a + '</li>'; }).join('') + '</ul></div>';
    }
    if (kind === 'chart') {
      return '<figure class="x-chart">' + genChart('Scatter chart: score against set-up cost for seven countries.', false) +
        '<figcaption>All seven countries by score and set-up cost. Gold marks the shortlist; the ringed point, C, is the recommendation.</figcaption></figure>';
    }
    if (kind === 'episodes' && p.episodes) {
      return '<div class="x-episodes">' + p.episodes.map(function (ep) {
        return '<div class="x-ep"><h4>' + esc(ep.t) + '</h4><div class="x-ep__bar">' + ep.s.map(function (s) {
          return '<div class="x-ep__seg" style="--m:' + s[0] + '"><b>' + s[0] + ' min</b>' + esc(s[1]) + '</div>';
        }).join('') + '</div></div>';
      }).join('') + '</div>';
    }
    return '';
  }

  function caseHTML(p, idx) {
    var i = 0, out = [];
    var add = function (h) { out.push(h.replace('%I', String(Math.min(i++, 8)))); };
    add('<header class="case__head" style="--i:%I"><p class="case__type">' + esc(p.type) + '</p>' +
      '<h2 class="case__title" id="case-title">' + esc(p.title) + '</h2>' +
      '<dl class="case__meta">' + p.meta.map(function (m) { return '<div><dt>' + esc(m[0]) + '</dt><dd>' + esc(m[1]) + '</dd></div>'; }).join('') + '</dl></header>');
    add('<p class="case__lede" style="--i:%I">' + esc(p.lede) + '</p>');
    if (p.stats && p.stats.length) {
      add('<dl class="case__stats" style="--i:%I">' + p.stats.map(function (s) { return '<div><dt>' + esc(s[0]) + '</dt><dd>' + esc(s[1]) + '</dd></div>'; }).join('') + '</dl>');
      if (p.statsNote) add('<p class="case__note" style="--i:%I">' + esc(p.statsNote) + '</p>');
    }
    p.blocks.forEach(function (b) {
      var h = '<section class="case__block" style="--i:%I"><h3>' + esc(b.h) + '</h3><div>';
      (b.p || []).forEach(function (t) { h += '<p>' + esc(t) + '</p>'; });
      if (b.list) h += '<ul class="case__list">' + b.list.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>';
      if (b.steps) h += '<ol class="case__steps">' + b.steps.map(function (s) { return '<li><div><strong>' + esc(s[0]) + '</strong><span>' + esc(s[1]) + '</span></div></li>'; }).join('') + '</ol>';
      if (b.defs) h += '<dl class="case__defs">' + b.defs.map(function (d) { return '<div><dt>' + esc(d[0]) + '</dt><dd>' + esc(d[1]) + '</dd></div>'; }).join('') + '</dl>';
      if (b.extra) h += extraHTML(b.extra, p);
      add(h + '</div></section>');
    });
    if (p.outcome) add('<div class="case__outcome" style="--i:%I"><h3>Outcome</h3><p>' + esc(p.outcome) + '</p></div>');
    if (p.why) add('<section class="case__block" style="--i:%I"><h3>Why it matters</h3><div><p>' + esc(p.why) + '</p></div></section>');
    if (p.gallery && p.gallery.length) {
      add('<h3 class="case__gallery-title" style="--i:%I">From the project</h3>');
      add('<ul class="case__gallery" style="--i:%I">' + p.gallery.map(function (g, gi) {
        return '<li><button type="button" data-gal="' + gi + '" aria-label="Open image: ' + esc(g.cap) + '">' +
          imgTag(g.name, g.cap) + '<span>' + esc(g.cap) + '</span></button></li>';
      }).join('') + '</ul>');
    }
    if (p.skills) add('<ul class="case__skills" style="--i:%I" aria-label="Skills used">' + p.skills.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ul>');
    var next = P.ma[(idx + 1) % P.ma.length];
    add('<button class="case__next" type="button" style="--i:%I" data-next="' + next.id + '"><span>Next project</span><strong>' + esc(next.title) + '</strong></button>');
    return out.join('');
  }

  function fillCase(idx) {
    var p = P.ma[idx];
    caseId = p.id;
    caseMedia.className = 'case__media' + (p.cover.svg ? ' is-svg' : ' is-fit');
    caseMedia.innerHTML = p.cover.svg ? genCover(p.cover, true) : imgTag(p.cover.img, p.cover.alt, '', { eager: true, pos: p.cover.pos });
    caseBody.innerHTML = caseHTML(p, idx);
    caseCount.textContent = (idx + 1) + ' of ' + P.ma.length;
    casePanel.scrollTop = 0;
  }

  function cardFor(id) { return $('.work-item[data-id="' + id + '"]'); }

  function openCase(id, opts) {
    opts = opts || {};
    var idx = findCase(id);
    if (idx < 0 || caseBusy) return;
    if (caseOpen) { swapCase(id, opts); return; }
    caseBusy = true; caseOpen = true;
    caseReturn = opts.trigger || document.activeElement;

    var card = cardFor(id), cardMedia = card && $('[data-media]', card);
    var cardInView = false, from = null;
    if (cardMedia) {
      from = rectOf(cardMedia);
      cardInView = from.top + from.height > 0 && from.top < window.innerHeight;
    }

    fillCase(idx);
    if (!opts.fromHistory) hist('pushState', { mnCase: id }, '#case-' + id);
    lockScroll();
    call(Scene.setDim, true);
    setInert([$('main'), nav, $('.footer')], true);
    caseEl.setAttribute('aria-hidden', 'false');
    caseEl.classList.add('is-open');

    var target = caseMedia.firstElementChild;
    var finish = function () {
      if (target) target.style.visibility = '';
      if (cardMedia) cardMedia.style.visibility = '';
      caseBusy = false;
      var btn = $('.case__close', caseEl);
      if (btn) btn.focus({ preventScroll: true });
    };

    if (cardInView && target && cardMedia.firstElementChild && !reduced) {
      var to = rectOf(target);
      var ghost = makeGhost(cloneMedia(cardMedia.firstElementChild), from, 6);
      target.style.visibility = 'hidden';
      cardMedia.style.visibility = 'hidden';
      setTimeout(function () { caseEl.classList.add('is-ready'); }, 480);
      flyGhost(ghost, from, to, { r0: 6, r1: 0, duration: 950 }).then(function () {
        finish();
        requestAnimationFrame(function () { ghost.remove(); });
      });
    } else {
      requestAnimationFrame(function () { caseEl.classList.add('is-ready'); });
      setTimeout(finish, 350);
    }
  }

  function swapCase(id, opts) {
    opts = opts || {};
    var idx = findCase(id);
    if (idx < 0 || caseBusy || id === caseId) return;
    caseBusy = true;
    if (!opts.fromHistory) hist('replaceState', { mnCase: id }, '#case-' + id);
    caseEl.classList.add('is-swapping');
    setTimeout(function () {
      caseEl.classList.remove('is-ready');
      fillCase(idx);
      void caseEl.offsetWidth;
      caseEl.classList.remove('is-swapping');
      caseEl.classList.add('is-ready');
      caseBusy = false;
      var btn = $('.case__close', caseEl);
      if (btn) btn.focus({ preventScroll: true });
    }, reduced ? 10 : 420);
  }

  function closeCase(opts) {
    opts = opts || {};
    if (!caseOpen || caseBusy) return;
    if (lbOpen) closeLightbox(true);
    if (!opts.fromHistory && history.state && history.state.mnCase) { history.back(); return; }
    caseBusy = true;

    var id = caseId, card = cardFor(id), cardMedia = card && $('[data-media]', card);
    var src = caseMedia.firstElementChild;

    // Bring the matching card into view so the image can fly back to it.
    if (cardMedia) {
      var cr = cardMedia.getBoundingClientRect();
      if (cr.bottom < 60 || cr.top > window.innerHeight - 60) {
        var y = window.scrollY + cr.top - window.innerHeight * 0.22;
        if (lenis) lenis.scrollTo(Math.max(0, y), { immediate: true, force: true });
        else window.scrollTo(0, Math.max(0, y));
      }
    }

    var done = function () {
      caseEl.classList.remove('is-open', 'is-closing', 'is-ready', 'is-swapping');
      caseEl.setAttribute('aria-hidden', 'true');
      caseMedia.innerHTML = ''; caseBody.innerHTML = '';
      if (cardMedia) cardMedia.style.visibility = '';
      setInert([$('main'), nav, $('.footer')], false);
      unlockScroll();
      call(Scene.setDim, false);
      caseOpen = false; caseBusy = false; caseId = null;
      if (!opts.fromHistory && /^#case-/.test(location.hash)) hist('replaceState', null, location.pathname + location.search);
      var back = (caseReturn && document.contains(caseReturn) && caseReturn.closest('.work-item[data-id="' + id + '"]')) ? caseReturn : (card && $('.work-item__btn', card));
      if (back) back.focus({ preventScroll: true });
      tick();
    };

    var fromRect = src ? rectOf(src) : null;
    var canFly = !reduced && src && cardMedia && fromRect.bottom > 40 && fromRect.top < window.innerHeight;
    caseEl.classList.add('is-closing');
    if (canFly) {
      var to = rectOf(cardMedia);
      var ghost = makeGhost(cloneMedia(src), fromRect, 0);
      src.style.visibility = 'hidden';
      cardMedia.style.visibility = 'hidden';
      flyGhost(ghost, fromRect, to, { r0: 0, r1: 6, duration: 850 }).then(function () {
        done();
        requestAnimationFrame(function () { ghost.remove(); });
      });
    } else {
      setTimeout(done, reduced ? 10 : 560);
    }
  }

  /* =====================================================================
     Lightbox
     ===================================================================== */
  var lb, lbImg, lbFrame, lbCap, lbCount, lbInfo, lbOpen = false, lbList = [], lbIndex = 0, lbSource = null, lbSourceName = null, lbReturn = null, lbBusy = false;

  function infoHTML(a) {
    return '<p class="lb__cat">' + esc(P.cats[a.cat]) + '</p>' +
      '<h2 class="lb__title" id="lb-title">' + esc(a.title) + '</h2>' +
      '<p class="lb__ctx">' + esc(a.ctx) + '</p>' +
      '<p>' + esc(a.desc) + '</p>' +
      '<p><strong>My role</strong>' + esc(a.role) + '</p>' +
      (a.result ? '<p class="lb__result"><strong>Result</strong>' + esc(a.result) + '</p>' : '');
  }

  function lbTargetRect(item) {
    return containRect(rectOf(lbFrame), item.w, item.h);
  }

  function setLbImage(item) {
    lbImg.src = item.src;
    lbImg.alt = item.cap || '';
    lbCap.textContent = item.cap || '';
    lbCount.textContent = lbList.length > 1 ? (lbIndex + 1) + ' of ' + lbList.length : '';
  }

  function openLightbox(list, index, info, sourceImg, trigger) {
    if (lbOpen || lbBusy || !list.length) return;
    lbBusy = true; lbOpen = true;
    lbList = list; lbIndex = index; lbReturn = trigger || document.activeElement;
    lbSource = sourceImg || null; lbSourceName = list[index].name;

    lb.classList.toggle('has-info', !!info);
    lb.classList.toggle('is-single', list.length < 2);
    if (info) { lbInfo.innerHTML = infoHTML(info); lbInfo.hidden = false; lb.setAttribute('aria-labelledby', 'lb-title'); lb.removeAttribute('aria-label'); }
    else { lbInfo.innerHTML = ''; lbInfo.hidden = true; lb.removeAttribute('aria-labelledby'); lb.setAttribute('aria-label', 'Image viewer'); }
    setLbImage(list[index]);
    lb.scrollTop = 0;

    if (!caseOpen) { lockScroll(); call(Scene.setDim, true); setInert([$('main'), nav, $('.footer')], true); }
    else setInert([caseEl], true);
    lb.setAttribute('aria-hidden', 'false');
    lb.classList.add('is-open');

    var finish = function () {
      lbImg.style.visibility = '';
      if (lbSource) lbSource.style.visibility = '';
      lbBusy = false;
      var c = $('.lb__top [data-lb-close]', lb);
      if (c) c.focus({ preventScroll: true });
    };

    var sr = lbSource && lbSource.getBoundingClientRect();
    if (!reduced && lbSource && sr.width && sr.bottom > 0 && sr.top < window.innerHeight) {
      var item = list[index];
      var contain = lbSource.closest('.is-contain');
      var from = rectOf(lbSource);
      if (contain) {
        var pad = parseFloat(getComputedStyle(lbSource).paddingLeft) || 0;
        from = containRect(from, item.w, item.h, pad);
      }
      var to = lbTargetRect(item);
      var gi = document.createElement('img');
      gi.src = item.src; gi.alt = ''; gi.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block';
      var ghost = makeGhost(gi, from, contain ? 0 : 6);
      ghost.style.background = 'transparent';
      ghost.style.boxShadow = 'none';
      lbImg.style.visibility = 'hidden';
      lbSource.style.visibility = 'hidden';
      flyGhost(ghost, from, to, { r0: contain ? 0 : 6, r1: 2, duration: 800 }).then(function () {
        finish();
        requestAnimationFrame(function () { ghost.remove(); });
      });
    } else {
      setTimeout(finish, 300);
    }
  }

  function stepLightbox(d) {
    if (!lbOpen || lbList.length < 2) return;
    lbIndex = (lbIndex + d + lbList.length) % lbList.length;
    var item = lbList[lbIndex];
    lbImg.classList.add('is-out');
    var pre = new Image();
    var swap = function () {
      setLbImage(item);
      requestAnimationFrame(function () { lbImg.classList.remove('is-out'); });
    };
    var t0 = performance.now();
    pre.onload = pre.onerror = function () { setTimeout(swap, Math.max(0, 200 - (performance.now() - t0))); };
    pre.src = item.src;
  }

  function closeLightbox(instant) {
    if (!lbOpen) return;
    var item = lbList[lbIndex];
    var src = lbSource;
    var srcOk = src && document.contains(src) && item.name === lbSourceName;
    var sr = srcOk && src.getBoundingClientRect();
    var canFly = !instant && !reduced && srcOk && sr.width && sr.bottom > 0 && sr.top < window.innerHeight;

    var done = function () {
      lb.classList.remove('is-open');
      lb.setAttribute('aria-hidden', 'true');
      lbImg.style.visibility = '';
      if (src) src.style.visibility = '';
      if (!caseOpen) { setInert([$('main'), nav, $('.footer')], false); unlockScroll(); call(Scene.setDim, false); }
      else setInert([caseEl], false);
      lbOpen = false; lbBusy = false;
      if (lbReturn && document.contains(lbReturn)) lbReturn.focus({ preventScroll: true });
    };

    if (canFly) {
      lbBusy = true;
      var from = lbTargetRect(item);
      var contain = src.closest('.is-contain');
      var to = rectOf(src);
      if (contain) to = containRect(to, item.w, item.h, parseFloat(getComputedStyle(src).paddingLeft) || 0);
      var gi = document.createElement('img');
      gi.src = item.src; gi.alt = ''; gi.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block';
      var ghost = makeGhost(gi, from, 2);
      ghost.style.background = 'transparent'; ghost.style.boxShadow = 'none';
      lbImg.style.visibility = 'hidden';
      src.style.visibility = 'hidden';
      lb.classList.remove('is-open');
      flyGhost(ghost, from, to, { r0: 2, r1: contain ? 0 : 6, duration: 700 }).then(function () {
        done();
        requestAnimationFrame(function () { ghost.remove(); });
      });
    } else {
      lb.classList.remove('is-open');
      if (instant) done(); else { lbBusy = true; setTimeout(done, reduced ? 10 : 420); }
    }
  }

  /* =====================================================================
     Theme
     ===================================================================== */
  var themeBtn;
  function resolvedTheme() {
    var t = html.getAttribute('data-theme');
    if (t === 'dark' || t === 'light') return t;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function syncThemeBtn() {
    var t = resolvedTheme();
    themeBtn.dataset.mode = t;
    themeBtn.setAttribute('aria-label', t === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  }
  function toggleTheme(e) {
    var next = resolvedTheme() === 'dark' ? 'light' : 'dark';
    var apply = function () {
      html.setAttribute('data-theme', next);
      try { localStorage.setItem('mn-theme', next); } catch (err) { /* private mode */ }
      syncThemeBtn();
      call(Scene.setTheme);
      call(Scene.renderNow);
    };
    if (!document.startViewTransition || reduced) { apply(); return; }
    var r = themeBtn.getBoundingClientRect();
    var x = e && e.clientX ? e.clientX : r.left + r.width / 2, y = e && e.clientY ? e.clientY : r.top + r.height / 2;
    var rad = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    var vt = document.startViewTransition(apply);
    vt.ready.then(function () {
      html.animate({ clipPath: ['circle(0px at ' + x + 'px ' + y + 'px)', 'circle(' + rad + 'px at ' + x + 'px ' + y + 'px)'] },
        { duration: 900, easing: EASE, pseudoElement: '::view-transition-new(root)' });
    }).catch(function () {});
  }

  /* =====================================================================
     Copy email
     ===================================================================== */
  function copyEmail(btn) {
    var label = btn.textContent;
    var ok = function () {
      btn.textContent = 'Copied';
      setTimeout(function () { btn.textContent = label; }, 2200);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(P.email).then(ok, function () { window.location.href = 'mailto:' + P.email; });
    } else {
      window.location.href = 'mailto:' + P.email;
    }
  }

  /* =====================================================================
     Events
     ===================================================================== */
  function onClick(e) {
    var t = e.target;
    if (!(t instanceof Element)) return;
    var el;

    if ((el = t.closest('[data-case]'))) { e.preventDefault(); openCase(el.dataset.case, { trigger: el }); return; }
    if ((el = t.closest('[data-next]'))) { e.preventDefault(); swapCase(el.dataset.next); return; }
    if (t.closest('.case__close')) { e.preventDefault(); closeCase(); return; }

    if ((el = t.closest('[data-arc]'))) {
      e.preventDefault();
      var a = P.archive[+el.dataset.arc];
      var start = Math.max(0, a.images.findIndex(function (g) { return g.name === a.cover; }));
      openLightbox(a.images, start, a, $('img', el), el);
      return;
    }
    if ((el = t.closest('[data-bg]'))) {
      e.preventDefault();
      openLightbox(BG, +el.dataset.bg, null, $('img', el), el);
      return;
    }
    if ((el = t.closest('[data-gal]'))) {
      e.preventDefault();
      var p = P.ma[findCase(caseId)];
      if (p) openLightbox(p.gallery, +el.dataset.gal, null, $('img', el), el);
      return;
    }
    if ((el = t.closest('[data-lb-step]'))) { e.preventDefault(); stepLightbox(+el.dataset.lbStep); return; }
    if (t.closest('[data-lb-close]') || (lbOpen && (t === lbFrame || t.id === 'lb-stage'))) { e.preventDefault(); closeLightbox(); return; }

    if ((el = t.closest('[data-filter]'))) { setFilter(el.dataset.filter); return; }
    if ((el = t.closest('[data-filter-link]'))) {
      e.preventDefault();
      setFilter(el.dataset.filterLink, true);
      scrollToY($('#archive'));
      return;
    }
    if (t.closest('#copy-email')) { copyEmail(t.closest('#copy-email')); return; }
    if (t.closest('.theme-btn')) { toggleTheme(e); return; }

    if ((el = t.closest('a[href^="#"]'))) {
      var href = el.getAttribute('href');
      if (href === '#top' || href === '#') { e.preventDefault(); scrollToY(0); return; }
      var dest = href.length > 1 && document.getElementById(href.slice(1));
      if (dest && !/^#case-/.test(href)) {
        e.preventDefault();
        scrollToY(dest);
        if (href === '#main') dest.focus({ preventScroll: true });
      }
    }
  }

  function onKey(e) {
    if (e.key === 'Escape') {
      if (lbOpen) { e.preventDefault(); closeLightbox(); }
      else if (caseOpen) { e.preventDefault(); closeCase(); }
      return;
    }
    if (lbOpen && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) {
      e.preventDefault();
      stepLightbox(e.key === 'ArrowRight' ? 1 : -1);
    }
  }

  function initSwipe() {
    var sx = 0, sy = 0, on = false;
    var stage = $('#lb-stage');
    stage.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'mouse') return;
      on = true; sx = e.clientX; sy = e.clientY;
    });
    stage.addEventListener('pointerup', function (e) {
      if (!on) return;
      on = false;
      var dx = e.clientX - sx, dy = e.clientY - sy;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.3) stepLightbox(dx < 0 ? 1 : -1);
    });
    stage.addEventListener('pointercancel', function () { on = false; });
  }

  function onPopState() {
    var m = location.hash.match(/^#case-(.+)$/);
    if (m && findCase(m[1]) > -1) {
      if (caseOpen) swapCase(m[1], { fromHistory: true });
      else openCase(m[1], { fromHistory: true });
    } else if (caseOpen) {
      closeCase({ fromHistory: true });
    }
  }

  /* =====================================================================
     Start
     ===================================================================== */
  function init() {
    nav = $('#nav');
    caseEl = $('#case'); casePanel = $('.case__panel', caseEl); caseMedia = $('#case-media'); caseBody = $('#case-body'); caseCount = $('#case-count');
    lb = $('#lb'); lbImg = $('#lb-img'); lbFrame = $('#lb-frame'); lbCap = $('#lb-cap'); lbCount = $('#lb-count'); lbInfo = $('#lb-info');
    themeBtn = $('.theme-btn');
    timeline = $('#timeline'); tlItems = timeline ? $$('.tl', timeline) : [];
    links = $$('.nav__links a');

    renderWork();
    renderArchive();
    sections = $$('[data-scene]');

    syncThemeBtn();
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
      if (!html.getAttribute('data-theme')) { syncThemeBtn(); call(Scene.setTheme); }
    });

    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    window.addEventListener('popstate', onPopState);
    initSwipe();
    initScroll();
    onScroll();

    var go = function () {
      if (go.done) return;
      go.done = true;
      html.classList.remove('is-loading');
      html.classList.add('is-ready');
      call(Scene.setTheme);
      call(Scene.start);
      var m = location.hash.match(/^#case-(.+)$/);
      if (m && findCase(m[1]) > -1) {
        hist('replaceState', null, location.pathname + location.search + location.hash);
        setTimeout(function () { openCase(m[1], { fromHistory: true }); }, 500);
      }
    };
    var fontsReady = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
    Promise.race([fontsReady, new Promise(function (r) { setTimeout(r, 1500); })]).then(function () {
      requestAnimationFrame(go);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
