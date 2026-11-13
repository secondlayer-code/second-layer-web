/* SECOND LAYER — shared behaviour: nav, footer, audit popup, pricing, forms, motion. */
(function () {
  'use strict';
  var SL = window.SL, d = document, w = window;
  var $ = function (s, r) { return (r || d).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || d).querySelectorAll(s)); };
  var page = d.body.getAttribute('data-page') || '';
  var finePointer = w.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var reduced = w.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
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
    check: ic('<path d="M5 12.5l4.5 4.5L19 7.5"/>'),
    x: ic('<path d="M6 6l12 12M18 6L6 18"/>'),
    globe: ic('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.8 3 2.8 15 0 18M12 3c-2.8 3-2.8 15 0 18"/>'),
    calendar: ic('<rect x="3.5" y="5" width="17" height="15" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4M8.5 14.5l2.2 2.2 4.3-4.3"/>'),
    bolt: ic('<path d="M13 3L5 13.5h6L10 21l8-10.5h-6L13 3z"/>'),
    pin: ic('<path d="M12 21s7-6.2 7-11.5a7 7 0 10-14 0C5 14.800 12 21 12 21z"/><circle cx="12" cy="9.500" r="2.500"/>'),
    moon: ic('<path d="M20 14.500A8 8 0 019.500 4a8 8 0 1010.500 10.500z"/>'),
    gauge: ic('<path d="M4 16a8 8 0 1116 0"/><path d="M12 16l4-5"/><circle cx="12" cy="16" r="1.200"/>'),
    star: ic('<path d="M12 3.500l2.600 5.400 5.900.800-4.300 4.100 1.100 5.800L12 16.800 6.700 19.600l1.100-5.800L3.500 9.700l5.900-.800L12 3.500z"/>'),
    repeat: ic('<path d="M4 11V9a3 3 0 013-3h11l-3-3M20 13v2a3 3 0 01-3 3H6l3 3"/>'),
    clock: ic('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
    search: ic('<circle cx="11" cy="11" r="6.500"/><path d="M16 16l4.500 4.500"/>'),
    mail: ic('<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M4 7.500l8 6 8-6"/>'),
    insta: ic('<rect x="3.500" y="3.500" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17" cy="7" r="0.600" fill="currentColor"/>'),
    chat: ic('<path d="M20 11.500a8 8 0 01-11.800 7L4 20l1.500-4A8 8 0 1120 11.500z"/>'),
    spark: ic('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.500 2.500M15.500 15.500L18 18M18 6l-2.500 2.500M8.500 15.500L6 18"/>'),
    layers: ic('<path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5"/>'),
    tag: ic('<path d="M3 12V4h8l10 10-8 8L3 12z"/><circle cx="7.500" cy="8.500" r="1.200"/>'),
    nfc: ic('<path d="M7 8.500a5 5 0 010 7M11 6a9 9 0 010 12M15 3.500a13 13 0 010 17"/>')
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
  function updatePrices(animate) {
    $$('[data-price]').forEach(function (el) {
      el.textContent = money(JSON.parse(el.getAttribute('data-price')));
      if (animate) { el.classList.remove('price-flip'); void el.offsetWidth; el.classList.add('price-flip'); }
    });
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
  }

  /* ---------- Renderers (fill [data-render] blocks from content.js) ---------- */
  var R = {};
  /* Responsive photo from Unsplash's image CDN: the browser picks the smallest size that fits. */
  function photo(id, alt, sizes) {
    var b = 'https://images.unsplash.com/' + id + '?auto=format&fit=crop&q=70&w=';
    return '<img src="' + b + '800" srcset="' + b + '480 480w, ' + b + '800 800w, ' + b + '1200 1200w" sizes="' + (sizes || '(min-width: 960px) 50vw, 100vw') + '" alt="' + esc(alt || '') + '" loading="lazy" decoding="async" width="800" height="600">';
  }
  /* Problems: a switch flips every card from "without" to "with a second layer". */
  R.problems = function (el) {
    el.innerHTML = '<div class="switch-wrap rv"><button class="layer-switch" role="switch" aria-checked="false" aria-label="Switch the second layer on or off"><span class="ls-label off">Without</span><span class="ls-track"><span class="ls-knob"><img src="assets/img/favicon.svg" alt="" width="22" height="22"></span></span><span class="ls-label on">With a second layer</span></button><p class="switch-hint">Tap the switch, or tap any card</p></div>' +
      '<div class="flip-grid grid c3">' + SL.problems.map(function (p, i) {
        return '<button class="flip rv" aria-pressed="false" style="--d:' + (i % 3) * 0.08 + 's"><span class="flip-inner"><span class="flip-face front"><span class="flip-tag">Without</span><span class="icon-chip">' + I[p.icon] + '</span><strong>' + esc(p.title) + '</strong><span class="flip-text">' + esc(p.text) + '</span></span>' +
          '<span class="flip-face back"><span class="flip-tag">With a second layer</span><span class="icon-chip">' + I.check + '</span><strong>' + esc(p.fixTitle) + '</strong><span class="flip-text">' + esc(p.fix) + '</span></span></span></button>';
      }).join('') + '</div>';
    var sw = $('.layer-switch', el), cards = $$('.flip', el), touched = false;
    function flip(c, on, delay) { c.style.setProperty('--f', delay + 's'); c.classList.toggle('flipped', on); c.setAttribute('aria-pressed', on ? 'true' : 'false'); }
    function setAll(on) { sw.setAttribute('aria-checked', on ? 'true' : 'false'); cards.forEach(function (c, i) { flip(c, on, i * 0.09); }); }
    sw.addEventListener('click', function () { touched = true; setAll(sw.getAttribute('aria-checked') !== 'true'); track('layer_switch'); });
    cards.forEach(function (c) { c.addEventListener('click', function () { touched = true; flip(c, !c.classList.contains('flipped'), 0); }); });
    if ('IntersectionObserver' in w && !reduced) {
      var seen = new IntersectionObserver(function (en) {
        if (en[0].isIntersecting) { seen.disconnect(); setTimeout(function () { if (!touched) setAll(true); }, 1500); }
      }, { threshold: 0.6 });
      seen.observe(cards[0]);
    }
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
      requestAnimationFrame(function () { b.classList.add('show'); body.scrollTop = body.scrollHeight; });
      return b;
    }
    function offer(name) {
      chips.innerHTML = sets[name].map(function (c, i) { return '<button type="button" data-k="' + c[1] + '" style="--i:' + i + '">' + esc(c[0]) + '</button>'; }).join('');
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
      }, reduced ? 0 : 900);
    });
    reset();
  };
  R.industries = function (el) {
    var tabs = SL.industries.map(function (x, i) {
      return '<button class="tab" role="tab" id="tab-' + x.id + '" aria-controls="industry-panel" aria-selected="' + (i === 0) + '" data-i="' + i + '">' + esc(x.label) + '</button>';
    }).join('');
    el.innerHTML = '<div class="tabs rv" role="tablist" aria-label="Choose your business type">' + tabs + '</div><div class="card industry-panel rv" id="industry-panel" role="tabpanel"></div>';
    var panel = $('#industry-panel', el);
    function show(i) {
      var x = SL.industries[i];
      panel.innerHTML = '<div class="ind-photo photo swap">' + photo(x.img, x.label, '(min-width: 960px) 45vw, 100vw') + '<span class="photo-label">' + esc(x.label) + '</span></div>' +
        '<div class="ind-body"><h3 class="swap">' + esc(x.headline) + '</h3><ul class="check-list swap">' + x.points.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') + '</ul>' +
        '<div class="suggest swap"><div><small>A good place to start</small><strong>' + esc(x.suggest) + '</strong></div><button class="btn btn-ghost" data-open-audit data-interest="' + esc(x.label + ': ' + x.suggest) + '">Free audit for my ' + esc(x.label.split(' / ')[0].toLowerCase()) + I.arrow + '</button></div></div>';
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
      return '<a class="card service-card rv" href="services.html#' + s.id + '" style="--d:' + i * 0.08 + 's"><div class="photo">' + photo(s.img, s.imgAlt, '(min-width: 1120px) 25vw, (min-width: 640px) 46vw, 82vw') + '<span class="photo-num">0' + (i + 1) + '</span></div>' +
        '<div class="sc-body"><div class="outcome">' + esc(s.outcome) + '</div><h3>' + esc(s.name) + '</h3><p>' + esc(s.summary) + '</p>' +
        '<div class="foot"><div class="from">Starting from' + priceTag(s.from) + '</div><span class="link-arrow">Details' + I.arrow + '</span></div></div></a>';
    }).join('');
  };
  R['service-detail'] = function (el) {
    el.innerHTML = SL.services.map(function (s, i) {
      return '<article class="svc" id="' + s.id + '">' +
        '<div class="svc-photo photo rv" data-parallax>' + photo(s.img, s.imgAlt, '(min-width: 960px) 45vw, 100vw') + '<span class="photo-num">0' + (i + 1) + '</span></div>' +
        '<div class="svc-body"><div class="rv"><p class="outcome">' + esc(s.outcome) + '</p><h2>' + esc(s.name) + '</h2><p class="desc">' + esc(s.description) + '</p></div>' +
        '<div class="rv"><h4>What you get</h4><ul class="check-list">' + s.includes.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul></div>' +
        '<div class="rv"><h4>What it does for you</h4>' + s.benefits.map(function (x) { return '<div class="benefit">' + I.spark + '<span>' + esc(x) + '</span></div>'; }).join('') + '<p class="ideal" style="margin-top:16px"><b>Ideal for:</b> ' + esc(s.idealFor) + '</p></div>' +
        '<div class="detail-foot rv"><div class="from">Starting from' + priceTag(s.from) + (s.unit ? ' <span>' + esc(s.unit) + '</span>' : '') + '</div><button class="btn btn-ghost" data-open-audit data-interest="' + esc(s.name) + '">Ask about ' + esc(s.name.split(' + ')[0].toLowerCase()) + I.arrow + '</button></div></div></article>';
    }).join('');
  };
  R.steps = function (el) {
    el.innerHTML = '<div class="timeline" data-timeline><span class="tl-line"><i></i></span>' + SL.steps.map(function (s, i) {
      return '<div class="tl-step"><span class="tl-dot">' + (i + 1) + '</span><h3>' + esc(s.title) + '</h3><p>' + esc(s.text) + '</p></div>';
    }).join('') + '</div><p class="delivery rv">' + I.clock.replace('<svg', '<svg style="display:inline;width:15px;height:15px;vertical-align:-2px;margin-right:6px"') + esc(SL.delivery) + '</p>';
  };
  R.region = function (el) {
    el.className += ' region-wrap rv';
    el.innerHTML = '<div class="region" role="group" aria-label="Choose your region"><span class="pill"></span>' +
      Object.keys(SL.regions).map(function (k) { return '<button type="button" data-region="' + k + '">' + esc(SL.regions[k].label) + '</button>'; }).join('') + '</div><p class="region-sub"></p>';
  };
  /* One plan card: price on top, then every included feature listed out. */
  function planCard(p, i, kind) {
    return '<article class="card plan rv' + (p.popular ? ' popular' : '') + '" style="--d:' + (i % 3) * 0.1 + 's">' + (p.popular ? '<span class="badge">Popular</span>' : '') +
      '<h3>' + esc(p.name) + '</h3><p class="best">' + esc(p.desc) + '</p>' +
      '<div class="price"><small>' + (p.fixed ? 'Price' : 'Starts from') + '</small>' + priceTag(p.price) + '<span class="per">' + esc(p.per || '') + '</span></div>' +
      '<p class="inc-title">What\'s included</p><ul class="inc">' + p.includes.map(function (x) { return '<li>' + I.check + '<span>' + esc(x) + '</span></li>'; }).join('') + '</ul>' +
      '<button class="btn ' + (p.popular ? 'btn-coral' : 'btn-ghost') + ' btn-block" data-open-audit data-interest="' + esc(p.name + (kind || '')) + '">' + esc(p.cta || 'Get started') + I.arrow + '</button></article>';
  }
  R.packages = function (el) {
    el.className += ' plans';
    el.innerHTML = SL.packages.map(function (p, i) { return planCard(p, i, ' package'); }).join('');
  };
  /* Pricing page: category tabs, one group of plans at a time. */
  R['pricing-tabs'] = function (el) {
    var groups = [{ id: 'packages', label: 'Packages', title: 'Packages', blurb: 'Most businesses start with one of these. Everything works together from day one.', plans: SL.packages, kind: ' package' }].concat(SL.pricing);
    el.innerHTML = '<div class="tabs ptabs rv" role="tablist" aria-label="Pricing categories">' + groups.map(function (g, i) {
      return '<button class="tab" role="tab" id="ptab-' + g.id + '" aria-controls="ppanel-' + g.id + '" aria-selected="' + (i === 0) + '" data-g="' + g.id + '">' + esc(g.label) + '</button>';
    }).join('') + '</div>' + groups.map(function (g, i) {
      return '<div class="ppanel" id="ppanel-' + g.id + '" role="tabpanel" aria-labelledby="ptab-' + g.id + '"' + (i ? ' hidden' : '') + '><div class="ppanel-head"><h2>' + esc(g.title) + '</h2><p>' + esc(g.blurb) + '</p></div><div class="plans n' + Math.min(g.plans.length, 4) + '">' + g.plans.map(function (p, j) { return planCard(p, j, g.kind); }).join('') + '</div></div>';
    }).join('');
    function show(id, scroll) {
      var found = false;
      $$('.ppanel', el).forEach(function (p) { var on = p.id === 'ppanel-' + id; p.hidden = !on; if (on) { found = true; p.classList.remove('swap'); void p.offsetWidth; p.classList.add('swap'); } });
      if (!found) return;
      $$('.ptabs .tab', el).forEach(function (t) { var on = t.getAttribute('data-g') === id; t.setAttribute('aria-selected', on ? 'true' : 'false'); if (on && t.scrollIntoView && scroll) t.scrollIntoView({ block: 'nearest', inline: 'center' }); });
      // Cards in a newly opened tab are already on screen, so show them straight away.
      $$('#ppanel-' + id + ' .rv', el).forEach(function (c) { c.classList.add('in'); });
      updatePrices(false);
    }
    el.addEventListener('click', function (e) {
      var t = e.target.closest('.ptabs .tab');
      if (t) { show(t.getAttribute('data-g'), true); track('pricing_tab', { tab: t.getAttribute('data-g') }); }
    });
    var hash = location.hash.replace('#', '');
    if (hash) show(hash, true);
  };
  /* Large outlined words scrolling past. */
  R.bigwords = function (el) {
    var row = SL.bigWords.map(function (x, i) { return '<span class="' + (i % 2 ? 'solid' : '') + '">' + esc(x) + '</span>'; }).join('');
    el.className += ' bigwords'; el.setAttribute('aria-hidden', 'true');
    el.innerHTML = '<div class="bigwords-track">' + row + row + '</div>';
  };
  R['price-groups'] = function (el) {
    el.className += ' price-groups';
    var groups = SL.priceGroups.map(function (g) {
      return '<div class="card price-group rv"><h3>' + esc(g.title) + '</h3>' + g.items.map(function (it) {
        return '<div class="price-row"><div class="name">' + esc(it.name) + '<small>' + esc(it.note) + '</small></div><div class="amt"><small>' + (it.fixed ? 'Fixed price' : 'Starting from') + '</small>' + priceTag(it.price) + '</div></div>';
      }).join('') + '</div>';
    }).join('');
    var c = SL.care;
    groups += '<div class="card price-group rv"><h3>Monthly care</h3><div class="price-row"><div class="name">' + esc(c.name) + '<small>' + esc(c.text) + '</small></div><div class="amt"><small>Per month</small>' + priceTag(c.price) + '</div></div></div>';
    el.innerHTML = groups;
  };
  R['price-notes'] = function (el) {
    el.innerHTML = '<ul class="notes rv">' + SL.priceNotes.map(function (n) { return '<li>' + esc(n) + '</li>'; }).join('') + '</ul>';
  };
  R.banner = function (el) {
    if (!SL.flags.foundingOffer) { el.remove(); return; }
    el.innerHTML = '<div class="banner rv">' + I.spark + '<span>' + esc(SL.foundingOffer) + '</span></div>';
  };
  R.faq = function (el) {
    el.innerHTML = '<div class="faq">' + SL.faq.map(function (f, i) { return '<details class="rv"><summary><span class="faq-n">' + (i < 9 ? '0' : '') + (i + 1) + '</span>' + esc(f.q) + '</summary><p>' + esc(f.a) + '</p></details>'; }).join('') + '</div>';
  };
  function contactLinks() {
    var c = SL.contact, out = '';
    if (c.whatsapp) out += '<a href="' + waLink('Hi Second Layer, I would like to know more.') + '" target="_blank" rel="noopener" data-track="whatsapp_click">' + I.chat + 'WhatsApp</a>';
    out += '<a href="mailto:' + esc(c.email) + '">' + I.mail + esc(c.email) + '</a>';
    out += '<a href="' + esc(c.instagram) + '" target="_blank" rel="noopener">' + I.insta + esc(c.instagramHandle) + '</a>';
    return out;
  }
  R.cta = function (el) {
    var h = el.getAttribute('data-heading') || 'Want to know where your business is <span class="hl">losing customers</span>?';
    var p = el.getAttribute('data-text') || 'We\'ll check your Google profile and website for free and tell you what we find.';
    el.innerHTML = '<div class="cta-band rv"><span class="eyebrow">Free audit</span><h2>' + h + '</h2><p>' + esc(p) + '</p><button class="btn btn-coral" data-open-audit>Get my free audit' + I.arrow + '</button><div class="cta-alt">' + contactLinks() + '</div></div>';
  };
  R['audit-form'] = function (el) { el.innerHTML = formHTML('inline', { full: true }); };
  R['contact-ways'] = function (el) {
    var c = SL.contact, out = '';
    out += '<a class="card contact-way rv" href="mailto:' + esc(c.email) + '"><div class="icon-chip">' + I.mail + '</div><div><small>Email</small><b>' + esc(c.email) + '</b></div></a>';
    out += '<a class="card contact-way rv" href="' + esc(c.instagram) + '" target="_blank" rel="noopener"><div class="icon-chip">' + I.insta + '</div><div><small>Instagram</small><b>' + esc(c.instagramHandle) + '</b></div></a>';
    if (c.whatsapp) out += '<a class="card contact-way rv" href="' + waLink('Hi Second Layer, I would like to know more.') + '" target="_blank" rel="noopener" data-track="whatsapp_click"><div class="icon-chip">' + I.chat + '</div><div><small>WhatsApp</small><b>Chat with us</b></div></a>';
    el.innerHTML = '<div class="grid">' + out + '</div>';
  };

  /* ---------- Audit form ---------- */
  function waLink(text) { return 'https://wa.me/' + SL.contact.whatsapp + '?text=' + encodeURIComponent(text); }
  function formHTML(uid, o) {
    var n = 0, i = function () { return ' style="--i:' + (n++) + '"'; };
    var f = function (name, label, attrs, err) {
      return '<div class="field"' + i() + '><label for="' + uid + '-' + name + '">' + label + '</label><input id="' + uid + '-' + name + '" name="' + name + '" ' + attrs + '><span class="err">' + err + '</span></div>';
    };
    var h = '<form class="form audit-form" novalidate>';
    h += '<div class="two"' + i() + '>' +
      '<div class="field"><label for="' + uid + '-name">Your name</label><input id="' + uid + '-name" name="name" autocomplete="name" required><span class="err">Please add your name.</span></div>' +
      '<div class="field"><label for="' + uid + '-business">Business name</label><input id="' + uid + '-business" name="business" autocomplete="organization" required><span class="err">Please add your business name.</span></div></div>';
    h += '<div class="field"' + i() + '><label for="' + uid + '-type">Business type</label><select id="' + uid + '-type" name="type" required><option value="">Select one</option>' +
      SL.businessTypes.map(function (t) { return '<option>' + esc(t) + '</option>'; }).join('') + '</select><span class="err">Please choose a business type.</span></div>';
    if (o.full) h += f('city', 'City', 'autocomplete="address-level2"', '');
    h += f('contact', 'WhatsApp number or email', 'autocomplete="email" inputmode="email" placeholder="So we can send your audit" required', 'Please add a valid phone number or email.');
    h += '<fieldset class="field"' + i() + '><legend>What should we audit?</legend><div class="choices">' +
      ['Website', 'Google profile', 'Both'].map(function (c) { return '<label><input type="radio" name="audit" value="' + c + '"' + (c === 'Both' ? ' checked' : '') + '><span>' + c + '</span></label>'; }).join('') + '</div></fieldset>';
    if (o.full) h += '<div class="field"' + i() + '><label for="' + uid + '-message">Anything else? (optional)</label><textarea id="' + uid + '-message" name="message"></textarea></div>';
    h += '<input type="hidden" name="interest" value=""><div class="hp" aria-hidden="true"><label>Leave this empty<input name="company_site" tabindex="-1" autocomplete="off"></label></div>';
    h += '<button class="btn btn-coral btn-block" type="submit"' + i() + '>Send my free audit request' + I.arrow + '</button>';
    h += '<div class="form-status" role="status"' + i() + '></div>';
    h += '<p class="form-note"' + i() + '>Free, no obligation. We only use your details to send the audit. <a href="privacy.html">Privacy</a></p></form>';
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
      .then(function (r) { clearTimeout(timer); if (!r.ok) throw new Error('bad status'); track('audit_form_sent', { audit: data.audit }); location.href = 'thank-you.html'; })
      .catch(function () { clearTimeout(timer); fallback(); });
  }
  d.addEventListener('submit', function (e) {
    var form = e.target.closest('.audit-form');
    if (form) { e.preventDefault(); submitForm(form); }
  });

  /* ---------- Nav + footer ---------- */
  var navEl = $('#site-nav');
  if (navEl) {
    navEl.className = 'site-nav';
    navEl.innerHTML = '<div class="container nav-inner"><a class="brand" href="index.html" aria-label="Second Layer home"><img src="assets/img/favicon.svg" width="34" height="34" alt=""><span class="wordmark">SECOND LAYER</span></a>' +
      '<nav class="nav-links" id="nav-links" aria-label="Main">' + SL.nav.map(function (n) {
        return '<a href="' + n.href + '"' + (n.page === page ? ' aria-current="page"' : '') + '>' + esc(n.label) + (n.tag ? '<span class="nav-tag">' + esc(n.tag) + '</span>' : '') + '</a>';
      }).join('') + '<div class="nav-contact">' + contactLinks() + '</div></nav>' +
      '<div class="nav-icons"><a class="icon-btn" href="mailto:' + esc(SL.contact.email) + '" aria-label="Email us">' + I.mail + '</a><a class="icon-btn" href="' + esc(SL.contact.instagram) + '" target="_blank" rel="noopener" aria-label="Instagram">' + I.insta + '</a></div>' +
      '<button class="btn btn-outline btn-sm" data-open-audit>Free audit</button>' +
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
    footEl.innerHTML = '<div class="container"><div class="foot-top"><div><a class="brand" href="index.html" aria-label="Second Layer home"><img src="assets/img/favicon.svg" width="40" height="40" alt="" loading="lazy"><span class="wordmark">SECOND LAYER</span></a><p class="foot-tag">' + esc(SL.tagline) + '</p></div>' +
      '<div class="foot-actions"><button class="btn btn-outline" data-open-audit>Free audit' + I.arrow + '</button>' + contactLinks().replace(/<a /g, '<a class="pill-link" ') + '</div></div>' +
      '<nav class="foot-links" aria-label="Footer">' + SL.nav.map(function (n) { return '<a href="' + n.href + '">' + esc(n.label) + '</a>'; }).join('') + '</nav>' +
      '<div class="foot-base"><span>&copy; ' + new Date().getFullYear() + ' Second Layer. Est. 2026.</span><a href="privacy.html">Privacy</a></div></div>';
  }
  /* Phone dock: app-style bar with the free audit button raised in the middle. */
  var actionBar = d.createElement('nav');
  actionBar.className = 'dock';
  actionBar.setAttribute('aria-label', 'Quick links');
  actionBar.innerHTML = '<a class="dock-item" href="services.html"' + (page === 'services' ? ' aria-current="page"' : '') + '>' + I.layers + '<span>Services</span></a>' +
    '<a class="dock-item" href="pricing.html"' + (page === 'pricing' ? ' aria-current="page"' : '') + '>' + I.tag + '<span>Pricing</span></a>' +
    '<button class="dock-main" data-open-audit aria-label="Get a free audit">' + I.spark + '<span>Free audit</span></button>' +
    '<a class="dock-item" href="mailto:' + esc(SL.contact.email) + '">' + I.mail + '<span>Email</span></a>' +
    '<a class="dock-item" href="' + esc(SL.contact.instagram) + '" target="_blank" rel="noopener">' + I.insta + '<span>Instagram</span></a>';
  d.body.appendChild(actionBar);
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
  updatePrices(false);
  w.addEventListener('load', function () { updatePrices(false); });

  /* Headlines rise in word by word. */
  function splitWords(el) {
    var n = 0;
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (c) {
        if (c.nodeType === 3) {
          var frag = d.createDocumentFragment();
          c.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(d.createTextNode(' ')); return; }
            var outer = d.createElement('span'), inner = d.createElement('span');
            outer.className = 'w'; inner.textContent = part; inner.style.setProperty('--w', n++);
            outer.appendChild(inner); frag.appendChild(outer);
          });
          node.replaceChild(frag, c);
        } else if (c.nodeType === 1) walk(c);
      });
    })(el);
    el.classList.add('split');
  }
  if (!reduced) $$('.section-head h2, .page-hero h1').forEach(splitWords);

  /* Small tap interactions. */
  $$('[data-nfc]').forEach(function (box) {
    $('.nfc-card', box).addEventListener('click', function () {
      box.classList.remove('tapped'); void box.offsetWidth; box.classList.add('tapped'); track('nfc_demo');
    });
  });
  $$('[data-layers]').forEach(function (box) {
    box.addEventListener('click', function () { box.classList.toggle('apart'); });
    if ('IntersectionObserver' in w) {
      var lo = new IntersectionObserver(function (en) { if (en[0].isIntersecting) { lo.disconnect(); setTimeout(function () { box.classList.add('apart'); }, 700); } }, { threshold: 0.5 });
      lo.observe(box);
    } else box.classList.add('apart');
  });
  d.addEventListener('click', function (e) {
    var b = e.target.closest('.region button');
    if (b) { region = b.getAttribute('data-region'); store.set('sl_region', region); updatePrices(true); track('region_switched', { region: region }); }
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
    // Once a WhatsApp number or booking link is set in content.js, package buttons go there directly.
    if (interest && region === 'in' && c.whatsapp) { track('whatsapp_click', { interest: interest }); w.open(waLink('Hi Second Layer, I am interested in: ' + interest), '_blank', 'noopener'); return; }
    if (interest && region === 'intl' && c.bookingLink) { track('call_booking_click', { interest: interest }); w.open(c.bookingLink, '_blank', 'noopener'); return; }
    e.preventDefault();
    openModal(interest, false);
  });
  // Auto-open once per visitor, 8 seconds after the page loads.
  if (['contact', 'thanks', 'privacy'].indexOf(page) < 0 && !store.get('sl_popup_seen')) {
    setTimeout(function () {
      var a = d.activeElement, typing = a && /INPUT|TEXTAREA|SELECT/.test(a.tagName);
      if (!typing && !(navEl && navEl.classList.contains('open'))) openModal('', true);
    }, 8000);
  }

  /* ---------- Reveal on scroll ---------- */
  if ('IntersectionObserver' in w && !reduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    $$('.rv').forEach(function (el) { io.observe(el); });
  } else {
    $$('.rv').forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Scroll: nav state + progress bar ---------- */
  var bar = d.createElement('div'); bar.className = 'progress'; d.body.appendChild(bar);
  var ticking = false, parallax = $$('[data-parallax]'), timelines = $$('[data-timeline]'), pending = $$('.rv');
  function onScroll() {
    ticking = false;
    var y = w.scrollY || w.pageYOffset, vh = w.innerHeight, max = d.documentElement.scrollHeight - vh;
    if (navEl) navEl.classList.toggle('scrolled', y > 10);
    bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, y / max) : 0) + ')';
    // Safety net for the scroll reveal: anything on screen is shown even if the observer did not fire.
    if (pending.length) pending = pending.filter(function (el) {
      if (el.classList.contains('in')) return false;
      var r = el.getBoundingClientRect();
      if (r.width && r.top < vh * 0.95 && r.bottom > 0 && r.left < w.innerWidth && r.right > 0) { el.classList.add('in'); return false; }
      return true;
    });
    // Photos drift slightly as they pass through the screen.
    if (!reduced) parallax.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      var img = el.querySelector('img');
      if (img) img.style.transform = 'translateY(' + (((r.top + r.height / 2) - vh / 2) * -0.07).toFixed(1) + 'px) scale(1.16)';
    });
    // The "how it works" line fills as you scroll past it.
    timelines.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      var prog = Math.min(1, Math.max(0, (vh * 0.8 - r.top) / Math.max(r.height, vh * 0.4)));
      el.style.setProperty('--fill', prog.toFixed(3));
      var steps = el.querySelectorAll('.tl-step');
      for (var i = 0; i < steps.length; i++) steps[i].classList.toggle('on', prog >= (i + 0.1) / steps.length);
    });
  }
  // Capture phase, so sideways swipes inside the service rail count as well.
  d.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true, capture: true });
  w.addEventListener('load', onScroll);
  onScroll();

  /* ---------- Desktop-only pointer effects ---------- */
  if (finePointer && !reduced) {
    var glow = d.createElement('div'); glow.className = 'cursor-glow'; d.body.appendChild(glow);
    var gx = 0, gy = 0, tx = 0, ty = 0, moving = false;
    function loop() {
      gx += (tx - gx) * 0.12; gy += (ty - gy) * 0.12;
      glow.style.transform = 'translate3d(' + gx + 'px,' + gy + 'px,0)';
      if (Math.abs(tx - gx) + Math.abs(ty - gy) > 0.5) requestAnimationFrame(loop); else moving = false;
    }
    d.addEventListener('pointermove', function (e) {
      tx = e.clientX; ty = e.clientY; glow.style.opacity = '1';
      if (!moving) { moving = true; requestAnimationFrame(loop); }
      var card = e.target.closest ? e.target.closest('.card') : null;
      if (card) {
        var r = card.getBoundingClientRect(), px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        card.style.setProperty('--mx', px * 100 + '%'); card.style.setProperty('--my', py * 100 + '%');
        if (card.hasAttribute('data-tilt')) card.style.transform = 'perspective(900px) rotateX(' + (0.5 - py) * 6 + 'deg) rotateY(' + (px - 0.5) * 6 + 'deg) translateY(-4px)';
      }
    }, { passive: true });
    d.addEventListener('pointerout', function (e) {
      var card = e.target.closest ? e.target.closest('.card[data-tilt]') : null;
      if (card && !card.contains(e.relatedTarget)) card.style.transform = '';
    }, { passive: true });
  }

  /* ---------- Chat demo: plays when it scrolls into view ---------- */
  $$('[data-chat]').forEach(function (chat) {
    var bubbles = $$('.bubble', chat), timers = [], playing = false;
    if (reduced || !('IntersectionObserver' in w)) { bubbles.forEach(function (b) { b.classList.add('show'); }); return; }
    function play() {
      bubbles.forEach(function (b) { b.classList.remove('show'); });
      bubbles.forEach(function (b, i) { timers.push(setTimeout(function () { b.classList.add('show'); }, 500 + i * 1300)); });
      timers.push(setTimeout(function () { if (playing) play(); }, 500 + bubbles.length * 1300 + 3500));
    }
    new IntersectionObserver(function (en) {
      if (en[0].isIntersecting && !playing) { playing = true; play(); }
      else if (!en[0].isIntersecting && playing) { playing = false; timers.forEach(clearTimeout); timers = []; }
    }, { threshold: 0.4 }).observe(chat);
  });
})();
