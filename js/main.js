(function () {
  'use strict';

  var P = window.PORTFOLIO;
  var Scene = window.Scene || {};
  var html = document.documentElement;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var EASE = 'cubic-bezier(.77, 0, .18, 1)';

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function hist(method, state, url) { try { history[method](state, '', url); } catch (e) {} }
  function call(fn) { if (typeof fn === 'function') fn.apply(null, Array.prototype.slice.call(arguments, 1)); }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function src(name) { return 'assets/img/' + name + '.webp'; }
  function dim(name) { return P.dims[name] || [4, 3]; }

  function svgOpen(alt) {
    return '<svg class="gen" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet" role="img" aria-label="' + esc(alt) + '" xmlns="http://www.w3.org/2000/svg">';
  }

  function genFramework(alt, fw) {
    var cx = 400, cy = 300, s = svgOpen(alt);
    var aStep = 360 / fw.areas.length, pStep = 360 / fw.principles.length;
    s += '<circle class="g-ring" cx="400" cy="300" r="100"/><circle class="g-ring" cx="400" cy="300" r="165"/>';
    s += '<circle class="g-ring" cx="400" cy="300" r="238" stroke-dasharray="2 9"/>';
    fw.areas.forEach(function (a, j) {
      var ang = (-90 + j * aStep) * Math.PI / 180, c = Math.cos(ang), sn = Math.sin(ang);
      s += '<line class="g-spoke" x1="' + (cx + c * 48) + '" y1="' + (cy + sn * 48) + '" x2="' + (cx + c * 165) + '" y2="' + (cy + sn * 165) + '"/>';
      s += '<circle class="g-dot" cx="' + (cx + c * 165) + '" cy="' + (cy + sn * 165) + '" r="9"/>';
      var lx = cx + c * 192, ly = cy + sn * 192 + (sn < -0.9 ? -6 : 7);
      var anchor = c > 0.3 ? 'start' : (c < -0.3 ? 'end' : 'middle');
      s += '<text class="g-label" x="' + lx.toFixed(1) + '" y="' + ly.toFixed(1) + '" text-anchor="' + anchor + '">' + esc(a) + '</text>';
    });
    s += '<g class="g-orbit">';
    fw.principles.forEach(function (p, i) {
      var ang = (-90 + pStep / 2 + i * pStep) * Math.PI / 180;
      s += '<circle class="g-pdot" cx="' + (cx + Math.cos(ang) * 100).toFixed(1) + '" cy="' + (cy + Math.sin(ang) * 100).toFixed(1) + '" r="6"/>';
    });
    s += '</g><circle class="g-core" cx="400" cy="300" r="46"/>';
    return s + '<text class="g-core-label" x="400" y="311" text-anchor="middle">' + esc(fw.core) + '</text></svg>';
  }

  function genWave(alt, label, eps) {
    var s = svgOpen(alt), n = 64, w = 7, gap = 4, start = (800 - (n * (w + gap) - gap)) / 2;
    s += '<text class="g-core-label" x="' + start + '" y="128">' + esc(label) + '</text>';
    for (var i = 0; i < n; i++) {
      var t = i / n;
      var h = 24 + Math.abs(Math.sin(i * 0.61) * 92 + Math.sin(i * 0.23 + 1) * 70 + Math.sin(i * 1.7) * 26) * (0.55 + 0.45 * Math.sin(t * Math.PI));
      s += '<rect class="w-bar' + (i >= n / 2 ? ' is-b' : '') + '" style="--i:' + i + '" x="' + (start + i * (w + gap)).toFixed(1) + '" y="' + (300 - h / 2).toFixed(1) + '" width="' + w + '" height="' + h.toFixed(1) + '" rx="3.5"/>';
    }
    s += '<text class="w-label" x="' + start + '" y="492">' + esc(eps[0].n) + '</text>';
    s += '<text class="w-label" x="' + (800 - start) + '" y="492" text-anchor="end">' + esc(eps[1].n) + '</text>';
    return s + '</svg>';
  }

  function genCover(p) {
    return p.cover.svg === 'framework' ? genFramework(p.cover.alt, p.framework) : genWave(p.cover.alt, p.cover.label, p.episodes);
  }

  function imgTag(name, alt, opts) {
    opts = opts || {};
    var d = dim(name), style = (opts.pos ? 'object-position:' + opts.pos + ';' : '') + (opts.fit ? 'object-fit:' + opts.fit : '');
    return '<img src="' + src(name) + '" alt="' + esc(alt) + '" width="' + d[0] + '" height="' + d[1] + '"' +
      (opts.eager ? '' : ' loading="lazy"') + ' decoding="async" draggable="false"' + (style ? ' style="' + style + '"' : '') + '>';
  }

  function coverHTML(p, eager) {
    if (p.cover.svg) return genCover(p);
    return imgTag(p.cover.img, p.cover.alt, { pos: p.cover.pos, fit: p.cover.fit, eager: eager });
  }

  function cardHTML(p, i, eager) {
    return '<li class="work-item work-item--' + (i % 4) + '" data-id="' + p.id + '">' +
      '<div class="work-item__media' + (p.cover.fit === 'contain' ? ' is-contain' : '') + '" data-media>' + coverHTML(p, eager) + '</div>' +
      '<p class="work-item__type"><span>' + esc(p.n) + '</span>' + (p.cardLabel ? ' · ' + esc(p.cardLabel) : '') + '</p>' +
      '<h4 class="work-item__title"><button class="work-item__btn" type="button" data-case="' + p.id + '">' + esc(p.cardTitle) + '</button></h4>' +
      (p.cardSub ? '<p class="work-item__sub">' + esc(p.cardSub) + '</p>' : '') +
      '<p class="work-item__summary">' + esc(p.tagline) + '</p>' +
      '<span class="work-item__more" aria-hidden="true">Read the case study</span>' +
      '</li>';
  }

  function renderWork() {
    var wrap = $('#work-chapters');
    var n = 0;
    wrap.innerHTML = '<dl class="highlights">' + P.highlights.map(function (h) { return '<div><dt>' + esc(h[0]) + '</dt><dd>' + esc(h[1]) + '</dd></div>'; }).join('') + '</dl>' +
      P.chapters.map(function (ch) {
        var cases = P.work.filter(function (p) { return p.ch === ch.id; });
        return '<div class="chapter" id="ch-' + ch.id + '">' +
          '<header class="chapter__head">' +
          '<p class="chapter__n">Chapter ' + esc(ch.n) + ' · ' + esc(ch.count) + '</p>' +
          '<h3 class="chapter__title">' + esc(ch.title) + '</h3>' +
          '<p class="chapter__lede">' + esc(ch.lede) + '</p>' +
          '<p class="chapter__intro">' + esc(ch.intro) + '<span class="chapter__roles">' + esc(ch.roles) + '</span></p>' +
          '</header>' +
          '<ol class="work-grid">' + cases.map(function (p, i) { return cardHTML(p, i, n++ < 2); }).join('') + '</ol>' +
          '</div>';
      }).join('');
  }

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

    var r = timeline.getBoundingClientRect(), mark = vh * 0.62;
    var p = Math.min(Math.max((mark - r.top) / Math.max(r.height - 40, 1), 0), 1);
    timeline.style.setProperty('--p', p.toFixed(4));
    tlItems.forEach(function (li) { li.classList.toggle('is-past', li.getBoundingClientRect().top + 10 <= mark); });
  }

  function rectOf(el) { var r = el.getBoundingClientRect(); return { left: r.left, top: r.top, width: r.width, height: r.height }; }

  function containRect(box, w, h, inset) {
    inset = inset || 0;
    var bw = box.width - inset * 2, bh = box.height - inset * 2, s = Math.min(bw / w, bh / h);
    return { left: box.left + inset + (bw - w * s) / 2, top: box.top + inset + (bh - h * s) / 2, width: w * s, height: h * s };
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
    var kf = [
      { left: from.left + 'px', top: from.top + 'px', width: from.width + 'px', height: from.height + 'px', borderRadius: opts.r0 + 'px' },
      { left: to.left + 'px', top: to.top + 'px', width: to.width + 'px', height: to.height + 'px', borderRadius: opts.r1 + 'px' }
    ];
    var a = g.animate(kf, { duration: reduced ? 1 : opts.duration, easing: EASE, fill: 'forwards' });
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
    els.forEach(function (el) { if (on) el.setAttribute('inert', ''); else el.removeAttribute('inert'); });
  }

  var caseEl, casePanel, caseMedia, caseBody, caseCount, caseOpen = false, caseId = null, caseBusy = false, caseReturn = null;

  function findCase(id) { for (var i = 0; i < P.work.length; i++) if (P.work[i].id === id) return i; return -1; }

  function mineTag() { return '<em class="mine">My individual work</em>'; }

  function statsHTML(b) {
    return '<div class="case__figures"><dl class="case__stats' + (b.small ? ' case__stats--small' : '') + '">' +
      b.stats.map(function (s) { return '<div><dt>' + esc(s[0]) + '</dt><dd>' + esc(s[1]) + '</dd></div>'; }).join('') + '</dl>' +
      (b.note ? '<p class="case__note">' + esc(b.note) + '</p>' : '') + '</div>';
  }

  function tableHTML(t) {
    return '<table class="case__table"><thead><tr>' + t.head.map(function (h) { return '<th scope="col">' + esc(h) + '</th>'; }).join('') + '</tr></thead><tbody>' +
      t.rows.map(function (r, i) {
        return '<tr' + (i === t.mark ? ' class="is-mark"' : '') + '>' + r.map(function (c, j) { return j ? '<td>' + esc(c) + '</td>' : '<th scope="row">' + esc(c) + '</th>'; }).join('') + '</tr>';
      }).join('') + '</tbody></table>';
  }

  function frameworkHTML(fw) {
    return '<div class="fw"><p class="fw__label">' + esc(fw.areasLabel) + '</p><ol class="fw__areas">' +
      fw.areas.map(function (a, i) { return '<li><span>' + pad(i + 1) + '</span>' + esc(a) + '</li>'; }).join('') + '</ol>' +
      '<p class="fw__label">' + esc(fw.baseLabel) + '</p><ul class="chips chips--gold">' +
      fw.principles.map(function (a) { return '<li>' + esc(a) + '</li>'; }).join('') + '</ul></div>';
  }

  function episodesHTML(eps) {
    return '<div class="eps">' + eps.map(function (ep) {
      return '<div class="ep"><h4>' + esc(ep.n) + ' · ' + esc(ep.t) + '</h4><div class="ep__bar">' + ep.s.map(function (s) {
        return '<div class="ep__seg" style="--m:' + s[0] + '"><b>' + s[0] + ' min</b>' + esc(s[1]) + '</div>';
      }).join('') + '</div></div>';
    }).join('') + '</div>';
  }

  function blockHTML(b, p) {
    if (b.quote) return '<blockquote class="case__quote"><p>' + esc(b.quote) + '</p></blockquote>';
    if (b.stats) return statsHTML(b);
    if (b.link) return '<p class="case__link"><span>' + esc(b.link[0]) + '</span><a class="btn" href="' + esc(b.link[2]) + '" target="_blank" rel="noopener">' + esc(b.link[1]) + '</a></p>';
    var h = '';
    if (b.mine) h += '<p>' + mineTag() + '</p>';
    if (b.p) h += '<p>' + esc(b.p) + '</p>';
    if (b.tags) h += '<ul class="chips">' + b.tags.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>';
    if (b.flow) h += '<p class="flow" aria-label="' + esc(b.flow.join(', then ')) + '">' + b.flow.map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('') + '</p>';
    if (b.defs) h += '<dl class="case__defs">' + b.defs.map(function (d) { return '<div><dt>' + esc(d[0]) + '</dt><dd>' + esc(d[1]) + '</dd></div>'; }).join('') + '</dl>';
    if (b.table) h += tableHTML(b.table);
    if (b.framework) h += frameworkHTML(p.framework);
    if (b.episodes) h += episodesHTML(p.episodes);
    if (b.note) h += '<p class="case__note">' + esc(b.note) + '</p>';
    return '<section class="case__block"><h3>' + esc(b.h) + '</h3><div>' + h + '</div></section>';
  }

  function caseHTML(p, idx) {
    var out = ['<header class="case__head"><p class="case__type">' + esc(p.n) + ' · ' + esc(p.type) + '</p>' +
      '<h2 class="case__title" id="case-title">' + esc(p.title) + '</h2>' +
      '<p class="case__tagline">' + esc(p.tagline) + '</p>' +
      '<dl class="case__meta">' + p.meta.map(function (m) { return '<div><dt>' + esc(m[0]) + '</dt><dd>' + esc(m[1]) + '</dd></div>'; }).join('') + '</dl></header>'];
    p.body.forEach(function (b) { out.push(blockHTML(b, p)); });
    if (p.gallery.length) {
      out.push('<h3 class="case__gallery-title">Gallery</h3>');
      out.push('<ul class="case__gallery">' + p.gallery.map(function (g, gi) {
        return '<li><button type="button" data-gal="' + gi + '" aria-label="Open image: ' + esc(g[1]) + '">' +
          imgTag(g[0], g[1]) + '<span>' + (g[2] ? mineTag() : '') + esc(g[1]) + '</span></button></li>';
      }).join('') + '</ul>');
    }
    var next = P.work[(idx + 1) % P.work.length];
    out.push('<button class="case__next" type="button" data-next="' + next.id + '"><span>Next project</span><strong>' + esc(next.title) + '</strong></button>');
    return out.join('');
  }

  function fillCase(idx) {
    var p = P.work[idx];
    caseId = p.id;
    caseMedia.className = 'case__media' + (p.cover.svg ? ' is-svg' : ' is-fit');
    caseMedia.innerHTML = p.cover.svg ? genCover(p) : imgTag(p.cover.img, p.cover.alt, { eager: true, pos: p.cover.pos, fit: p.cover.fit });
    caseBody.innerHTML = caseHTML(p, idx);
    Array.prototype.forEach.call(caseBody.children, function (el, i) { el.style.setProperty('--i', Math.min(i, 8)); });
    caseCount.textContent = (idx + 1) + ' of ' + P.work.length;
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
      $('.case__close', caseEl).focus({ preventScroll: true });
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
      $('.case__close', caseEl).focus({ preventScroll: true });
    }, reduced ? 10 : 420);
  }

  function closeCase(opts) {
    opts = opts || {};
    if (!caseOpen || caseBusy) return;
    if (lbOpen) closeLightbox(true);
    if (!opts.fromHistory && history.state && history.state.mnCase) { history.back(); return; }
    caseBusy = true;

    var id = caseId, card = cardFor(id), cardMedia = card && $('[data-media]', card);
    var from = caseMedia.firstElementChild;

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

    var fromRect = from ? rectOf(from) : null;
    var canFly = !reduced && from && cardMedia && fromRect.top + fromRect.height > 40 && fromRect.top < window.innerHeight;
    caseEl.classList.add('is-closing');
    if (canFly) {
      var ghost = makeGhost(cloneMedia(from), fromRect, 0);
      from.style.visibility = 'hidden';
      cardMedia.style.visibility = 'hidden';
      flyGhost(ghost, fromRect, rectOf(cardMedia), { r0: 0, r1: 6, duration: 850 }).then(function () {
        done();
        requestAnimationFrame(function () { ghost.remove(); });
      });
    } else {
      setTimeout(done, reduced ? 10 : 560);
    }
  }

  var lb, lbImg, lbFrame, lbCap, lbCount, lbOpen = false, lbList = [], lbIndex = 0, lbSource = null, lbSourceName = null, lbReturn = null, lbBusy = false;

  function galleryItems(p) {
    return p.gallery.map(function (g) { var d = dim(g[0]); return { src: src(g[0]), name: g[0], cap: g[1], w: d[0], h: d[1] }; });
  }

  function lbTargetRect(item) { return containRect(rectOf(lbFrame), item.w, item.h); }

  function setLbImage(item) {
    lbImg.src = item.src;
    lbImg.alt = item.cap;
    lbCap.textContent = item.cap;
    lbCount.textContent = lbList.length > 1 ? (lbIndex + 1) + ' of ' + lbList.length : '';
  }

  function ghostImage(item) {
    var gi = document.createElement('img');
    gi.src = item.src; gi.alt = ''; gi.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block';
    return gi;
  }

  function openLightbox(list, index, sourceImg, trigger) {
    if (lbOpen || lbBusy || !list.length) return;
    lbBusy = true; lbOpen = true;
    lbList = list; lbIndex = index; lbReturn = trigger;
    lbSource = sourceImg; lbSourceName = list[index].name;

    lb.classList.toggle('is-single', list.length < 2);
    setLbImage(list[index]);
    lb.scrollTop = 0;
    setInert([caseEl], true);
    lb.setAttribute('aria-hidden', 'false');
    lb.classList.add('is-open');

    var finish = function () {
      lbImg.style.visibility = '';
      lbSource.style.visibility = '';
      lbBusy = false;
      $('.lb__top [data-lb-close]', lb).focus({ preventScroll: true });
    };

    var sr = lbSource.getBoundingClientRect();
    if (!reduced && sr.width && sr.bottom > 0 && sr.top < window.innerHeight) {
      var item = list[index];
      var ghost = makeGhost(ghostImage(item), rectOf(lbSource), 6);
      ghost.style.background = 'transparent';
      ghost.style.boxShadow = 'none';
      lbImg.style.visibility = 'hidden';
      lbSource.style.visibility = 'hidden';
      flyGhost(ghost, rectOf(lbSource), lbTargetRect(item), { r0: 6, r1: 2, duration: 800 }).then(function () {
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
    var t0 = performance.now();
    pre.onload = pre.onerror = function () {
      setTimeout(function () {
        setLbImage(item);
        requestAnimationFrame(function () { lbImg.classList.remove('is-out'); });
      }, Math.max(0, 200 - (performance.now() - t0)));
    };
    pre.src = item.src;
  }

  function closeLightbox(instant) {
    if (!lbOpen) return;
    var item = lbList[lbIndex];
    var source = lbSource;
    var sourceOk = source && document.contains(source) && item.name === lbSourceName;
    var sr = sourceOk && source.getBoundingClientRect();
    var canFly = !instant && !reduced && sourceOk && sr.width && sr.bottom > 0 && sr.top < window.innerHeight;

    var done = function () {
      lb.classList.remove('is-open');
      lb.setAttribute('aria-hidden', 'true');
      lbImg.style.visibility = '';
      if (source) source.style.visibility = '';
      setInert([caseEl], false);
      lbOpen = false; lbBusy = false;
      if (lbReturn && document.contains(lbReturn)) lbReturn.focus({ preventScroll: true });
    };

    if (canFly) {
      lbBusy = true;
      var from = lbTargetRect(item);
      var ghost = makeGhost(ghostImage(item), from, 2);
      ghost.style.background = 'transparent'; ghost.style.boxShadow = 'none';
      lbImg.style.visibility = 'hidden';
      source.style.visibility = 'hidden';
      lb.classList.remove('is-open');
      flyGhost(ghost, from, rectOf(source), { r0: 2, r1: 6, duration: 700 }).then(function () {
        done();
        requestAnimationFrame(function () { ghost.remove(); });
      });
    } else {
      lb.classList.remove('is-open');
      if (instant) done(); else { lbBusy = true; setTimeout(done, reduced ? 10 : 420); }
    }
  }

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
      try { localStorage.setItem('mn-theme', next); } catch (err) {}
      syncThemeBtn();
      call(Scene.setTheme);
      call(Scene.renderNow);
    };
    if (!document.startViewTransition || reduced) { apply(); return; }
    var r = themeBtn.getBoundingClientRect();
    var x = e.clientX || r.left + r.width / 2, y = e.clientY || r.top + r.height / 2;
    var rad = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    var vt = document.startViewTransition(apply);
    vt.ready.then(function () {
      html.animate({ clipPath: ['circle(0px at ' + x + 'px ' + y + 'px)', 'circle(' + rad + 'px at ' + x + 'px ' + y + 'px)'] },
        { duration: 900, easing: EASE, pseudoElement: '::view-transition-new(root)' });
    }).catch(function () {});
  }

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

  function onClick(e) {
    var t = e.target;
    if (!(t instanceof Element)) return;
    var el;

    if ((el = t.closest('[data-case]'))) { e.preventDefault(); openCase(el.dataset.case, { trigger: el }); return; }
    if ((el = t.closest('[data-next]'))) { e.preventDefault(); swapCase(el.dataset.next); return; }
    if (t.closest('.case__close')) { e.preventDefault(); closeCase(); return; }
    if ((el = t.closest('[data-gal]'))) {
      e.preventDefault();
      openLightbox(galleryItems(P.work[findCase(caseId)]), +el.dataset.gal, $('img', el), el);
      return;
    }
    if ((el = t.closest('[data-lb-step]'))) { e.preventDefault(); stepLightbox(+el.dataset.lbStep); return; }
    if (t.closest('[data-lb-close]') || (lbOpen && (t === lbFrame || t.id === 'lb-stage'))) { e.preventDefault(); closeLightbox(); return; }
    if (t.closest('#copy-email')) { copyEmail(t.closest('#copy-email')); return; }
    if (t.closest('.theme-btn')) { toggleTheme(e); return; }

    if ((el = t.closest('a[href^="#"]'))) {
      var href = el.getAttribute('href');
      if (href === '#top') { e.preventDefault(); scrollToY(0); return; }
      var dest = document.getElementById(href.slice(1));
      if (dest) {
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

  function init() {
    nav = $('#nav');
    caseEl = $('#case'); casePanel = $('.case__panel', caseEl); caseMedia = $('#case-media'); caseBody = $('#case-body'); caseCount = $('#case-count');
    lb = $('#lb'); lbImg = $('#lb-img'); lbFrame = $('#lb-frame'); lbCap = $('#lb-cap'); lbCount = $('#lb-count');
    themeBtn = $('.theme-btn');
    timeline = $('#timeline'); tlItems = $$('.tl', timeline);
    links = $$('.nav__links a');

    renderWork();
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
