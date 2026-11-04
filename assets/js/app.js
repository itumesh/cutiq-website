(function () {
  "use strict";
  var C = window.CUTIQ_CONFIG || {};
  var DATA = window.CUTIQ_SKILLS || { total: 399, categories: [] };
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };
  var inr = function (n) { return Math.round(n).toLocaleString("en-IN"); };
  var short = function (n) { return n >= 1e6 ? (n / 1e6).toFixed(n >= 1e7 ? 1 : 2).replace(/\.?0+$/, "") + "M" : n >= 1e3 ? (n / 1e3).toFixed(n >= 1e5 ? 0 : 1).replace(/\.0$/, "") + "K" : String(Math.round(n)); };
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ================= config ================= */
  $$(".js-price").forEach(function (e) { e.textContent = C.price || 399; });
  $$(".js-total").forEach(function (e) { e.textContent = DATA.total || 399; });
  var wa = C.whatsapp ? "https://wa.me/" + C.whatsapp + "?text=" + encodeURIComponent(C.whatsappText || "") : "";
  var pay = C.paymentUrl || wa || "#pricing";
  $$("[data-pay]").forEach(function (a) { a.href = pay; if (/^https?:/.test(pay)) { a.target = "_blank"; a.rel = "noopener"; } });
  if (wa) $$(".js-wa").forEach(function (a) { a.href = wa; a.hidden = false; });
  if (C.refundPolicy) $$(".js-refund").forEach(function (p) { p.textContent = C.refundPolicy; p.hidden = false; });
  if (C.supportEmail) $$(".js-mail").forEach(function (a) { a.href = "mailto:" + C.supportEmail; a.hidden = false; });
  var yr = $("#yr"); if (yr) yr.textContent = new Date().getFullYear();
  function track(ev, d) { if (window.fbq) window.fbq("track", ev, d || {}); }
  if (C.metaPixelId) {
    !function (f, b, e, v, n, t, s) { if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = []; t = b.createElement(e); t.async = !0; t.src = v;
      s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s); }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    window.fbq("init", C.metaPixelId); window.fbq("track", "PageView");
    track("ViewContent", { content_name: "CutIQ Complete", value: C.price || 399, currency: "INR" });
  }
  $$("[data-pay]").forEach(function (a) { a.addEventListener("click", function () { track("InitiateCheckout", { value: C.price || 399, currency: "INR" }); }); });

  /* ================= hero split text ================= */
  var ci = 0;
  $$(".split").forEach(function (el) {
    var txt = el.textContent; el.textContent = "";
    txt.split(/(\s+)/).forEach(function (part) {
      if (/^\s+$/.test(part)) { el.appendChild(document.createTextNode(" ")); return; }
      var w = document.createElement("span"); w.style.display = "inline-block"; w.style.whiteSpace = "nowrap";
      part.split("").forEach(function (ch) { var s = document.createElement("span"); s.className = "ch"; s.textContent = ch; s.style.animationDelay = (0.15 + ci++ * 0.026) + "s"; w.appendChild(s); });
      el.appendChild(w);
    });
  });

  /* ================= the presenter + reel stage ================= */
  var SKIN = "#e2a882", SKIN2 = "#c98b66", HAIR = "#2a1c15", TEE = "#f0ebe2";
  var PERSON =
    '<svg viewBox="0 0 360 520" aria-hidden="true">' +
    '<rect x="62" y="236" width="236" height="300" rx="46" fill="#2b2420"/>' +
    '<path d="M108 172C98 88 150 48 186 50c50 2 82 44 72 124l10 128c-30 22-140 22-170 0z" fill="' + HAIR + '"/>' +
    '<rect x="160" y="208" width="40" height="66" rx="16" fill="' + SKIN2 + '"/>' +
    '<g class="p-arm2"><path d="M104 318c-26 54-28 120-8 184l34 4c-14-60-10-120 8-176z" fill="' + SKIN + '"/><path d="M100 316c-12 18-18 40-20 62l42 8c4-22 10-42 18-60z" fill="' + TEE + '"/></g>' +
    '<path d="M68 520c0-150 36-244 112-252 76 8 112 102 112 252z" fill="' + TEE + '"/>' +
    '<path d="M154 269q26 34 52 0z" fill="' + SKIN2 + '"/>' +
    '<path d="M180 300v220" stroke="rgba(0,0,0,.05)" stroke-width="40"/>' +
    '<g class="p-arm"><path d="M256 318c26 40 34 92 30 140l-30 4c0-44-8-88-26-124z" fill="' + TEE + '"/>' +
    '<path d="M282 452c-16-28-36-48-58-62l-14 22c20 12 38 30 50 50z" fill="' + SKIN + '"/><ellipse cx="212" cy="384" rx="18" ry="15" fill="' + SKIN + '"/>' +
    '<path d="M200 372l-8-14M210 368l-4-16M220 368l2-15" stroke="' + SKIN + '" stroke-width="7" stroke-linecap="round"/></g>' +
    '<g class="p-head">' +
    '<ellipse cx="124" cy="152" rx="10" ry="16" fill="' + SKIN2 + '"/><ellipse cx="236" cy="152" rx="10" ry="16" fill="' + SKIN2 + '"/>' +
    '<circle cx="124" cy="172" r="3" fill="#e8c46a"/><circle cx="236" cy="172" r="3" fill="#e8c46a"/>' +
    '<ellipse cx="180" cy="148" rx="56" ry="68" fill="' + SKIN + '"/>' +
    '<ellipse cx="150" cy="172" rx="12" ry="7" fill="#e0806a" opacity=".22"/><ellipse cx="210" cy="172" rx="12" ry="7" fill="#e0806a" opacity=".22"/>' +
    '<path d="M122 136c-4-60 38-78 64-76 38 2 60 28 54 76-12-30-36-44-60-42-30 2-48 18-58 42z" fill="' + HAIR + '"/>' +
    '<path d="M124 128c-14 40-14 100-4 162l16-4c-8-58-8-112 2-152z" fill="' + HAIR + '"/><path d="M236 128c14 40 14 100 4 162l-16-4c8-58 8-112-2-152z" fill="' + HAIR + '"/>' +
    '<path d="M148 130q12-7 24 0M188 130q12-7 24 0" stroke="' + HAIR + '" stroke-width="4" fill="none" stroke-linecap="round"/>' +
    '<g class="p-eyes"><ellipse cx="160" cy="148" rx="6" ry="7" fill="' + HAIR + '"/><ellipse cx="200" cy="148" rx="6" ry="7" fill="' + HAIR + '"/>' +
    '<circle cx="162" cy="146" r="1.8" fill="#fff"/><circle cx="202" cy="146" r="1.8" fill="#fff"/></g>' +
    '<path d="M180 156q-5 18 2 22" stroke="' + SKIN2 + '" stroke-width="3" fill="none" stroke-linecap="round"/>' +
    '<g class="p-mouth"><ellipse cx="180" cy="194" rx="13" ry="6" fill="#7a2a2a"/><rect x="170" y="189" width="20" height="3" rx="1.5" fill="#fff" opacity=".85"/></g>' +
    "</g></svg>";
  var THUMBS = [["#d97757", "#7a3420"], ["#4a7fa8", "#1d3550"], ["#6f9a5a", "#2c4a22"], ["#c9a24d", "#6b4d14"], ["#8a6fc9", "#3b2a6a"], ["#c95a7a", "#5a1d33"]];
  var CAPS = [["Ye", "trick", "views", "badha", "degi"], ["Bas", "ek", "prompt", "likho"], ["Edit", "khud", "ho", "jayega"]];
  function stageHTML(ui) {
    var orbit = THUMBS.map(function (t, k) { return '<i style="--a:' + t[0] + ';--b:' + t[1] + ';transform:rotate(' + k * 60 + 'deg);transform-origin:50% 185%"></i>'; }).join("");
    var html =
      '<div class="st-scene"><video class="lady" muted loop playsinline preload="none" poster="assets/media/lady.jpg" data-src="assets/media/lady.mp4"></video>' +
      '<div class="fx fx-behind"><b>Watch</b></div><video class="lady-cut" muted loop playsinline preload="none" data-src="assets/media/lady-cut.webm"></video></div>' +
      '<div class="fx fx-grade"></div>' +
      '<div class="fx fx-glass"><div class="gw gw1"><small>Videos</small><b>36</b><small>this month</small></div>' +
      '<div class="gw gw2"><small>Top reel</small><b class="js-roll" data-to="197000">197K</b><div class="bars"><i style="height:40%"></i><i style="height:65%"></i><i style="height:50%"></i><i style="height:90%"></i><i style="height:75%"></i></div></div>' +
      '<div class="gw gw3"><svg viewBox="0 0 80 80"><circle cx="40" cy="40" r="36"/><circle class="fg" cx="40" cy="40" r="36"/></svg><b>4K</b></div>' +
      '<div class="gw gw4"><small>Edited</small><b>12 min</b></div></div>' +
      '<div class="fx fx-orbit"><div class="orbit">' + orbit + "</div></div>" +
      '<div class="fx fx-timeline"><div class="ep"><small>THE SERIES</small>EP 1</div><div class="tlbar"><i></i><i></i><i></i><em></em></div></div>' +
      '<div class="fx fx-split"><div class="panel"><b>Watch <mark>this</mark> before you scroll.</b><span>@yourchannel</span><div class="mini"><i style="height:35%"></i><i style="height:60%"></i><i style="height:45%"></i><i style="height:100%"></i></div></div></div>' +
      '<div class="fx fx-spotlight"></div>' +
      '<div class="fx fx-check"><div class="check"><h4>Claude is editing your clip <em>live</em></h4><ul>' +
      "<li><span>Found the speaker</span><small>0.4s</small></li><li><span>Removed the pauses</span><small>1.2s</small></li><li><span>Put the title behind you</span><small>2.0s</small></li><li><span>Graded the colour</span><small>2.6s</small></li><li><span>Rendered in 4K</span><small>3.1s</small></li></ul></div></div>" +
      '<div class="fx fx-doc"><div class="grain"></div><span class="doc-date">MUMBAI · 2026</span><div class="doc-lt"><b>Riya Sharma</b>Podcast host, two years in</div><p class="doc-cap">“I almost quit the week it worked.”</p></div>' +
      '<div class="fx fx-caps"><div class="hook"><small>NEW</small><b>1 Prompt =</b><b class="y">Viral Edit 🔥</b></div><p class="caps"></p></div>';
    if (ui) {
      html += '<div class="reel-ui"><div class="bar"><i></i></div><span class="views"><i></i><b class="js-views">0</b> views</span>' +
        '<div class="reel-side"><span class="liked"><svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-9.6-9.3C.8 8 3.2 4.5 6.8 4.5c2 0 3.6 1.1 5.2 3 1.6-1.9 3.2-3 5.2-3 3.6 0 6 3.5 4.4 7.2C19.5 16.4 12 21 12 21z"/></svg><b class="js-likes">0</b></span>' +
        '<span><svg viewBox="0 0 24 24"><path d="M12 3C6.5 3 2 6.9 2 11.6c0 2.4 1.2 4.6 3.2 6.2L4.5 21l4-1.9c1.1.3 2.3.5 3.5.5 5.5 0 10-3.9 10-8.6S17.5 3 12 3z"/></svg><b class="js-comments">0</b></span>' +
        '<span><svg viewBox="0 0 24 24"><path d="M21 3 3 10.5l6.8 2.7L12.5 20 21 3z"/></svg><b class="js-shares">0</b></span></div>' +
        '<div class="reel-bottom"><b>@yourchannel</b><p>Edited with one prompt · #reels #creator</p></div></div>' +
        '<div class="hearts"></div><span class="fx-chip"></span>';
    }
    return html;
  }
  window.CUTIQ_STAGE = stageHTML;
  $$(".stage").forEach(function (st) { st.innerHTML = stageHTML(st.dataset.ui === "1"); });

  /* shared animation clocks: captions + checklist */
  var capLine = 0, capWord = 0;
  function setCaps() { $$(".caps").forEach(function (p) { p.innerHTML = CAPS[capLine].map(function (w) { return "<span>" + w + "</span>"; }).join(" "); }); }
  setCaps();
  setInterval(function () {
    capWord++;
    if (capWord > CAPS[capLine].length + 1) { capWord = 0; capLine = (capLine + 1) % CAPS.length; setCaps(); }
    $$(".caps").forEach(function (p) { $$("span", p).forEach(function (s, i) { s.classList.toggle("on", i === capWord - 1); }); });
  }, 330);
  var chk = 0;
  setInterval(function () { chk = (chk + 1) % 8; $$(".check").forEach(function (c) { $$("li", c).forEach(function (li, i) { li.classList.toggle("done", i < chk); }); }); }, 650);

  /* ================= hero reel: effects cycle + climbing numbers ================= */
  var HERO_FX = [["captions grade", "captions"], ["glass grade", "glass-widgets"], ["spotlight", "spotlight"], ["orbit", "orbit"], ["split", "split-hook"], ["timeline", "timeline"], ["documentary", "documentary"], ["checklist", "checklist"]];
  var heroStage = $("#heroStage"), hi = 0;
  function heroNext() {
    var f = HERO_FX[hi++ % HERO_FX.length];
    heroStage.dataset.fx = f[0]; $(".fx-chip", heroStage).textContent = "/effects " + f[1];
  }
  if (heroStage) { heroNext(); setInterval(heroNext, 3400); }
  var stats = { views: 1240, likes: 96, comments: 8, shares: 14 }, t0 = performance.now();
  function tickStats() {
    var s = (performance.now() - t0) / 1000;
    var g = Math.pow(1.11, s);                       // compounding growth while the page is open
    stats.views = Math.min(9.8e6, 1240 * g + s * 900);
    stats.likes = stats.views * 0.081; stats.comments = stats.views * 0.0042; stats.shares = stats.views * 0.012;
    $$(".js-views").forEach(function (e) { e.textContent = short(stats.views); });
    $$(".js-likes").forEach(function (e) { e.textContent = short(stats.likes); });
    $$(".js-comments").forEach(function (e) { e.textContent = short(stats.comments); });
    $$(".js-shares").forEach(function (e) { e.textContent = short(stats.shares); });
    var fv = $("#fsViews"), fl = $("#fsLikes"), fs = $("#fsShares");
    if (fv) fv.textContent = "+" + short(stats.views); if (fl) fl.textContent = short(stats.likes); if (fs) fs.textContent = short(stats.shares);
  }
  setInterval(tickStats, 120); tickStats();
  function heart(st) {
    var h = $(".hearts", st); if (!h) return;
    var b = document.createElement("b"); b.textContent = "♥"; b.style.setProperty("--dx", (Math.random() * 40 - 20) + "px");
    b.style.fontSize = (14 + Math.random() * 10) + "px"; h.appendChild(b); setTimeout(function () { b.remove(); }, 2300);
  }
  if (!reduced) setInterval(function () { $$(".stage[data-ui='1']").forEach(heart); }, 380);

  /* ================= skill -> edit (terminal) ================= */
  var FX = [
    { fx: "glass grade", cmd: "glass-widgets", label: "Glass widgets" },
    { fx: "spotlight", cmd: "spotlight", label: "Spotlight title" },
    { fx: "orbit", cmd: "orbit", label: "Orbit" },
    { fx: "split", cmd: "split-hook", label: "Split hook" },
    { fx: "timeline", cmd: "timeline", label: "Timeline" },
    { fx: "documentary", cmd: "documentary", label: "Documentary" },
    { fx: "checklist", cmd: "checklist", label: "Checklist" },
    { fx: "captions grade", cmd: "captions", label: "Captions" }
  ];
  var forge = $("#forgeStage"), tCmd = $("#tCmd"), tProg = $("#tProg"), rows = $$(".t-row"), chips = $("#fxChips"), run = 0, fi = 0;
  if (chips) FX.forEach(function (f, i) {
    var b = document.createElement("button"); b.type = "button"; b.textContent = "/" + f.cmd;
    b.addEventListener("click", function () { fi = i; play(); }); chips.appendChild(b);
  });
  function play() {
    var my = ++run, f = FX[fi % FX.length], txt = "/effects " + f.cmd, i = 0;
    $$("button", chips).forEach(function (b, k) { b.classList.toggle("on", k === fi % FX.length); });
    rows.forEach(function (r) { r.classList.remove("on"); }); tProg.style.width = "0"; tCmd.textContent = "";
    forge.dataset.fx = ""; forge.dataset.look = "raw"; $(".fx-chip", forge).textContent = "raw clip";
    $("#tR0").textContent = "Loading skill: " + f.label;
    var iv = setInterval(function () {
      if (my !== run) return clearInterval(iv);
      tCmd.textContent = txt.slice(0, ++i);
      if (i < txt.length) return;
      clearInterval(iv);
      [0, 1, 2, 3].forEach(function (k) { setTimeout(function () { if (my === run) rows[k].classList.add("on"); }, 300 + k * 420); });
      var p0 = performance.now();
      (function prog() { if (my !== run) return; var p = clamp((performance.now() - p0 - 300) / 1700, 0, 1); tProg.style.width = (p * 100) + "%";
        if (p < 1) return requestAnimationFrame(prog);
        rows[4].classList.add("on"); forge.dataset.look = ""; forge.dataset.fx = f.fx; $(".fx-chip", forge).textContent = "/effects " + f.cmd;
        setTimeout(function () { if (my === run) { fi++; play(); } }, 3600); })();
    }, reduced ? 1 : 55);
  }
  if (forge) {
    var started = false;
    var go = function () { if (!started) { started = true; play(); } };
    if ("IntersectionObserver" in window) new IntersectionObserver(function (e) { if (e[0].isIntersecting) go(); }, { threshold: .3 }).observe(forge);
    else go();
  }

  /* ================= before / after ================= */
  var ba = $("#ba"), baR = $("#baRange"), baEdit = $("#baEdit");
  if (ba) {
    var setP = function (v) { ba.style.setProperty("--p", v + "%"); };
    baR.addEventListener("input", function () { setP(baR.value); auto = false; });
    $$("#baTabs button").forEach(function (b) { b.addEventListener("click", function () {
      $$("#baTabs button").forEach(function (x) { x.classList.toggle("on", x === b); }); baEdit.dataset.fx = b.dataset.fx; }); });
    var auto = true, swung = false;
    if ("IntersectionObserver" in window && !reduced) new IntersectionObserver(function (e) {
      if (!e[0].isIntersecting || swung) return; swung = true; var s0 = performance.now();
      (function sw(t) { if (!auto) return; var p = (t - s0) / 1000; if (p > 3.4) { setP(50); baR.value = 50; return; }
        var v = 50 + 36 * Math.sin(p * 1.85); setP(v); baR.value = v; requestAnimationFrame(sw); })(s0);
    }, { threshold: .4 }).observe(ba);
  }

  /* ================= effects gallery ================= */
  var gal = $("#gallery");
  if (gal) {
    var DESC = { "glass-widgets": "Stats float around you.", spotlight: "Glowing title behind you.", orbit: "Your reels circle the frame.", "split-hook": "A hook panel slides in.",
      timeline: "Series look with a live timeline.", documentary: "Black and white, grain, name strip.", checklist: "Shows the edit as it happens.", captions: "Word-by-word captions." };
    gal.innerHTML = FX.map(function (f) {
      return '<div class="g-item reveal"><div class="stage" data-fx="' + f.fx + '">' + stageHTML(false) + "</div><code>/effects " + f.cmd + "</code><p>" + DESC[f.cmd] + "</p></div>";
    }).join("");
    setCaps();
  }

  /* ================= nav + mobile bar ================= */
  var nav = $("#nav"), mbar = $("#mbar"), pricing = $("#pricing"), hero = $(".hero"), darks = $$(".dark, .sec-dark");
  function onScroll() {
    var vh = window.innerHeight;
    nav.classList.toggle("on-dark", darks.some(function (d) { var r = d.getBoundingClientRect(); return r.top < 40 && r.bottom > 40; }));
    if (mbar) { var pr = pricing.getBoundingClientRect(); mbar.classList.toggle("show", hero.getBoundingClientRect().bottom < 0 && !(pr.top < vh && pr.bottom > 0)); }
  }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  /* smooth scroll (enhancement only) */
  window.addEventListener("load", function () {
    if (window.Lenis && !reduced && window.matchMedia("(pointer:fine)").matches) {
      var lenis = new window.Lenis({ lerp: .1, smoothWheel: true });
      (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(performance.now());
      $$('a[href^="#"]').forEach(function (a) { a.addEventListener("click", function (e) {
        var id = a.getAttribute("href"); if (id.length < 2) return; var el = $(id); if (!el) return; e.preventDefault(); lenis.scrollTo(el, { offset: -20 }); }); });
    }
  });

  /* ================= bento ================= */
  var beatsEl = $("#beats");
  if (beatsEl) {
    for (var b = 0; b < 32; b++) beatsEl.appendChild(document.createElement("i"));
    var bars = $$("i", beatsEl), bi = 0;
    setInterval(function () { bars.forEach(function (e, k) { var hit = k % 8 === bi % 8 || k % 8 === (bi + 4) % 8;
      e.classList.toggle("hit", hit && k % 4 === 0); e.style.height = (hit ? 70 + Math.random() * 30 : 12 + Math.random() * 30) + "%"; }); bi++; }, 300);
  }
  var tcap = $("#tCap");
  if (tcap) {
    var lines = [["Every", "word", "lands", "on", "time"], ["Captions", "that", "keep", "people", "watching"]], li = 0, wi = 0;
    var set = function () { tcap.innerHTML = lines[li].map(function (w) { return "<span>" + w + "</span>"; }).join(" "); wi = 0; }; set();
    setInterval(function () { var sp = $$("span", tcap); sp.forEach(function (s, k) { s.classList.toggle("on", k < wi); s.classList.toggle("now", k === wi); });
      wi++; if (wi > sp.length + 2) { li = (li + 1) % lines.length; set(); } }, 340);
  }
  var meter = $("#meterFill"); if (meter) setInterval(function () { meter.style.width = (22 + Math.random() * 20) + "%"; }, 160);
  var cmp = $("#cmp"); if (cmp) { var ci2 = $("#cmpRange"); ci2.addEventListener("input", function () { cmp.style.setProperty("--p", ci2.value + "%"); }); }

  /* ================= skills explorer ================= */
  var exList = $("#exList"), exChips = $("#exChips"), exSearch = $("#exSearch"), exCount = $("#exCount"), cat = "All";
  if (exList) {
    var all = []; DATA.categories.forEach(function (c) { c.skills.forEach(function (s) { all.push({ s: s, c: c.name }); }); });
    var draw = function () {
      var q = (exSearch.value || "").toLowerCase().trim();
      var res = all.filter(function (x) { return (cat === "All" || x.c === cat) && (!q || (x.s + " " + x.c).toLowerCase().indexOf(q) > -1); });
      exList.innerHTML = res.map(function (x, i) { return '<li style="animation-delay:' + Math.min(i, 30) * 12 + 'ms"><small>' + x.c + "</small>" + x.s + "</li>"; }).join("") ||
        "<li><small>No match</small>Try another word, for example colour, beat or caption.</li>";
      exCount.textContent = res.length + " of " + all.length + " skills";
    };
    ["All"].concat(DATA.categories.map(function (c) { return c.name; })).forEach(function (n) {
      var b2 = document.createElement("button"); b2.type = "button"; b2.textContent = n; if (n === "All") b2.className = "on";
      b2.addEventListener("click", function () { cat = n; $$("button", exChips).forEach(function (x) { x.classList.toggle("on", x === b2); }); draw(); });
      exChips.appendChild(b2);
    });
    exSearch.addEventListener("input", draw); draw();
  }

  /* ================= calculator ================= */
  var vIn = $("#vIn"), rIn = $("#rIn");
  if (vIn) {
    vIn.value = C.calcVideos || 20; rIn.value = C.calcRate || 1500;
    var calc = function () { $("#vOut").textContent = vIn.value; $("#rOut").textContent = "₹" + inr(rIn.value); $("#mOut").textContent = "₹" + inr(vIn.value * rIn.value); };
    vIn.addEventListener("input", calc); rIn.addEventListener("input", calc); calc();
  }

  /* ================= reveals (start visible-ish, never hidden) ================= */
  var rv = $$(".reveal");
  if (!("IntersectionObserver" in window) || reduced) rv.forEach(function (e) { e.classList.add("in"); });
  else { var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }); }, { rootMargin: "0px 0px -8% 0px" });
    rv.forEach(function (e) { io.observe(e); }); }
})();
