/* SECOND LAYER — shared behaviour: nav, theme and motion switches, footer, audit popup,
   free business check, pricing and forms. Content comes from content.js. */
(function () {
  'use strict';
  var SL = window.SL, d = document, w = window, root = d.documentElement;
  var $ = function (s, r) { return (r || d).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || d).querySelectorAll(s)); };
  var page = d.body.getAttribute('data-page') || '';
  var finePointer = w.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  function motionOff() { return root.classList.contains('motion-off'); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function track(name, props) { try { if (w.plausible) w.plausible(name, { props: props || {} }); } catch (e) {} }

  /* Logo path data, taken from the supplied logo files (not redrawn). */
  var LOGO = w.SL_LOGO = {
    s: 'M160.9 110.8V112.6H129.85V112.0Q129.85 107.5 126.55 104.5Q123.25 101.5 116.5 101.5Q109.9 101.5 106.375 103.45Q102.85 105.4 102.85 108.25Q102.85 112.3 107.65 114.25Q112.45 116.2 123.1 118.3Q135.55 120.85 143.575 123.625Q151.6 126.4 157.6 132.7Q163.6 139.0 163.75 149.8Q163.75 168.1 151.375 176.95Q139.0 185.8 118.3 185.8Q94.15 185.8 80.725 177.7Q67.3 169.6 67.3 149.05H98.65Q98.65 156.85 102.7 159.475Q106.75 162.1 115.3 162.1Q121.6 162.1 125.725 160.75Q129.85 159.4 129.85 155.2Q129.85 151.45 125.275 149.575Q120.7 147.7 110.35 145.6Q97.75 142.9 89.5 139.975Q81.25 137.05 75.1 130.3Q68.95 123.55 68.95 112.0Q68.95 95.05 82.075 87.025Q95.2 79.0 115.3 79.0Q135.1 79.0 147.85 87.025Q160.6 95.05 160.9 110.8Z',
    l: 'M218.075 104.8H251.225V181.6H304.175V208.0H218.075Z'
  };

  /* ---------- Icons ---------- */
  function ic(paths) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + paths + '</svg>'; }
  var I = {
    arrow: ic('<path d="M5 12h14M13 6l6 6-6 6"/>'),
    down: ic('<path d="M12 5v14M6 13l6 6 6-6"/>'),
    check: ic('<path d="M5 12.5l4.5 4.5L19 7.5"/>'),
    x: ic('<path d="M6 6l12 12M18 6L6 18"/>'),
    back: ic('<path d="M19 12H5M11 6l-6 6 6 6"/>'),
    globe: ic('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.8 3 2.8 15 0 18M12 3c-2.8 3-2.8 15 0 18"/>'),
    calendar: ic('<rect x="3.5" y="5" width="17" height="15" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4M8.5 14.5l2.2 2.2 4.3-4.3"/>'),
    bolt: ic('<path d="M13 3L5 13.5h6L10 21l8-10.5h-6L13 3z"/>'),
    pin: ic('<path d="M12 21s7-6.2 7-11.5a7 7 0 10-14 0C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>'),
    moon: ic('<path d="M20 14.5A8 8 0 019.5 4a8 8 0 1010.5 10.5z"/>'),
    sun: ic('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'),
    gauge: ic('<path d="M4 16a8 8 0 1116 0"/><path d="M12 16l4-5"/><circle cx="12" cy="16" r="1.2"/>'),
    star: ic('<path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1.1 5.8L12 16.8 6.7 19.6l1.1-5.8L3.5 9.7l5.9-.8L12 3.5z"/>'),
    repeat: ic('<path d="M4 11V9a3 3 0 013-3h11l-3-3M20 13v2a3 3 0 01-3 3H6l3 3"/>'),
    clock: ic('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
    search: ic('<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>'),
    mail: ic('<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M4 7.5l8 6 8-6"/>'),
    insta: ic('<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17" cy="7" r="0.6" fill="currentColor"/>'),
    chat: ic('<path d="M20 11.5a8 8 0 01-11.8 7L4 20l1.5-4A8 8 0 1120 11.5z"/>'),
    spark: ic('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18"/>'),
    layers: ic('<path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5"/>'),
    tag: ic('<path d="M3 12V4h8l10 10-8 8L3 12z"/><circle cx="7.5" cy="8.5" r="1.2"/>'),
    bell: ic('<path d="M6 16V11a6 6 0 1112 0v5l1.5 2h-15L6 16z"/><path d="M10 20a2 2 0 004 0"/>'),
    nfc: ic('<path d="M7 8.5a5 5 0 010 7M11 6a9 9 0 010 12M15 3.5a13 13 0 010 17"/>'),
    motion: ic('<path d="M3 12h4l3-7 4 14 3-7h4"/>')
  };

  /* ---------- Region and prices ---------- */
  var region = store.get('sl_region');
  if (region !== 'in' && region !== 'intl') {
    var tz = '';
    try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) {}
    region = (!tz || /Kolkata|Calcutta/.test(tz)) ? 'in' : 'intl';
  }
  function money(p) {
    return region === 'in' ? '₹' + Number(p.in).toLocaleString('en-IN') : '$' + Number(p.intl).toLocaleString('en-US');
  }
  function priceTag(p) { return '<b data-price="' + esc(JSON.stringify(p)) + '">' + money(p) + '</b>'; }
  function updatePrices() {
    $$('[data-price]').forEach(function (el) { el.textContent = money(JSON.parse(el.getAttribute('data-price'))); });
    $$('.region').forEach(function (sw) {
      var active;
      $$('button', sw).forEach(function (b) {
        var on = b.getAttribute('data-region') === region;
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
        if (on) active = b;
      });
      var pill = $('.pill', sw);
      if (active && pill) { pill.style.width = active.offsetWidth + 'px'; pill.style.transform = 'translateX(' + (active.offsetLeft - 5) + 'px)'; }
      var sub = sw.parentNode.querySelector('.region-sub');
      if (sub) sub.textContent = SL.regions[region].sub;
    });
    $$('[data-check-total]').forEach(function (el) { el.textContent = money(JSON.parse(el.getAttribute('data-check-total'))); });
  }
  function serviceById(id) { for (var i = 0; i < SL.services.length; i++) if (SL.services[i].id === id) return SL.services[i]; return null; }

  /* ---------- Shared pieces ---------- */
  /* Responsive local photo: the browser picks the smallest file that fits the screen. */
  function photo(name, alt, sizes, eager) {
    var b = '/assets/img/photos/' + name + '-';
    return '<img src="' + b + '800.webp" srcset="' + b + '480.webp 480w, ' + b + '800.webp 800w, ' + b + '1200.webp 1200w" sizes="' + (sizes || '(min-width: 960px) 50vw, 100vw') + '" alt="' + esc(alt || '') + '" ' + (eager ? 'fetchpriority="high"' : 'loading="lazy"') + ' decoding="async" width="800" height="600">';
  }
  /* A realistic Google review NFC card, drawn in HTML so it stays sharp and light. */
  var GOOGLE_G = '<svg class="g-logo" viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.6 5.4 2.7 13.3l7.9 6.1C12.5 13.6 17.8 9.5 24 9.5z"/><path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.4c-.5 2.9-2.2 5.3-4.6 6.9l7.5 5.8c4.4-4 6.8-10 6.8-17.2z"/><path fill="#FBBC05" d="M10.6 28.6c-.5-1.4-.8-2.9-.8-4.6s.3-3.2.8-4.6l-7.9-6.1C1 16.6 0 20.2 0 24s1 7.4 2.7 10.7l7.9-6.1z"/><path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.9 2.3-8.4 2.3-6.2 0-11.5-4.1-13.4-9.9l-7.9 6.1C6.6 42.6 14.6 48 24 48z"/></svg>';
  function nfcCard(extraClass) {
    var qr = '';
    // A fixed, decorative QR-style pattern (not a real code).
    var bits = '1111111010110111111110000010011001000001101110101100101011101101110100111010111011011101011010101110110000010110001000001111111010101011111110000000011011000000001101101110110011010110010111001101001111011100110011010011000110101101011111001100000000101110010110011111111011010011011100000101100101111010101110101011100110001011101001100101001001011101010110101101000001010010011010011111111010110011011000';
    for (var i = 0; i < 400; i++) if (bits.charAt(i) === '1') qr += '<rect x="' + (i % 20) + '" y="' + Math.floor(i / 20) + '" width="1" height="1"/>';
    return '<div class="nfc-real ' + (extraClass || '') + '" role="img" aria-label="Second Layer tap-to-review NFC card with the Google logo, five stars and a QR code">' +
      '<div class="nfc-face"><div class="nfc-top">' + GOOGLE_G + '<span class="nfc-tap">' + I.nfc + '</span></div>' +
      '<p class="nfc-title">Review us on Google</p><p class="nfc-stars" aria-hidden="true">&#9733;&#9733;&#9733;&#9733;&#9733;</p>' +
      '<div class="nfc-foot"><span>Tap your phone here<small>or scan the code</small></span><svg class="nfc-qr" viewBox="-1 -1 22 22" aria-hidden="true"><rect x="-1" y="-1" width="22" height="22" fill="#fff"/><g fill="#111">' + qr + '</g></svg></div></div></div>';
  }
  function contactLinks() {
    var c = SL.contact, out = '';
    if (c.whatsapp) out += '<a href="' + waLink('Hi Second Layer, I would like to know more.') + '" target="_blank" rel="noopener" data-track="whatsapp_click">' + I.chat + 'WhatsApp</a>';
    out += '<a href="mailto:' + esc(c.email) + '">' + I.mail + esc(c.email) + '</a>';
    out += '<a href="' + esc(c.instagram) + '" target="_blank" rel="noopener">' + I.insta + esc(c.instagramHandle) + '</a>';
    return out;
  }
  function waLink(text) { return 'https://wa.me/' + SL.contact.whatsapp + '?text=' + encodeURIComponent(text); }

  /* ---------- Renderers (fill [data-render] blocks from content.js) ---------- */
  var R = {};

  /* Problems: a switch flips every card from "without" to "with a second layer". */
  R.problems = function (el) {
    el.innerHTML = '<div class="switch-wrap"><button class="layer-switch" role="switch" aria-checked="false"><span class="ls-label off">Without</span><span class="ls-track"><span class="ls-knob"><img src="/assets/img/favicon.svg" alt="" width="22" height="22"></span></span><span class="ls-label on">With a second layer</span></button><p class="switch-hint">Tap the switch, or tap any card</p></div>' +
      '<div class="flip-grid grid c3">' + SL.problems.map(function (p) {
        return '<button class="flip" aria-pressed="false"><span class="flip-inner"><span class="flip-face front"><span class="flip-tag">Without</span><span class="icon-chip">' + I[p.icon] + '</span><strong>' + esc(p.title) + '</strong><span class="flip-text">' + esc(p.text) + '</span></span>' +
          '<span class="flip-face back"><span class="flip-tag">With a second layer</span><span class="icon-chip">' + I.check + '</span><strong>' + esc(p.fixTitle) + '</strong><span class="flip-text">' + esc(p.fix) + '</span></span></span></button>';
      }).join('') + '</div>';
    var sw = $('.layer-switch', el), cards = $$('.flip', el);
    function flip(c, on, delay) { c.style.setProperty('--f', delay + 's'); c.classList.toggle('flipped', on); c.setAttribute('aria-pressed', on ? 'true' : 'false'); }
    sw.addEventListener('click', function () {
      var on = sw.getAttribute('aria-checked') !== 'true';
      sw.setAttribute('aria-checked', on ? 'true' : 'false');
      cards.forEach(function (c, i) { flip(c, on, motionOff() ? 0 : i * 0.08); });
      track('layer_switch');
    });
    cards.forEach(function (c) { c.addEventListener('click', function () { flip(c, !c.classList.contains('flipped'), 0); }); });
  };

  /* Free business check: six questions, a score, the gaps and a starting estimate. */
  R.check = function (el) {
    var Q = SL.check, answers = [], step = 0;
    el.classList.add('check');
    function render() {
      if (step < Q.length) {
        el.innerHTML = '<div class="check-top"><span class="check-count">Question ' + (step + 1) + ' of ' + Q.length + '</span>' +
          (step ? '<button type="button" class="check-back" data-back>' + I.back + 'Back</button>' : '') + '</div>' +
          '<div class="check-bar" aria-hidden="true"><i style="width:' + Math.round(step / Q.length * 100) + '%"></i></div>' +
          '<p class="check-q" id="check-q" tabindex="-1">' + esc(Q[step].q) + '</p>' +
          '<div class="check-answers" role="group" aria-labelledby="check-q"><button type="button" data-a="yes">Yes</button><button type="button" data-a="no">No</button><button type="button" data-a="unsure">Not sure</button></div>';
        return;
      }
      var yes = answers.filter(function (a) { return a === 'yes'; }).length;
      var need = [], gaps = [];
      Q.forEach(function (q, i) {
        if (answers[i] === 'yes') return;
        gaps.push(q);
        if (need.indexOf(q.fix) < 0) need.push(q.fix);
      });
      var total = { in: 0, intl: 0 };
      need.forEach(function (id) { var s = serviceById(id); total.in += s.from.in; total.intl += s.from.intl; });
      var verdict = yes === Q.length ? 'Your business is in good shape online.' : yes >= 4 ? 'Good, with a few gaps to close.' : yes >= 2 ? 'You are likely losing customers online.' : 'Big gaps: customers are slipping through.';
      var pct = yes / Q.length, C = 2 * Math.PI * 34;
      var interest = 'Business check ' + yes + '/' + Q.length + (need.length ? '. Needs: ' + need.map(function (id) { return serviceById(id).name; }).join(', ') : '');
      el.innerHTML = '<div class="check-result"><div class="score"><svg viewBox="0 0 80 80" aria-hidden="true"><circle cx="40" cy="40" r="34" class="score-bg"/><circle cx="40" cy="40" r="34" class="score-fg" style="stroke-dasharray:' + C.toFixed(1) + ';stroke-dashoffset:' + (C * (1 - pct)).toFixed(1) + '"/></svg><b>' + yes + '<small>/' + Q.length + '</small></b></div>' +
        '<div><p class="check-count">Your result</p><h3 class="check-verdict" tabindex="-1">' + esc(verdict) + '</h3></div></div>' +
        (gaps.length ? '<p class="check-sub">Where customers may be slipping away</p><ul class="gap-list">' + gaps.map(function (g) {
          return '<li>' + I.x + '<span>' + esc(g.gap) + '<small>Fix: ' + esc(serviceById(g.fix).name) + '</small></span></li>';
        }).join('') + '</ul>' +
          '<div class="estimate"><div><p class="check-sub" style="margin:0">Starting estimate for these fixes</p><b data-check-total="' + esc(JSON.stringify(total)) + '">' + money(total) + '</b><small>Final quote after your free audit.</small></div></div>'
          : '<p class="check-sub">Nothing obvious is missing. A free audit can confirm it and spot smaller gaps.</p>') +
        '<div class="check-actions"><button class="btn btn-coral" data-open-audit data-interest="' + esc(interest) + '">Get my free audit' + I.arrow + '</button><button type="button" class="check-again" data-restart>Start again</button></div>';
      track('business_check_done', { score: yes });
    }
    el.addEventListener('click', function (e) {
      var a = e.target.closest('[data-a]');
      if (a) { answers[step] = a.getAttribute('data-a'); step++; render(); var f = $('.check-q, .check-verdict', el); if (f) f.focus({ preventScroll: true }); return; }
      if (e.target.closest('[data-back]')) { step = Math.max(0, step - 1); render(); return; }
      if (e.target.closest('[data-restart]')) { answers = []; step = 0; render(); }
    });
    render();
  };

  /* Chat demo the visitor can actually use. */
  R.chat = function (el) {
    var sets = {
      start: [['Book a slot', 'book'], ['What are your timings?', 'time'], ['Where are you?', 'where'], ['Show me prices', 'price']],
      slots: [['11:00 am', 'slot'], ['2:30 pm', 'slot'], ['5:00 pm', 'slot']],
      done: [['Start again', 'reset']]
    };
    var replies = {
      book: ['Sure. Tomorrow we have 11:00 am, 2:30 pm and 5:00 pm. Which one works?', 'slots'],
      time: ['We are open 10 am to 9 pm, Monday to Saturday. Want to book a slot?', 'start'],
      where: ['We are on Main Road, opposite City Mall. I have sent you the map link.', 'start'],
      price: ['Here is our full price list. Haircuts, colour and spa are all on it. Want to book a slot?', 'start']
    };
    var hello = 'Hi! This is the auto-reply for Your Salon. How can I help?';
    el.innerHTML = '<div class="phone"><div class="phone-screen"><div class="chat-head"><i></i><div>Your Salon<small>Auto-reply is on</small></div></div><div class="chat-body" aria-live="polite"></div><div class="chat-chips"></div></div></div>';
    var body = $('.chat-body', el), chips = $('.chat-chips', el), busy = false;
    function add(text, who) {
      var b = d.createElement('div'); b.className = 'bubble ' + who; b.textContent = text; body.appendChild(b);
      body.scrollTop = body.scrollHeight;
      return b;
    }
    function offer(name) {
      chips.innerHTML = sets[name].map(function (c) { return '<button type="button" data-k="' + c[1] + '">' + esc(c[0]) + '</button>'; }).join('');
    }
    function reset() { body.innerHTML = ''; add(hello, 'us'); offer('start'); }
    chips.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b || busy) return;
      var k = b.getAttribute('data-k'), label = b.textContent;
      if (k === 'reset') { reset(); return; }
      busy = true; chips.innerHTML = ''; add(label, 'them'); track('chat_demo', { choice: k });
      var typing = add('', 'us typing'); typing.innerHTML = '<i></i><i></i><i></i>';
      setTimeout(function () {
        typing.remove();
        if (k === 'slot') { add('Booked for tomorrow, ' + label + '. We will send a reminder one hour before.', 'us'); offer('done'); }
        else { add(replies[k][0], 'us'); offer(replies[k][1]); }
        busy = false;
      }, motionOff() ? 0 : 800);
    });
    reset();
  };

  R.nfc = function (el) {
    el.innerHTML = nfcCard('tilt');
    el.addEventListener('click', function () { el.classList.remove('tapped'); void el.offsetWidth; el.classList.add('tapped'); track('nfc_demo'); });
  };

  R.industries = function (el) {
    var tabs = SL.industries.map(function (x, i) {
      return '<button class="tab" role="tab" id="tab-' + x.id + '" aria-controls="industry-panel" aria-selected="' + (i === 0) + '" data-i="' + i + '">' + esc(x.label) + '</button>';
    }).join('');
    el.innerHTML = '<div class="tabs" role="tablist" aria-label="Choose your business type">' + tabs + '</div><div class="card industry-panel" id="industry-panel" role="tabpanel"></div>';
    var panel = $('#industry-panel', el);
    function show(i) {
      var x = SL.industries[i];
      panel.innerHTML = '<div class="ind-photo photo">' + photo(x.img, x.alt, '(min-width: 960px) 45vw, 100vw') + '<span class="photo-label">' + esc(x.label) + '</span></div>' +
        '<div class="ind-body"><h3>' + esc(x.headline) + '</h3><ul class="check-list">' + x.points.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') + '</ul>' +
        '<div class="suggest"><div><small>A good place to start</small><strong>' + esc(x.suggest) + '</strong></div><button class="btn btn-ghost" data-open-audit data-interest="' + esc(x.label + ': ' + x.suggest) + '">Free audit for my ' + esc(x.label.split(' / ')[0].toLowerCase()) + I.arrow + '</button></div></div>';
      panel.setAttribute('aria-labelledby', 'tab-' + x.id);
      $$('.tab', el).forEach(function (t, j) { t.setAttribute('aria-selected', j === i ? 'true' : 'false'); });
    }
    el.addEventListener('click', function (e) {
      var t = e.target.closest('.tab');
      if (t) { show(+t.getAttribute('data-i')); track('industry_selected', { type: t.textContent }); }
    });
    show(0);
  };

  R['service-cards'] = function (el) {
    el.className += ' svc-rail';
    el.innerHTML = SL.services.map(function (s, i) {
      return '<a class="card service-card" href="/services#' + s.id + '"><div class="photo">' + photo(s.img, s.imgAlt, '(min-width: 1120px) 25vw, (min-width: 640px) 46vw, 82vw') + '<span class="photo-num">0' + (i + 1) + '</span></div>' +
        '<div class="sc-body"><div class="outcome">' + esc(s.outcome) + '</div><h3>' + esc(s.name) + '</h3><p>' + esc(s.summary) + '</p>' +
        '<div class="foot"><span class="link-arrow">Learn more' + I.arrow + '</span></div></div></a>';
    }).join('');
  };

  R['service-detail'] = function (el) {
    el.innerHTML = SL.services.map(function (s, i) {
      var front = s.nfc ? '<div class="front nfc-front">' + nfcCard('tilt') + '</div>'
        : '<div class="front chip-front"><span class="note-icon">' + I.bell + '</span><span><b>' + esc(s.chip.title) + '</b><small>' + esc(s.chip.text) + '</small></span></div>';
      return '<article class="svc" id="' + s.id + '">' +
        '<div class="svc-visual"><div class="svc-photo photo">' + photo(s.img, s.imgAlt, '(min-width: 960px) 45vw, 100vw') + '</div>' + front + '</div>' +
        '<div class="svc-body"><p class="svc-num">0' + (i + 1) + '</p><h2>' + esc(s.name) + '</h2><p class="outcome">' + esc(s.outcome) + '</p><p class="desc">' + esc(s.description) + '</p>' +
        '<ul class="check-list">' + s.includes.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' +
        '<div class="detail-foot"><a class="btn btn-ghost" href="/pricing#plan-' + s.id + '">See what\'s included' + I.arrow + '</a></div></div></article>';
    }).join('');
  };

  R.steps = function (el) {
    el.innerHTML = '<div class="timeline" data-timeline><span class="tl-line"><i></i></span>' + SL.steps.map(function (s, i) {
      return '<div class="tl-step"><span class="tl-dot">' + (i + 1) + '</span><h3>' + esc(s.title) + '</h3><p>' + esc(s.text) + '</p></div>';
    }).join('') + '</div><p class="delivery">' + I.clock + '<span>' + esc(SL.delivery) + '</span></p>';
  };

  R.region = function (el) {
    el.className += ' region-wrap';
    el.innerHTML = '<div class="region" role="group" aria-label="Choose your region"><span class="pill"></span>' +
      Object.keys(SL.regions).map(function (k) { return '<button type="button" data-region="' + k + '">' + esc(SL.regions[k].label) + '</button>'; }).join('') + '</div><p class="region-sub"></p>';
  };

  /* Pricing page: one full card per service, every included item listed. */
  R.plans = function (el) {
    el.className += ' plans';
    el.innerHTML = SL.plans.map(function (p, i) {
      return '<article class="card plan" id="plan-' + p.service + '"><p class="plan-num">0' + (i + 1) + '</p><h3>' + esc(p.name) + '</h3>' +
        '<div class="price"><small>Starting from</small>' + priceTag(p.price) + '<span class="per">' + esc(p.per) + '</span></div>' +
        '<p class="best">' + esc(p.desc) + '</p>' +
        '<p class="inc-title">What\'s included</p><ul class="inc">' + p.includes.map(function (x) { return '<li>' + I.check + '<span>' + esc(x) + '</span></li>'; }).join('') + '</ul>' +
        '<p class="best-for"><b>Best for:</b> ' + esc(p.bestFor) + '</p>' +
        '<button class="btn btn-ghost btn-block" data-open-audit data-interest="' + esc(p.name) + '">' + esc(p.cta) + I.arrow + '</button></article>';
    }).join('');
  };

  /* Home page: compact price tiles that link to the full pricing page. */
  R['price-tiles'] = function (el) {
    el.className += ' price-tiles';
    el.innerHTML = SL.plans.map(function (p) {
      var s = serviceById(p.service);
      return '<a class="card price-tile" href="/pricing#plan-' + p.service + '"><span class="icon-chip">' + I[s.icon] + '</span><h3>' + esc(p.name) + '</h3><p>' + esc(s.summary) + '</p>' +
        '<div class="from">Starting from' + priceTag(p.price) + '</div><span class="link-arrow">What\'s included' + I.arrow + '</span></a>';
    }).join('');
  };

  R['price-notes'] = function (el) {
    el.innerHTML = '<div class="card notes-card"><h3>' + esc(SL.priceNotesTitle) + '</h3><ul class="notes">' + SL.priceNotes.map(function (n) { return '<li>' + esc(n) + '</li>'; }).join('') + '</ul></div>';
  };
  R.banner = function (el) {
    if (!SL.flags.foundingOffer) { el.remove(); return; }
    el.innerHTML = '<div class="banner">' + I.star + '<span>' + esc(SL.foundingOffer) + '</span></div>';
  };
  R.faq = function (el) {
    el.innerHTML = '<div class="faq">' + SL.faq.map(function (f, i) { return '<details><summary><span class="faq-n">0' + (i + 1) + '</span>' + esc(f.q) + '</summary><p>' + esc(f.a) + '</p></details>'; }).join('') + '</div>';
  };
  R.cta = function (el) {
    var h = el.getAttribute('data-heading') || 'Want to know where your business is <span class="hl">losing customers</span>?';
    var p = el.getAttribute('data-text') || 'We\'ll check your Google profile and website for free and tell you what we find.';
    el.innerHTML = '<div class="cta-band"><span class="eyebrow">Free business audit</span><h2>' + h + '</h2><p>' + esc(p) + '</p><button class="btn btn-coral" data-open-audit>Get my free audit' + I.arrow + '</button><div class="cta-alt">' + contactLinks() + '</div></div>';
  };
  R['audit-form'] = function (el) { el.innerHTML = formHTML('inline', { full: true }); };
  R['contact-ways'] = function (el) {
    var c = SL.contact, out = '';
    out += '<a class="card contact-way" href="mailto:' + esc(c.email) + '"><div class="icon-chip">' + I.mail + '</div><div><small>Email</small><b>' + esc(c.email) + '</b></div></a>';
    out += '<a class="card contact-way" href="' + esc(c.instagram) + '" target="_blank" rel="noopener"><div class="icon-chip">' + I.insta + '</div><div><small>Instagram</small><b>' + esc(c.instagramHandle) + '</b></div></a>';
    if (c.whatsapp) out += '<a class="card contact-way" href="' + waLink('Hi Second Layer, I would like to know more.') + '" target="_blank" rel="noopener" data-track="whatsapp_click"><div class="icon-chip">' + I.chat + '</div><div><small>WhatsApp</small><b>Chat with us</b></div></a>';
    el.innerHTML = '<div class="grid">' + out + '</div>';
  };

  /* ---------- Audit form ---------- */
  function formHTML(uid, o) {
    var f = function (name, label, attrs, err) {
      return '<div class="field"><label for="' + uid + '-' + name + '">' + label + '</label><input id="' + uid + '-' + name + '" name="' + name + '" ' + attrs + '><span class="err">' + err + '</span></div>';
    };
    var h = '<form class="form audit-form" novalidate>';
    h += '<div class="two">' +
      '<div class="field"><label for="' + uid + '-name">Your name</label><input id="' + uid + '-name" name="name" autocomplete="name" required><span class="err">Please add your name.</span></div>' +
      '<div class="field"><label for="' + uid + '-business">Business name</label><input id="' + uid + '-business" name="business" autocomplete="organization" required><span class="err">Please add your business name.</span></div></div>';
    h += '<div class="field"><label for="' + uid + '-type">Business type</label><select id="' + uid + '-type" name="type" required><option value="">Select one</option>' +
      SL.businessTypes.map(function (t) { return '<option>' + esc(t) + '</option>'; }).join('') + '</select><span class="err">Please choose a business type.</span></div>';
    if (o.full) h += f('city', 'City', 'autocomplete="address-level2"', '');
    h += f('contact', 'WhatsApp number or email', 'autocomplete="email" inputmode="email" placeholder="So we can send your audit" required', 'Please add a valid phone number or email.');
    h += '<fieldset class="field"><legend>What should we audit?</legend><div class="choices">' +
      ['Website', 'Google profile', 'Both'].map(function (c) { return '<label><input type="radio" name="audit" value="' + c + '"' + (c === 'Both' ? ' checked' : '') + '><span>' + c + '</span></label>'; }).join('') + '</div></fieldset>';
    if (o.full) h += '<div class="field"><label for="' + uid + '-message">Anything else? (optional)</label><textarea id="' + uid + '-message" name="message"></textarea></div>';
    h += '<input type="hidden" name="interest" value=""><div class="hp" aria-hidden="true"><label>Leave this empty<input name="company_site" tabindex="-1" autocomplete="off"></label></div>';
    h += '<button class="btn btn-coral btn-block" type="submit">Send my free audit request' + I.arrow + '</button>';
    h += '<div class="form-status" role="status"></div>';
    h += '<p class="form-note">The audit is free, with no obligation. We only use your details to send it. <a href="/privacy">Privacy</a></p></form>';
    return h;
  }
  function utm() {
    var out = {};
    try {
      var saved = JSON.parse(sessionStorage.getItem('sl_utm') || '{}'), q = new URLSearchParams(location.search), found = false;
      ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(function (k) { if (q.get(k)) { saved[k] = q.get(k); found = true; } });
      if (found) sessionStorage.setItem('sl_utm', JSON.stringify(saved));
      out = saved;
    } catch (e) {}
    return out;
  }
  utm();
  function submitForm(form) {
    var data = {}, ok = true;
    $$('input, select, textarea', form).forEach(function (el) {
      if (el.type === 'radio') { if (el.checked) data[el.name] = el.value; return; }
      data[el.name] = el.value.trim();
      var field = el.closest('.field');
      if (!field) return;
      var bad = el.required && !data[el.name];
      if (el.name === 'contact' && data.contact) bad = !(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.contact) || data.contact.replace(/\D/g, '').length >= 7);
      field.classList.toggle('bad', bad);
      if (bad && ok) { ok = false; el.focus(); }
    });
    if (!ok) return;
    if (data.company_site) return; // honeypot: silently drop bots
    delete data.company_site;
    data.page = location.pathname; data.region = region; data.utm = utm(); data.sentAt = new Date().toISOString();
    var btn = $('button[type=submit]', form), status = $('.form-status', form), label = btn.innerHTML;
    btn.disabled = true; btn.textContent = 'Sending...';
    function fallback() {
      // No form backend reachable: hand the details to the visitor's email app instead of losing the lead.
      var body = ['Name: ' + data.name, 'Business: ' + data.business, 'Type: ' + data.type, data.city ? 'City: ' + data.city : '', 'Contact: ' + data.contact, 'Audit: ' + data.audit, data.interest ? 'Interested in: ' + data.interest : '', data.message ? 'Message: ' + data.message : ''].filter(Boolean).join('\n');
      var href = 'mailto:' + SL.contact.email + '?subject=' + encodeURIComponent('Free audit request: ' + data.business) + '&body=' + encodeURIComponent(body);
      btn.disabled = false; btn.innerHTML = label;
      status.innerHTML = 'Your email app should open with your details filled in. Press send and we will take it from there. If nothing opens, write to <a href="' + esc(href) + '" style="text-decoration:underline">' + esc(SL.contact.email) + '</a>.';
      status.classList.add('show');
      location.href = href;
    }
    if (!SL.contact.leadEndpoint || location.protocol === 'file:') { fallback(); return; }
    var ctrl = w.AbortController ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, 8000);
    fetch(SL.contact.leadEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data), signal: ctrl ? ctrl.signal : undefined })
      .then(function (r) { clearTimeout(timer); if (!r.ok) throw new Error('bad status'); track('audit_form_sent', { audit: data.audit }); location.href = '/thank-you'; })
      .catch(function () { clearTimeout(timer); fallback(); });
  }
  d.addEventListener('submit', function (e) {
    var form = e.target.closest('.audit-form');
    if (form) { e.preventDefault(); submitForm(form); }
  });

  /* ---------- Theme (light / dark) and motion switches ---------- */
  function themeBtn() {
    return '<button type="button" class="icon-btn theme-btn" data-theme-toggle aria-label="Switch to light mode" title="Light or dark mode">' + '<span class="i-sun">' + I.sun + '</span><span class="i-moon">' + I.moon + '</span></button>';
  }
  function syncSwitches() {
    var light = root.getAttribute('data-theme') === 'light';
    $$('[data-theme-toggle]').forEach(function (b) { b.setAttribute('aria-label', light ? 'Switch to dark mode' : 'Switch to light mode'); });
    var meta = $('meta[name="theme-color"]'); if (meta) meta.setAttribute('content', light ? '#F7F3FF' : '#0D0817');
    $$('[data-motion-toggle]').forEach(function (b) {
      b.setAttribute('aria-pressed', motionOff() ? 'false' : 'true');
      var s = $('.motion-state', b); if (s) s.textContent = motionOff() ? 'Off' : 'On';
    });
  }
  d.addEventListener('click', function (e) {
    if (e.target.closest('[data-theme-toggle]')) {
      var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', next); store.set('sl_theme', next); syncSwitches(); track('theme_switched', { theme: next });
    }
    if (e.target.closest('[data-motion-toggle]')) {
      var off = !motionOff();
      root.classList.toggle('motion-off', off); store.set('sl_motion', off ? 'off' : 'on'); syncSwitches();
      w.dispatchEvent(new CustomEvent('sl:motion', { detail: { off: off } }));
    }
  });

  /* ---------- Nav + footer ---------- */
  var navEl = $('#site-nav');
  if (navEl) {
    navEl.className = 'site-nav';
    navEl.innerHTML = '<div class="container nav-inner"><a class="brand" href="/" aria-label="Second Layer home"><img src="/assets/img/favicon.svg" width="34" height="34" alt=""><span class="wordmark">SECOND LAYER</span></a>' +
      '<nav class="nav-links" id="nav-links" aria-label="Main">' + SL.nav.map(function (n) {
        return '<a href="' + n.href + '"' + (n.page === page ? ' aria-current="page"' : '') + '>' + esc(n.label) + (n.tag ? '<span class="nav-tag">' + esc(n.tag) + '</span>' : '') + '</a>';
      }).join('') + '<div class="nav-contact">' + contactLinks() + '<button type="button" class="motion-btn" data-motion-toggle aria-pressed="true">' + I.motion + 'Animations: <span class="motion-state">On</span></button></div></nav>' +
      '<div class="nav-icons"><a class="icon-btn" href="mailto:' + esc(SL.contact.email) + '" aria-label="Email us">' + I.mail + '</a><a class="icon-btn" href="' + esc(SL.contact.instagram) + '" target="_blank" rel="noopener" aria-label="Instagram">' + I.insta + '</a></div>' +
      themeBtn() +
      '<button class="btn btn-outline btn-sm nav-audit" data-open-audit>Free audit</button>' +
      '<button class="nav-toggle" aria-expanded="false" aria-controls="nav-links" aria-label="Menu"><span></span><span></span><span></span></button></div>';
    var toggle = $('.nav-toggle', navEl);
    toggle.addEventListener('click', function () {
      var open = navEl.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
  var footEl = $('#site-footer');
  if (footEl) {
    footEl.className = 'site-footer';
    footEl.innerHTML = '<div class="container"><div class="foot-top"><div><a class="brand" href="/" aria-label="Second Layer home"><img src="/assets/img/favicon.svg" width="40" height="40" alt="" loading="lazy"><span class="wordmark">SECOND LAYER</span></a><p class="foot-tag">' + esc(SL.tagline) + '</p></div>' +
      '<div class="foot-actions"><button class="btn btn-outline" data-open-audit>Free audit' + I.arrow + '</button>' + contactLinks().replace(/<a /g, '<a class="pill-link" ') + '</div></div>' +
      '<nav class="foot-links" aria-label="Footer">' + SL.nav.map(function (n) { return '<a href="' + n.href + '">' + esc(n.label) + '</a>'; }).join('') + '</nav>' +
      '<div class="foot-base"><span>&copy; ' + new Date().getFullYear() + ' Second Layer. Est. 2026.</span><span class="foot-switches"><button type="button" class="motion-btn" data-motion-toggle aria-pressed="true">' + I.motion + 'Animations: <span class="motion-state">On</span></button><a href="/privacy">Privacy</a></span></div></div>';
  }
  /* Phone dock: app-style bar with the free audit button raised in the middle. */
  var dock = d.createElement('nav');
  dock.className = 'dock';
  dock.setAttribute('aria-label', 'Quick links');
  dock.innerHTML = '<a class="dock-item" href="/services"' + (page === 'services' ? ' aria-current="page"' : '') + '>' + I.layers + '<span>Services</span></a>' +
    '<a class="dock-item" href="/pricing"' + (page === 'pricing' ? ' aria-current="page"' : '') + '>' + I.tag + '<span>Pricing</span></a>' +
    '<button class="dock-main" data-open-audit aria-label="Get a free audit">' + I.search + '<span>Free audit</span></button>' +
    '<a class="dock-item" href="mailto:' + esc(SL.contact.email) + '">' + I.mail + '<span>Email</span></a>' +
    '<a class="dock-item" href="' + esc(SL.contact.instagram) + '" target="_blank" rel="noopener">' + I.insta + '<span>Instagram</span></a>';
  d.body.appendChild(dock);
  if (SL.contact.whatsapp) {
    var wa = d.createElement('a');
    wa.className = 'wa-float'; wa.href = waLink('Hi Second Layer, I would like to know more.'); wa.target = '_blank'; wa.rel = 'noopener';
    wa.setAttribute('aria-label', 'Chat on WhatsApp'); wa.setAttribute('data-track', 'whatsapp_click'); wa.innerHTML = I.chat;
    d.body.appendChild(wa);
  }

  /* ---------- Run renderers ---------- */
  $$('[data-render]').forEach(function (el) { var fn = R[el.getAttribute('data-render')]; if (fn) fn(el); });
  $$('[data-icon]').forEach(function (el) { el.innerHTML = I[el.getAttribute('data-icon')] + el.innerHTML; });
  $$('[data-icon-after]').forEach(function (el) { el.innerHTML += I[el.getAttribute('data-icon-after')]; });
  updatePrices();
  syncSwitches();
  w.addEventListener('load', updatePrices);
  // Links like /services#gbp point at sections drawn by this script, so jump to them once they exist.
  if (location.hash.length > 1) {
    var target = d.getElementById(decodeURIComponent(location.hash.slice(1)));
    var jump = function () { target.scrollIntoView({ behavior: 'instant', block: 'start' }); };
    if (target) { setTimeout(jump, 0); w.addEventListener('load', jump); }
  }

  /* About page: the two layers split apart once, to show the idea. */
  $$('[data-layers]').forEach(function (box) {
    box.addEventListener('click', function () { box.classList.toggle('apart'); });
    if ('IntersectionObserver' in w) {
      var lo = new IntersectionObserver(function (en) { if (en[0].isIntersecting) { lo.disconnect(); setTimeout(function () { box.classList.add('apart'); }, 500); } }, { threshold: 0.5 });
      lo.observe(box);
    } else box.classList.add('apart');
  });

  /* Greeting intro: tap anywhere to skip it. */
  var intro = $('.intro');
  if (intro) intro.addEventListener('click', function () { root.classList.add('intro-done'); });

  d.addEventListener('click', function (e) {
    var b = e.target.closest('.region button');
    if (b) { region = b.getAttribute('data-region'); store.set('sl_region', region); updatePrices(); track('region_switched', { region: region }); }
    var t = e.target.closest('[data-track]');
    if (t) track(t.getAttribute('data-track'));
    var link = e.target.closest('.nav-links a');
    if (link && navEl) navEl.classList.remove('open');
  });

  /* ---------- Audit popup ---------- */
  var modal = d.createElement('div');
  modal.className = 'modal'; modal.id = 'audit-modal'; modal.setAttribute('aria-hidden', 'true');
  modal.innerHTML = '<div class="modal-backdrop" data-close></div><div class="modal-shell"><div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="audit-title">' +
    '<button class="modal-close" data-close aria-label="Close">' + I.x + '</button>' +
    '<div class="modal-top"><div class="modal-art" aria-hidden="true"><svg viewBox="30 -11 306 306"><g class="tile-l"><rect x="176" y="64" width="150" height="180" rx="28" fill="#E7B0F5"/><path d="' + LOGO.l + '" fill="#160F2A"/></g><g class="tile-s"><rect x="31" y="31" width="168" height="198" rx="36" fill="#22173c"/><rect x="40" y="40" width="150" height="180" rx="28" fill="#F4EFFF"/><path d="' + LOGO.s + '" fill="#160F2A"/></g></svg></div>' +
    '<span class="eyebrow">Free &middot; No obligation</span></div>' +
    '<h2 id="audit-title">Get a free <span class="hl">website or Google profile</span> audit</h2>' +
    '<p class="sub">We will show you where your business is losing customers online, and what to fix first.</p>' + formHTML('pop', {}) + '</div></div>';
  d.body.appendChild(modal);
  var lastFocus = null;
  function openModal(interest, auto) {
    if (modal.classList.contains('open')) return;
    lastFocus = d.activeElement;
    $('input[name=interest]', modal).value = interest || '';
    modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false'); d.body.classList.add('locked');
    if (navEl) navEl.classList.remove('open');
    store.set('sl_popup_seen', '1');
    setTimeout(function () { (auto || !finePointer ? $('.modal-close', modal) : $('input[name=name]', modal)).focus(); }, 80);
    track('audit_popup_open', { auto: !!auto });
  }
  function closeModal() {
    modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); d.body.classList.remove('locked');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  modal.addEventListener('click', function (e) { if (e.target.closest('[data-close]')) closeModal(); });
  d.addEventListener('keydown', function (e) {
    if (!modal.classList.contains('open')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'Tab') {
      var f = $$('button, input:not([type=hidden]):not([tabindex="-1"]), select, textarea, a[href]', modal).filter(function (x) { return x.offsetParent !== null; });
      if (!f.length) return;
      if (e.shiftKey && d.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && d.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  });
  d.addEventListener('click', function (e) {
    var b = e.target.closest('[data-open-audit]');
    if (!b) return;
    var interest = b.getAttribute('data-interest') || '', c = SL.contact;
    // Once a WhatsApp number or booking link is set in content.js, service buttons go there directly.
    if (interest && region === 'in' && c.whatsapp) { track('whatsapp_click', { interest: interest }); w.open(waLink('Hi Second Layer, I am interested in: ' + interest), '_blank', 'noopener'); return; }
    if (interest && region === 'intl' && c.bookingLink) { track('call_booking_click', { interest: interest }); w.open(c.bookingLink, '_blank', 'noopener'); return; }
    e.preventDefault();
    openModal(interest, false);
  });
  // Auto-open once per visitor, 8 seconds after the page loads (not while the visitor is busy).
  if (['contact', 'thanks', 'privacy'].indexOf(page) < 0 && !store.get('sl_popup_seen')) {
    setTimeout(function () {
      var a = d.activeElement, busy = a && (/INPUT|TEXTAREA|SELECT/.test(a.tagName) || (a.closest && a.closest('.check')));
      if (!busy && !(navEl && navEl.classList.contains('open'))) openModal('', true);
    }, 8000);
  }

  /* ---------- Scroll: nav state and the "how it works" guide line ---------- */
  var ticking = false, timelines = $$('[data-timeline]');
  function onScroll() {
    ticking = false;
    var y = w.scrollY || w.pageYOffset, vh = w.innerHeight;
    if (navEl) navEl.classList.toggle('scrolled', y > 10);
    // The line fills as you read down the steps: motion that guides the eye.
    timelines.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      var prog = motionOff() ? 1 : Math.min(1, Math.max(0, (vh * 0.8 - r.top) / Math.max(r.height, vh * 0.4)));
      el.style.setProperty('--fill', prog.toFixed(3));
      var steps = el.querySelectorAll('.tl-step');
      for (var i = 0; i < steps.length; i++) steps[i].classList.toggle('on', prog >= (i + 0.1) / steps.length);
    });
  }
  w.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  w.addEventListener('sl:motion', onScroll);
  onScroll();
})();
