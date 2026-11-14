/* SECOND LAYER — 3D hero. Loaded after first paint; the page works fully without it. */
(function () {
  'use strict';
  var root = document.documentElement;
  var hero = document.getElementById('hero');
  var canvas = document.getElementById('hero-canvas');
  // Turning animations back on from the off switch reloads, so the 3D hero can start cleanly.
  window.addEventListener('sl:motion', function (e) {
    if (!e.detail.off && hero && !root.classList.contains('has-3d') && root.getAttribute('data-3d-capable') === '1') location.reload();
  });
  if (!hero || !canvas || !root.classList.contains('has-3d')) return;
  var stage = hero.querySelector('.hero-stage');
  var heroA = hero.querySelector('.hero-a');
  var labelTop = hero.querySelector('.stack-label.top');
  var labelBottom = hero.querySelector('.stack-label.bottom');
  var LOGO = window.SL_LOGO;

  function fail() { root.classList.remove('has-3d', 'three-ready'); hero.style.setProperty('--p', 0); }
  function idle(fn) { if ('requestIdleCallback' in window) requestIdleCallback(fn, { timeout: 1500 }); else setTimeout(fn, 300); }
  function start() {
    import('https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.min.js').then(init).catch(fail);
  }
  if (document.readyState === 'complete') idle(start);
  else window.addEventListener('load', function () { idle(start); });

  function init(THREE) {
    var renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch (e) { return fail(); }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    canvas.addEventListener('webglcontextlost', function (e) { e.preventDefault(); stop(); fail(); });

    var FOV = 35, DIST = 8;
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 50);
    camera.position.set(0, 0, DIST);

    /* Soft iridescent surroundings for the tiles to reflect, painted on a small canvas (no downloads). */
    var ec = document.createElement('canvas'); ec.width = 512; ec.height = 256;
    var g = ec.getContext('2d');
    var lg = g.createLinearGradient(0, 0, 0, 256);
    lg.addColorStop(0, '#3A2A8F'); lg.addColorStop(0.5, '#160F2A'); lg.addColorStop(1, '#2A1C4E');
    g.fillStyle = lg; g.fillRect(0, 0, 512, 256);
    function blob(x, y, r, c) {
      var rg = g.createRadialGradient(x, y, 0, x, y, r);
      rg.addColorStop(0, c); rg.addColorStop(1, 'rgba(0,0,0,0)');
      g.fillStyle = rg; g.fillRect(0, 0, 512, 256);
    }
    blob(120, 60, 110, '#ffffff'); blob(380, 90, 130, '#C06BD8'); blob(260, 210, 150, '#6A3FD1'); blob(470, 40, 70, '#F4EFFF'); blob(30, 180, 90, '#E7B0F5');
    var et = new THREE.CanvasTexture(ec);
    et.mapping = THREE.EquirectangularReflectionMapping; et.colorSpace = THREE.SRGBColorSpace;
    var pm = new THREE.PMREMGenerator(renderer);
    scene.environment = pm.fromEquirectangular(et).texture;
    et.dispose(); pm.dispose();

    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    var key = new THREE.DirectionalLight(0xffffff, 1.6); key.position.set(3, 4, 6); scene.add(key);
    var violet = new THREE.PointLight(0x6A3FD1, 60); violet.position.set(-4, 2, 3); scene.add(violet);
    var pink = new THREE.PointLight(0xC06BD8, 50); pink.position.set(4, -3, 2); scene.add(pink);

    /* Rounded tile, built in code. */
    var W = 1.5, H = 1.8, RAD = 0.28;
    var s = new THREE.Shape(), x = -W / 2, y = -H / 2;
    s.moveTo(x + RAD, y); s.lineTo(x + W - RAD, y); s.quadraticCurveTo(x + W, y, x + W, y + RAD);
    s.lineTo(x + W, y + H - RAD); s.quadraticCurveTo(x + W, y + H, x + W - RAD, y + H);
    s.lineTo(x + RAD, y + H); s.quadraticCurveTo(x, y + H, x, y + H - RAD);
    s.lineTo(x, y + RAD); s.quadraticCurveTo(x, y, x + RAD, y);
    var geo = new THREE.ExtrudeGeometry(s, { depth: 0.14, bevelEnabled: true, bevelThickness: 0.035, bevelSize: 0.035, bevelSegments: 4, curveSegments: 14 });
    geo.center();
    var faceGeo = new THREE.PlaneGeometry(W, H);

    function letterTexture(path, ox, oy) {
      var c = document.createElement('canvas'); c.width = 300; c.height = 360;
      var ctx = c.getContext('2d');
      ctx.scale(2, 2); ctx.translate(-ox, -oy); ctx.fillStyle = '#160F2A'; ctx.fill(new Path2D(path));
      var t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4;
      return t;
    }
    function tile(color, path, ox, oy) {
      var grp = new THREE.Group();
      grp.add(new THREE.Mesh(geo, new THREE.MeshPhysicalMaterial({ color: color, roughness: 0.2, metalness: 0.05, clearcoat: 1, clearcoatRoughness: 0.12, envMapIntensity: 1.1, iridescence: 0.5, iridescenceIOR: 1.3 })));
      var face = new THREE.Mesh(faceGeo, new THREE.MeshBasicMaterial({ map: letterTexture(path, ox, oy), transparent: true, toneMapped: false }));
      face.position.z = 0.108;
      grp.add(face);
      return grp;
    }
    var rig = new THREE.Group(), spin = new THREE.Group();
    var tileS = tile(0xF4EFFF, LOGO.s, 40, 40);
    var tileL = tile(0xE7B0F5, LOGO.l, 176, 64);
    spin.add(tileL); spin.add(tileS); rig.add(spin); scene.add(rig);

    /* Soft glow behind the tiles. */
    var gc = document.createElement('canvas'); gc.width = gc.height = 128;
    var gg = gc.getContext('2d'), rg = gg.createRadialGradient(64, 64, 0, 64, 64, 64);
    rg.addColorStop(0, 'rgba(192,107,216,0.55)'); rg.addColorStop(0.45, 'rgba(106,63,209,0.22)'); rg.addColorStop(1, 'rgba(0,0,0,0)');
    gg.fillStyle = rg; gg.fillRect(0, 0, 128, 128);
    var glowMat = new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(gc), blending: THREE.AdditiveBlending, depthWrite: false, transparent: true });
    var glow = new THREE.Sprite(glowMat);
    glow.scale.setScalar(6.5); glow.position.z = -1.5; rig.add(glow);
    // Additive glow vanishes on a light page, so light mode uses a soft normal blend instead.
    function applyTheme() {
      var light = root.getAttribute('data-theme') === 'light';
      glowMat.blending = light ? THREE.NormalBlending : THREE.AdditiveBlending;
      glowMat.opacity = light ? 0.55 : 1;
      glowMat.needsUpdate = true;
    }
    applyTheme();
    if ('MutationObserver' in window) new MutationObserver(applyTheme).observe(root, { attributes: true, attributeFilter: ['data-theme'] });

    var base = {}, viewW = 1, viewH = 1;
    function layout() {
      var w = stage.clientWidth, h = stage.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h; camera.updateProjectionMatrix();
      viewH = 2 * DIST * Math.tan(FOV * Math.PI / 360); viewW = viewH * camera.aspect;
      if (camera.aspect < 0.95) {
        // Phones: put the tiles in the free space between the hero text and the bottom dock,
        // so they never sit behind the headline or the button.
        var px2w = viewH / h, sTop = stage.getBoundingClientRect().top;
        var top = heroA ? heroA.getBoundingClientRect().bottom - sTop + 14 : h * 0.6;
        var bottom = h - (w < 960 ? 92 : 24);
        var room = Math.max(bottom - top, 120);
        var mid = Math.min(top + room / 2, h - 70);
        // End of the scroll: the stacked tiles and their two labels sit between "The idea" text and the dock.
        var heroB = hero.querySelector('.hero-b');
        var topB = heroB ? heroB.getBoundingClientRect().bottom - sTop + 16 : h * 0.42;
        var roomB = Math.max(bottom - topB, 160);
        var midB = topB + roomB / 2;
        base = { x: 0, yA: (0.5 - mid / h) * viewH, yB: (0.5 - midB / h) * viewH, sA: Math.min(0.6, viewW / 4.3, room * px2w / 2.5), sB: Math.min(0.8, viewW / 3.3, roomB * px2w / 3.1) };
      }
      else base = { x: Math.min(viewW * 0.25, 2.7), yA: 0, yB: -0.05, sA: Math.min(1, viewW / 8.5), sB: Math.min(1.15, viewW / 7.5) };
    }
    layout();
    window.addEventListener('resize', layout);
    // Web fonts arriving change the height of the hero text, so lay out again whenever it resizes.
    if ('ResizeObserver' in window && heroA) new ResizeObserver(function () { layout(); }).observe(heroA);
    if (document.fonts && document.fonts.addEventListener) document.fonts.addEventListener('loadingdone', layout);

    var p = 0, target = 0, px = 0, py = 0, tpx = 0, tpy = 0, running = false, raf = 0, t0 = performance.now(), ready = false;
    function measure() {
      var r = hero.getBoundingClientRect(), span = hero.offsetHeight - window.innerHeight;
      target = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0;
    }
    window.addEventListener('scroll', measure, { passive: true });
    measure(); p = target;
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      window.addEventListener('pointermove', function (e) { tpx = e.clientX / window.innerWidth - 0.5; tpy = e.clientY / window.innerHeight - 0.5; }, { passive: true });
    }
    function lerp(a, b, k) { return a + (b - a) * k; }
    var v = new THREE.Vector3();
    function place(el, yOff) {
      if (!el) return;
      v.set(rig.position.x, rig.position.y + yOff, 0).project(camera);
      el.style.transform = 'translate(' + ((v.x * 0.5 + 0.5) * stage.clientWidth).toFixed(1) + 'px,' + ((-v.y * 0.5 + 0.5) * stage.clientHeight).toFixed(1) + 'px) translate(-50%,-50%)';
    }
    function frame(now) {
      raf = requestAnimationFrame(frame);
      var t = (now - t0) / 1000;
      p += (target - p) * 0.09; px += (tpx - px) * 0.06; py += (tpy - py) * 0.06;
      hero.style.setProperty('--p', p.toFixed(4));
      if (heroA) heroA.style.pointerEvents = p > 0.25 ? 'none' : '';
      var k = Math.min(1, Math.max(0, (p - 0.04) / 0.8)), e = k * k * (3 - 2 * k), arc = Math.sin(e * Math.PI);
      var sc = lerp(base.sA, base.sB, e);
      rig.position.set(base.x, lerp(base.yA, base.yB, e) + Math.sin(t * 0.8) * 0.05, 0);
      rig.scale.setScalar(sc);
      spin.rotation.set(lerp(0.08 + py * 0.25, -1.02, e), lerp(-0.34 + px * 0.45, 0, e), e * (0.62 + Math.sin(t * 0.4) * 0.08));
      tileS.position.set(lerp(-0.68, 0, e), lerp(0.12, 0, e), lerp(0, 0.42, e) + Math.sin(t * 1.2) * 0.04 * e);
      tileL.position.set(lerp(0.68, 0, e) + arc * 0.55, lerp(-0.12, 0, e), lerp(-0.25, -0.42, e) - arc * 0.15);
      tileS.rotation.z = Math.sin(t * 0.7) * 0.025 * (1 - e);
      tileL.rotation.z = Math.sin(t * 0.7 + 1) * 0.035 * (1 - e);
      violet.position.x = -4 + Math.sin(t * 0.5) * 1.5; pink.position.y = -3 + Math.cos(t * 0.4) * 1.5;
      place(labelTop, 1.2 * sc); place(labelBottom, -1.2 * sc);
      renderer.render(scene, camera);
      if (!ready) { ready = true; root.classList.add('three-ready'); }
    }
    function go() { if (!running && !document.hidden && root.classList.contains('has-3d')) { running = true; raf = requestAnimationFrame(frame); } }
    function stop() { running = false; cancelAnimationFrame(raf); }
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) { if (en[0].isIntersecting) go(); else stop(); }).observe(hero);
    } else go();
    document.addEventListener('visibilitychange', function () { if (document.hidden) stop(); else if (root.classList.contains('has-3d')) { measure(); if (hero.getBoundingClientRect().bottom > 0) go(); } });
    // Animations switched off: stop rendering and fall back to the static hero.
    window.addEventListener('sl:motion', function (e) { if (e.detail.off) { stop(); fail(); } });
  }
})();
