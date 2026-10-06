(function () {
  'use strict';

  var html = document.documentElement;
  var noop = function () {};
  var Scene = { start: noop, setShape: noop, setTheme: noop, setDim: noop, setVelocity: noop, renderNow: noop };
  window.Scene = Scene;

  var canvas = document.getElementById('scene');
  var THREE = window.THREE;

  function fail() {
    html.classList.add('no-webgl');
    if (canvas) canvas.style.display = 'none';
  }

  if (!canvas || !THREE) { fail(); return; }
  try {
    var test = document.createElement('canvas');
    if (!(test.getContext('webgl') || test.getContext('experimental-webgl'))) { fail(); return; }
  } catch (e) { fail(); return; }

  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: false, alpha: true, powerPreference: 'high-performance' });
  } catch (e) { fail(); return; }
  renderer.setClearColor(0x000000, 0);

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var small = Math.min(window.innerWidth, window.innerHeight) < 700 || window.matchMedia('(pointer: coarse)').matches;
  var N = small ? 4600 : 9000;

  function rnd(a, b) { return a + Math.random() * (b - a); }
  function norm(v) { var l = Math.hypot(v[0], v[1], v[2]) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function perp(d) {
    var a = Math.abs(d[0]) < 0.9 ? [1, 0, 0] : [0, 1, 0];
    var u = norm(cross(d, a));
    return [u, cross(d, u)];
  }
  function make() { return { p: new Float32Array(N * 3), n: new Float32Array(N * 3) }; }
  function put(s, i, x, y, z, nx, ny, nz) {
    var k = i * 3;
    s.p[k] = x; s.p[k + 1] = y; s.p[k + 2] = z;
    s.n[k] = nx; s.n[k + 1] = ny; s.n[k + 2] = nz;
  }

  function gyroid() {
    var s = make(), H = 1.32, k = 3.15, i = 0, guard = 0;
    while (i < N && guard < N * 80) {
      guard++;
      var x = rnd(-H, H), y = rnd(-H, H), z = rnd(-H, H);
      var f, gx, gy, gz;
      for (var it = 0; it < 5; it++) {
        var sx = Math.sin(k * x), cx = Math.cos(k * x), sy = Math.sin(k * y), cy = Math.cos(k * y), sz = Math.sin(k * z), cz = Math.cos(k * z);
        f = sx * cy + sy * cz + sz * cx;
        gx = k * (cx * cy - sz * sx); gy = k * (cy * cz - sx * sy); gz = k * (cz * cx - sy * sz);
        var g2 = gx * gx + gy * gy + gz * gz + 1e-6;
        x -= f * gx / g2; y -= f * gy / g2; z -= f * gz / g2;
      }
      if (Math.abs(f) > 0.05) continue;
      if (Math.pow(x, 8) + Math.pow(y, 8) + Math.pow(z, 8) > Math.pow(H, 8)) continue;
      var n = norm([gx, gy, gz]);
      var j = (Math.random() - 0.5) * 0.03;
      put(s, i++, x + n[0] * j, y + n[1] * j, z + n[2] * j, n[0], n[1], n[2]);
    }
    for (; i < N; i++) { var c = (i % 97) * 3; put(s, i, s.p[c], s.p[c + 1], s.p[c + 2], s.n[c], s.n[c + 1], s.n[c + 2]); }
    return s;
  }

  function rings() {
    var s = make(), i = 0, core = Math.floor(N * 0.1);
    for (; i < core; i++) {
      var d = norm([rnd(-1, 1), rnd(-1, 1), rnd(-1, 1)]), r = 0.34;
      put(s, i, d[0] * r, d[1] * r, d[2] * r, d[0], d[1], d[2]);
    }
    var R = [], tot = 0;
    for (var j = 0; j < 8; j++) { R.push(1.0 + j * 0.15); tot += R[j]; }
    for (j = 0; j < 8; j++) {
      var yy = 1 - (j + 0.5) / 8 * 2, rr = Math.sqrt(1 - yy * yy), th = j * 2.39996;
      var axis = [Math.cos(th) * rr, yy, Math.sin(th) * rr];
      var b = perp(axis), u = b[0], v = b[1];
      var count = j === 7 ? N - i : Math.floor((N - core) * R[j] / tot);
      for (var c = 0; c < count && i < N; c++) {
        var a = Math.random() * Math.PI * 2, ph = Math.random() * Math.PI * 2, tr = 0.028;
        var rad = [u[0] * Math.cos(a) + v[0] * Math.sin(a), u[1] * Math.cos(a) + v[1] * Math.sin(a), u[2] * Math.cos(a) + v[2] * Math.sin(a)];
        var nn = [rad[0] * Math.cos(ph) + axis[0] * Math.sin(ph), rad[1] * Math.cos(ph) + axis[1] * Math.sin(ph), rad[2] * Math.cos(ph) + axis[2] * Math.sin(ph)];
        put(s, i++, rad[0] * R[j] + nn[0] * tr, rad[1] * R[j] + nn[1] * tr, rad[2] * R[j] + nn[2] * tr, nn[0], nn[1], nn[2]);
      }
    }
    return s;
  }

  function helix() {
    var s = make(), i = 0, R = 1.0, Hh = 2.35, turns = 2.25, strands = Math.floor(N * 0.78), rungs = 24;
    var w = turns * Math.PI * 2 / (2 * Hh);
    for (; i < strands; i++) {
      var y = rnd(-Hh, Hh), th = (y + Hh) * w + (i % 2) * Math.PI;
      var n1 = [Math.cos(th), 0, Math.sin(th)];
      var T = norm([-R * Math.sin(th) * w, 1, R * Math.cos(th) * w]);
      var n2 = cross(T, n1), ph = Math.random() * Math.PI * 2, tr = 0.07;
      var nn = [n1[0] * Math.cos(ph) + n2[0] * Math.sin(ph), n1[1] * Math.cos(ph) + n2[1] * Math.sin(ph), n1[2] * Math.cos(ph) + n2[2] * Math.sin(ph)];
      put(s, i, R * n1[0] + nn[0] * tr, y + nn[1] * tr, R * n1[2] + nn[2] * tr, nn[0], nn[1], nn[2]);
    }
    for (; i < N; i++) {
      var k = Math.floor(Math.random() * rungs), yk = -Hh + (k + 0.5) * (2 * Hh / rungs), tk = (yk + Hh) * w;
      var t = Math.random(), x0 = R * Math.cos(tk), z0 = R * Math.sin(tk);
      var nd = norm([rnd(-1, 1), rnd(-0.3, 0.3), rnd(-1, 1)]);
      put(s, i, x0 * (1 - 2 * t) + nd[0] * 0.02, yk + nd[1] * 0.02, z0 * (1 - 2 * t) + nd[2] * 0.02, nd[0], nd[1], nd[2]);
    }
    return s;
  }

  function lattice() {
    var s = make(), i = 0, g = 1.1, struts = [], L = 0, nodes = [];
    for (var x = -1; x <= 1; x++) for (var y = -1; y <= 1; y++) for (var z = -1; z <= 1; z++) {
      nodes.push([x * g, y * g, z * g]);
      if (x < 1) struts.push([[x * g, y * g, z * g], [(x + 1) * g, y * g, z * g]]);
      if (y < 1) struts.push([[x * g, y * g, z * g], [x * g, (y + 1) * g, z * g]]);
      if (z < 1) struts.push([[x * g, y * g, z * g], [x * g, y * g, (z + 1) * g]]);
    }
    for (x = -1; x < 1; x++) for (y = -1; y < 1; y++) for (z = -1; z < 1; z++) {
      var c = [(x + 0.5) * g, (y + 0.5) * g, (z + 0.5) * g];
      [[0, 0, 0], [1, 0, 0], [0, 1, 0], [0, 0, 1], [1, 1, 0], [1, 0, 1], [0, 1, 1], [1, 1, 1]].forEach(function (o) {
        struts.push([c, [(x + o[0]) * g, (y + o[1]) * g, (z + o[2]) * g]]);
      });
    }
    struts.forEach(function (st) { st.len = Math.hypot(st[1][0] - st[0][0], st[1][1] - st[0][1], st[1][2] - st[0][2]); L += st.len; });
    var nodeCount = Math.floor(N * 0.12), strutCount = N - nodeCount;
    struts.forEach(function (st, si) {
      var d = norm([st[1][0] - st[0][0], st[1][1] - st[0][1], st[1][2] - st[0][2]]), b = perp(d);
      var count = si === struts.length - 1 ? strutCount - i : Math.round(strutCount * st.len / L);
      for (var k = 0; k < count && i < strutCount; k++) {
        var t = Math.random(), ph = Math.random() * Math.PI * 2, tr = 0.032;
        var nn = [b[0][0] * Math.cos(ph) + b[1][0] * Math.sin(ph), b[0][1] * Math.cos(ph) + b[1][1] * Math.sin(ph), b[0][2] * Math.cos(ph) + b[1][2] * Math.sin(ph)];
        put(s, i++,
          st[0][0] + (st[1][0] - st[0][0]) * t + nn[0] * tr,
          st[0][1] + (st[1][1] - st[0][1]) * t + nn[1] * tr,
          st[0][2] + (st[1][2] - st[0][2]) * t + nn[2] * tr, nn[0], nn[1], nn[2]);
      }
    });
    for (; i < N; i++) {
      var nd = nodes[i % nodes.length], dd = norm([rnd(-1, 1), rnd(-1, 1), rnd(-1, 1)]), r = 0.085;
      put(s, i, nd[0] + dd[0] * r, nd[1] + dd[1] * r, nd[2] + dd[2] * r, dd[0], dd[1], dd[2]);
    }
    return s;
  }

  function scatter() {
    var s = make();
    for (var i = 0; i < N; i++) {
      var d = norm([rnd(-1, 1), rnd(-1, 1), rnd(-1, 1)]), r = rnd(3.5, 9);
      put(s, i, d[0] * r, d[1] * r, d[2] * r * 0.6, d[0], d[1], d[2]);
    }
    return s;
  }

  var G = gyroid();
  var SHAPES = { gyroid: G, rings: rings(), helix: helix(), lattice: lattice(), contact: G, about: G, scatter: scatter() };

  var LAYOUT = {
    gyroid:  { x: 0.42, y: 0.1, s: 0.94, o: 1, rx: 0.42, rz: 0.12, mx: 0, my: 0.42, ms: 0.6, mo: 1 },
    about:   { x: -0.64, y: 0.17, s: 0.42, o: 0.65, rx: 0.42, rz: 0.12, mx: 0.62, my: 0.36, ms: 0.4, mo: 0.35 },
    rings:   { x: 0.0, y: 0.0, s: 1.25, o: 0.42, rx: 0.3, rz: 0, mx: 0, my: 0.05, ms: 0.85, mo: 0.28 },
    helix:   { x: -0.62, y: -0.42, s: 0.62, o: 0.9, rx: 0.12, rz: 0.16, mx: 0.62, my: 0.1, ms: 0.6, mo: 0.3 },
    lattice: { x: 0.78, y: 0.04, s: 1.08, o: 0.5, rx: 0.6, rz: 0.12, mx: 0.55, my: 0.1, ms: 0.7, mo: 0.24 },
    contact: { x: 0.5, y: 0.04, s: 0.92, o: 1, rx: 0.42, rz: -0.1, mx: 0, my: 0.44, ms: 0.56, mo: 1 }
  };

  var geo = new THREE.BufferGeometry();
  var aFrom = new THREE.BufferAttribute(new Float32Array(N * 3), 3);
  var aTo = new THREE.BufferAttribute(new Float32Array(N * 3), 3);
  var aNFrom = new THREE.BufferAttribute(new Float32Array(N * 3), 3);
  var aNTo = new THREE.BufferAttribute(new Float32Array(N * 3), 3);
  var rand = new Float32Array(N);
  for (var r = 0; r < N; r++) rand[r] = Math.random();
  [aFrom, aTo, aNFrom, aNTo].forEach(function (a) { a.setUsage(THREE.DynamicDrawUsage); });
  geo.setAttribute('position', aTo);
  geo.setAttribute('aFrom', aFrom);
  geo.setAttribute('aTo', aTo);
  geo.setAttribute('aNFrom', aNFrom);
  geo.setAttribute('aNTo', aNTo);
  geo.setAttribute('aRand', new THREE.BufferAttribute(rand, 1));

  var U = {
    uMorph: { value: 1 }, uSpread: { value: 0.35 }, uTime: { value: 0 },
    uSize: { value: 24 }, uPR: { value: 1 }, uScatter: { value: 0 }, uOpacity: { value: 0 },
    uDeep: { value: new THREE.Color('#5E410E') }, uGold: { value: new THREE.Color('#AD7F27') }, uHi: { value: new THREE.Color('#F1D995') }
  };

  var mat = new THREE.ShaderMaterial({
    uniforms: U,
    transparent: true, depthWrite: false, depthTest: false,
    vertexShader: [
      'attribute vec3 aFrom; attribute vec3 aTo; attribute vec3 aNFrom; attribute vec3 aNTo; attribute float aRand;',
      'uniform float uMorph, uSpread, uTime, uSize, uPR, uScatter;',
      'uniform vec3 uDeep, uGold, uHi;',
      'varying vec3 vColor; varying float vAlpha;',
      'float ease(float t){ return t < .5 ? 4. * t * t * t : 1. - pow(-2. * t + 2., 3.) / 2.; }',
      'void main(){',
      '  float t = clamp((uMorph - aRand * uSpread) / (1. - uSpread), 0., 1.);',
      '  float e = ease(t);',
      '  vec3 dir = normalize(vec3(sin(aRand * 91.7 + 1.), sin(aRand * 47.3 + 2.), sin(aRand * 13.9 + 3.)) + 1e-4);',
      '  vec3 p = mix(aFrom, aTo, e);',
      '  p += dir * (sin(3.14159 * t) * .55 + uScatter * (.35 + aRand));',
      '  p += dir * sin(uTime * .9 + aRand * 40.) * .012;',
      '  vec3 n = normalize(mix(aNFrom, aNTo, e) + vec3(1e-4));',
      '  vec4 mv = modelViewMatrix * vec4(p, 1.);',
      '  vec3 nv = normalize(normalMatrix * n);',
      '  vec3 v = normalize(-mv.xyz);',
      '  if (dot(nv, v) < 0.) nv = -nv;',
      '  vec3 L = normalize(vec3(-.45, .75, .55));',
      '  float diff = max(dot(nv, L), 0.);',
      '  float spec = pow(max(dot(nv, normalize(L + v)), 0.), 28.);',
      '  float rim = pow(1. - max(dot(nv, v), 0.), 2.);',
      '  vColor = mix(uDeep, uGold, .2 + .8 * diff) + uHi * (spec * .95 + rim * .1);',
      '  float fade = clamp(1.25 - (-mv.z - 7.6) * .38, .22, 1.);',
      '  vAlpha = (.3 + .7 * diff) * fade;',
      '  gl_Position = projectionMatrix * mv;',
      '  gl_PointSize = uSize * uPR * (.65 + aRand * .7) * mix(.7, 1., fade) / -mv.z;',
      '}'
    ].join('\n'),
    fragmentShader: [
      'uniform float uOpacity; varying vec3 vColor; varying float vAlpha;',
      'void main(){',
      '  float d = length(gl_PointCoord - .5);',
      '  float a = smoothstep(.5, .12, d);',
      '  if (a < .02) discard;',
      '  gl_FragColor = vec4(vColor, a * vAlpha * uOpacity);',
      '}'
    ].join('\n')
  });

  var points = new THREE.Points(geo, mat);
  points.frustumCulled = false;
  var scene = new THREE.Scene();
  scene.add(points);
  var camera = new THREE.PerspectiveCamera(35, 1, 0.1, 60);
  camera.position.z = 9;

  var current = 'gyroid', started = false, dim = false, opMul = 1;
  var morphT = 1, morphDur = 1.7, morphing = false;
  var spin = 0, tiltX = 0, tiltY = 0, ptx = 0, pty = 0, vel = 0, scat = 0;
  var pos = { x: 0, y: 0, s: 1, rx: 0.4, rz: 0, o: 0 };
  var W = 0, H = 0, aspect = 1;

  function copyShape(attr, src) { attr.array.set(src); attr.needsUpdate = true; }

  function easeJS(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }

  function snapshot() {
    var m = U.uMorph.value, sp = U.uSpread.value, F = aFrom.array, T = aTo.array, NF = aNFrom.array, NT = aNTo.array;
    for (var i = 0; i < N; i++) {
      var t = Math.min(Math.max((m - rand[i] * sp) / (1 - sp), 0), 1), e = easeJS(t), k = i * 3;
      for (var c = 0; c < 3; c++) {
        F[k + c] += (T[k + c] - F[k + c]) * e;
        NF[k + c] += (NT[k + c] - NF[k + c]) * e;
      }
    }
    aFrom.needsUpdate = true; aNFrom.needsUpdate = true;
  }

  function morphTo(name, dur, spread) {
    snapshot();
    copyShape(aTo, SHAPES[name].p);
    copyShape(aNTo, SHAPES[name].n);
    U.uSpread.value = spread;
    U.uMorph.value = 0; morphT = 0; morphDur = dur; morphing = true;
    if (reduced) { U.uMorph.value = 1; morphing = false; }
  }

  function resize() {
    var w = window.innerWidth, h = window.innerHeight;
    if (w === W && Math.abs(h - H) < 160 && H) return;
    W = w; H = h; aspect = w / h;
    var pr = Math.min(window.devicePixelRatio || 1, small ? 1.75 : 2);
    renderer.setPixelRatio(pr);
    renderer.setSize(w, h, false);
    camera.aspect = aspect; camera.updateProjectionMatrix();
    U.uPR.value = pr;
    U.uSize.value = 27 * Math.max(0.8, Math.min(1.35, Math.sqrt(h / 860)));
  }

  function target() {
    var L = LAYOUT[current], mobile = aspect < 0.9;
    var halfH = Math.tan(THREE.MathUtils.degToRad(17.5)) * 9, halfW = halfH * aspect;
    return {
      x: (mobile ? L.mx : L.x) * halfW,
      y: (mobile ? L.my : L.y) * halfH,
      s: (mobile ? L.ms : L.s) * (mobile ? Math.min(1, aspect / 0.62) : 1),
      o: (mobile ? L.mo : L.o),
      rx: L.rx, rz: L.rz
    };
  }

  var last = 0, raf = 0;
  function frame(now) {
    raf = requestAnimationFrame(frame);
    var dt = Math.min((now - (last || now)) / 1000, 0.05); last = now;
    U.uTime.value = now / 1000;

    if (morphing) {
      morphT += dt / morphDur;
      U.uMorph.value = Math.min(morphT, 1);
      if (morphT >= 1) morphing = false;
    }

    var T = target(), k = 1 - Math.exp(-dt * 2.6), ko = 1 - Math.exp(-dt * 3.5);
    pos.x += (T.x - pos.x) * k; pos.y += (T.y - pos.y) * k; pos.s += (T.s - pos.s) * k;
    pos.rx += (T.rx - pos.rx) * k; pos.rz += (T.rz - pos.rz) * k;
    var oT = started ? T.o * (dim ? 0 : 1) : 0;
    pos.o += (oT - pos.o) * ko;

    vel *= Math.exp(-dt * 4);
    var scT = Math.min(Math.abs(vel) * 0.006, 0.4);
    scat += (scT - scat) * (1 - Math.exp(-dt * 6));
    U.uScatter.value = reduced ? 0 : scat;
    if (!reduced) spin += dt * 0.09 + vel * 0.0016;

    tiltX += (pty * 0.22 - tiltX) * (1 - Math.exp(-dt * 3));
    tiltY += (ptx * 0.32 - tiltY) * (1 - Math.exp(-dt * 3));

    points.position.set(pos.x, pos.y, 0);
    points.scale.setScalar(pos.s);
    points.rotation.set(pos.rx + tiltX, spin + tiltY, pos.rz);
    U.uOpacity.value = pos.o * opMul;

    if (pos.o < 0.004 && oT === 0) return;
    renderer.render(scene, camera);
  }

  Scene.start = function () {
    if (started) return;
    started = true;
    copyShape(aFrom, SHAPES.scatter.p); copyShape(aNFrom, SHAPES.scatter.n);
    copyShape(aTo, SHAPES[current].p); copyShape(aNTo, SHAPES[current].n);
    U.uSpread.value = 0.5;
    U.uMorph.value = 0; morphT = 0; morphDur = 2.6; morphing = true;
    if (reduced) { U.uMorph.value = 1; morphing = false; }
    var T = target();
    pos.x = T.x; pos.y = T.y; pos.s = T.s; pos.rx = T.rx; pos.rz = T.rz;
  };

  Scene.setShape = function (name) {
    if (!LAYOUT[name] || name === current) return;
    var prevGeo = SHAPES[current];
    current = name;
    if (!started) return;
    if (SHAPES[name] !== prevGeo || morphing) morphTo(name, 1.8, 0.4);
  };

  Scene.setTheme = function () {
    var cs = getComputedStyle(html);
    var get = function (v, f) { return (cs.getPropertyValue(v) || '').trim() || f; };
    U.uDeep.value.set(get('--p-deep', '#5E410E'));
    U.uGold.value.set(get('--p-gold', '#AD7F27'));
    U.uHi.value.set(get('--p-hi', '#F1D995'));
    var dark = get('--scene-mode', 'light') === 'dark';
    mat.blending = dark ? THREE.AdditiveBlending : THREE.NormalBlending;
    opMul = dark ? 0.78 : 1;
    mat.needsUpdate = true;
  };

  Scene.setDim = function (on) { dim = !!on; };
  Scene.setVelocity = function (v) { vel = Math.max(-80, Math.min(80, v || 0)); };
  Scene.renderNow = function () {
    U.uOpacity.value = pos.o * opMul;
    renderer.render(scene, camera);
  };

  window.addEventListener('resize', resize);
  window.addEventListener('pointermove', function (e) {
    if (e.pointerType !== 'mouse') return;
    ptx = e.clientX / window.innerWidth * 2 - 1;
    pty = e.clientY / window.innerHeight * 2 - 1;
  }, { passive: true });
  document.addEventListener('mouseleave', function () { ptx = 0; pty = 0; });
  canvas.addEventListener('webglcontextlost', function (e) { e.preventDefault(); cancelAnimationFrame(raf); fail(); });

  resize();
  Scene.setTheme();
  raf = requestAnimationFrame(frame);
})();
