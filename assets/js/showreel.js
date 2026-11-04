/* CutIQ showreel: one clip, eight skill commands, each edit plays inside the phone. */
(function () {
  "use strict";
  var sr = document.getElementById("sr");
  var list = document.getElementById("srList");
  if (!sr || !window.CUTIQ_STAGE) return;
  if (/[?&](rec|srtest)\b/.test(location.search)) {   /* same "random" every capture = no flicker */
    var seed = 12345; Math.random = function () { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  }
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var stage = function (fx, cls) { return '<div class="' + (cls || "") + '"><div class="stage" data-fx="' + (fx || "") + '">' + window.CUTIQ_STAGE(false) + bones() + "</div></div>"; };

  function bones() {
    var ribs = "";
    for (var i = 0; i < 6; i++) {
      var y = 304 + i * 19, w = 58 - i * 3;
      ribs += '<path d="M176 ' + y + "q-" + w + " 2-" + (w + 6) + " 34M184 " + y + "q" + w + " 2 " + (w + 6) + ' 34"/>';
    }
    var spine = "";
    for (var k = 0; k < 15; k++) spine += '<rect x="173" y="' + (212 + k * 21) + '" width="14" height="14" rx="4"/>';
    return '<div class="bones"><svg viewBox="0 0 360 520" aria-hidden="true"><g class="p-head">' +
      '<path d="M132 138c0-48 22-74 48-74s48 26 48 74c0 22-6 36-14 46l-4 22h-60l-4-22c-8-10-14-24-14-46z"/>' +
      '<ellipse cx="160" cy="146" rx="13" ry="11"/><ellipse cx="200" cy="146" rx="13" ry="11"/>' +
      '<path d="M180 158l-7 14h14z"/><path d="M156 192h48M162 186v12M172 186v12M182 186v12M192 186v12"/></g>' +
      spine + '<path d="M180 286c-30 0-54 4-74 14M180 286c30 0 54 4 74 14"/><circle cx="104" cy="304" r="12"/><circle cx="256" cy="304" r="12"/>' +
      '<rect x="174" y="292" width="12" height="96" rx="5"/>' + ribs + "</svg></div>";
  }

  var SK = [
    { id: "xray", cmd: "/xray-scan", d: "X-ray body scan with a glitch hook" },
    { id: "blueprint", cmd: "/blueprint-outline", d: "Glowing schematic outline with labels" },
    { id: "aipanel", cmd: "/ai-broll-panel", d: "Prompt card and B-roll shots above you" },
    { id: "mockup", cmd: "/phone-mockup", d: "Your reel in a hand-held phone" },
    { id: "widgets", cmd: "/glass-widgets", d: "Glass widgets and toggles that switch on" },
    { id: "editor", cmd: "/editor-ui", d: "A pro editing timeline over your clip" },
    { id: "pullback", cmd: "/pull-back-reveal", d: "Pull back into the app, live captions" },
    { id: "recap", cmd: "/recap-grid", d: "Every edit stacked into one end card" }
  ];

  /* ---------- build the screen ---------- */
  var px = ""; for (var p = 0; p < 24; p++) px += '<i style="--dl:' + (Math.random() * 1.3).toFixed(2) + 's"></i>';
  var chips = [["Kinetic type", 6, 14, 0], ["Logo reveal", 60, 9, 0], ["Colour grade", 66, 30, 1], ["Beat sync", 10, 70, 1], ["Auto zoom", 4, 46, 0], ["3D mockup", 64, 62, 0], ["Live captions", 58, 84, 1], ["Text behind", 8, 88, 0]]
    .map(function (c, i) { return '<span class="' + (c[3] ? "b" : "") + '" style="left:' + c[1] + "%;top:" + c[2] + "%;--fd:" + (i * 0.37).toFixed(2) + 's"><i></i>' + c[0] + "</span>"; }).join("");
  var tiles = [["xray", "lk-xray", ""], ["blueprint", "lk-bp", ""], ["aipanel", "rc-ai", "grade"], ["mockup", "rc-mock", "grade"], ["widgets", "", "glass grade"], ["editor", "rc-ed", "timeline"]]
    .map(function (t) { var s = SK.filter(function (k) { return k.id === t[0]; })[0]; return '<div class="rc-tile">' + stage(t[2], "rc-st " + t[1]) + "<small>" + s.cmd + "</small></div>"; }).join("");

  sr.innerHTML =
    '<div class="sr-screen">' +
    stage("", "sr-main") +
    '<div class="sr-l sr-xray"><span class="big">IQ</span><span class="hud tl">CUTIQ · SCAN 01<br>FRAME 0112</span><span class="hud tr">X-RAY<br>● LIVE</span>' +
    '<div class="glitch"><i style="left:44%;top:30%"></i><i style="left:52%;top:33%"></i><i style="left:47%;top:38%"></i><i style="left:56%;top:28%"></i><i style="left:41%;top:35%"></i></div>' +
    '<span class="hud bar">◉ /xray-scan · one command</span></div>' +
    '<div class="sr-l sr-bp"><span class="big">IQ</span><span class="bp-title">SCHEMATIC · CREATOR 01</span>' +
    '<span class="co c1"><b>FACE</b>tracked</span><span class="co c2"><b>VOICE</b>1:1 sync</span><span class="co c3"><b>OUTPUT</b>4K · 9:16</span>' +
    '<span class="hud bar">◉ /blueprint-outline · one command</span></div>' +
    '<div class="sr-l sr-ai"><div class="ai-card"><div class="ai-top"><b><i class="spark"></i>AI B-roll</b><span>4 shots · 9:16</span></div>' +
    '<p class="ai-prompt"><small>PROMPT</small>Mumbai street at night, neon rain, slow push-in, cinematic</p>' +
    '<div class="ai-meta"><span>Realistic</span><span>4K</span><em class="ai-st"><b class="ai-gen">Generating · <span class="ai-pct">0</span>%</b><b class="ai-ok">Done ✓</b></em></div>' +
    '<div class="ai-grid"><div class="ai-t t1"><div class="px">' + px + '</div></div><div class="ai-t t2"><div class="px">' + px + '</div></div><div class="ai-t t3"><div class="px">' + px + '</div></div><div class="ai-t t4"><div class="px">' + px + "</div></div></div></div></div>" +
    '<div class="sr-l sr-mock"><div class="mk-chips">' + chips + '</div><div class="mk-hold"><svg class="hand back" viewBox="0 0 200 240"><path d="M40 240c-6-60 0-110 24-140l96-8c20 30 30 80 26 148z"/></svg>' +
    '<div class="mk-phone">' + stage("grade captions", "mk-in") + '<i class="notch"></i></div>' +
    '<svg class="hand front" viewBox="0 0 200 240"><path d="M18 170c-8-26-4-52 10-66 10-8 22-4 26 8l10 54c-6 18-20 26-46 4z"/><path d="M168 74c14-2 22 6 20 16l-18 2c-8-2-10-14-2-18zM172 112c14-2 22 6 20 16l-20 2c-8-2-8-14 0-18zM170 150c12-2 20 6 18 16l-18 2c-8-2-8-14 0-18z"/></svg></div></div>' +
    '<div class="sr-l sr-wg"><div class="tw"><div class="tw-h"><b>Today</b><small>3/4 done</small></div><ul>' +
    '<li style="--dl:.3s">Shoot the reel</li><li style="--dl:.8s">Edit with Claude</li><li style="--dl:1.3s">Add the effects</li><li style="--dl:9s">Post at 7 PM</li></ul></div>' +
    '<div class="dw"><small>FRIDAY</small><b>31</b><span>Post day · 7 PM</span></div>' +
    '<div class="tg"><p style="--dl:.6s">Write one line<i></i></p><p style="--dl:1.1s">Run the skill<i></i></p><p style="--dl:1.6s">Pick the look<i></i></p><p style="--dl:2.1s">Post it<i></i></p></div></div>' +
    '<div class="sr-l sr-ed"><div class="ed-tabs"><span>Assembly</span><span class="on">Edit</span><span>Colour</span><span>Audio</span><b>● CutIQ</b></div>' +
    '<div class="ed-tools"><i></i><i class="on"></i><i></i><i></i><i></i><i></i></div>' +
    '<div class="ed-mon"><small>Program · reel_v2</small>' + stage("grade", "ed-st") + '<span class="tc">00:00:07:14</span></div>' +
    '<div class="ed-fx"><b>Effect controls</b><p>Scale<span style="--v:72%"></span></p><p>Position<span style="--v:50%"></span></p><p>Opacity<span style="--v:100%"></span></p>' +
    '<b>Colour</b><p>Exposure<span style="--v:58%;--a:edA"></span></p><p>Contrast<span style="--v:64%;--a:edB"></span></p><p>Highlights<span style="--v:40%;--a:edA"></span></p><p>Saturation<span style="--v:70%;--a:edB"></span></p></div>' +
    '<div class="ed-tl"><div class="ruler"></div>' +
    '<div class="trk"><em>V3</em><i class="k" style="left:2%;width:20%">/xray-scan</i><i class="k" style="left:24%;width:20%">/ai-broll</i><i class="k" style="left:46%;width:20%">/mockup</i><i class="k" style="left:68%;width:18%">/widgets</i></div>' +
    '<div class="trk"><em>V2</em><i class="a" style="left:2%;width:94%">Adjustment · grade</i></div>' +
    '<div class="trk"><em>V1</em><i class="v" style="left:2%;width:94%">raw_clip.mp4</i></div>' +
    '<div class="trk"><em>A1</em><i class="w" style="left:2%;width:94%"></i></div>' +
    '<div class="trk"><em>A2</em><i class="m" style="left:2%;width:94%">music_bed.mp3</i></div><span class="ph"></span></div></div>' +
    '<div class="sr-l sr-pb"><div class="pb-win"><div class="pb-bar"><span><i></i><i></i><i></i></span>Claude · CutIQ</div><div class="pb-body"><ul class="pb-list">' +
    '<li style="--dl:.2s">Edit my reel</li><li style="--dl:.5s">Transcribed 1 clip</li><li style="--dl:.8s">Picked the best take</li><li style="--dl:1.1s">Cut 4 pauses</li><li style="--dl:1.4s">Added 6 effects</li><li class="wip">Captioning…</li></ul>' +
    stage("grade", "pb-st") + '</div></div>' +
    '<div class="pb-cap"><div class="pb-h"><i class="spark"></i><span>LIVE CAPTIONS</span></div><p><span style="--dl:1.1s">One</span> <span style="--dl:1.35s">line</span> <span style="--dl:1.6s">in.</span> <span class="y" style="--dl:1.9s">Finished</span> <span class="y" style="--dl:2.15s">reel</span> <span style="--dl:2.4s">out.</span></p>' +
    '<svg viewBox="0 0 300 70" class="pb-chart"><path d="M4 62C50 60 80 58 110 52s60-6 90-20 56-24 96-28"/><circle cx="296" cy="4" r="4"/></svg><b class="pb-up">REACH <em>+212%</em></b></div></div>' +
    '<div class="sr-l sr-rc"><div class="rc-h"><small>Comment-worthy in one line</small><b>8 skills.<br><em>1 clip.</em></b><span>Zero timeline. Zero editing.</span></div><div class="rc-grid">' + tiles + "</div>" +
    '<a class="rc-cta" href="#pricing" data-pay>Get all 399 skills · ₹<span class="js-price">399</span></a></div>' +
    '<div class="sr-cmd"><div class="cm-top"><span><i class="spark"></i>CutIQ skills</span><em>in Claude</em></div>' +
    '<div class="cm-hint"><b>raw_clip.mp4</b><span>0:34 · uploaded · pick a skill</span></div><div class="cm-msg"><p>Editing with <b class="cm-name"></b>…</p><div class="cm-thumb">' + stage("", "cm-st") + '<div class="cm-pr"><i></i></div><small>Rendering <span class="cm-pct">0</span>%</small></div></div>' +
    '<div class="cm-menu"></div>' +
    '<div class="cm-box"><div class="cm-clip"><span></span><small>0:34</small></div><p class="cm-in"><span class="cm-typed"></span><i class="caret"></i></p>' +
    '<div class="cm-row"><span>＋ raw_clip.mp4</span><b>↑</b></div></div></div>' +
    '<span class="sr-tag"></span></div>';

  if (list) list.innerHTML = SK.map(function (s, i) { return '<button type="button" data-i="' + i + '"><b>' + s.cmd + "</b><span>" + s.d + "</span><i></i></button>"; }).join("");

  /* ---------- the timeline ---------- */
  var main = $(".sr-main", sr), mainStage = $(".stage", main), typed = $(".cm-typed", sr), menu = $(".cm-menu", sr);
  var T_CMD = 1500, T_REN = 950, T_PLAY = 4400, T_RECAP = 5600, cur = -1, timers = [], ivs = [], token = 0;
  function later(fn, ms) { timers.push(setTimeout(fn, ms)); }
  function every(fn, ms) { var id = setInterval(fn, ms); ivs.push(id); return id; }
  function clear() { timers.forEach(clearTimeout); ivs.forEach(clearInterval); timers = []; ivs = []; }
  var LOOK = { xray: ["lk-xray", ""], blueprint: ["lk-bp", ""], aipanel: ["", "grade"], widgets: ["", "grade"] };

  function run(i) {
    clear(); cur = i; var s = SK[i], tok = ++token;
    sr.dataset.p = "cmd";
    var lk = LOOK[s.id] || ["", "grade"];
    /* switch the scene only once the command screen fully covers it (no flash of the next effect) */
    var apply = function () { if (tok !== token) return; sr.dataset.s = s.id; main.className = "sr-main " + lk[0]; mainStage.dataset.fx = lk[1]; };
    if (!sr.dataset.s) apply(); else setTimeout(apply, 340);
    $(".sr-tag", sr).textContent = s.cmd; $(".cm-name", sr).textContent = s.cmd;
    menu.innerHTML = [SK[(i + 7) % 8], s, SK[(i + 1) % 8]].map(function (k) { return '<p class="' + (k === s ? "on" : "") + '"><b>' + k.cmd + "</b><small>" + k.d + "</small></p>"; }).join("");
    $$("button", list).forEach(function (b, k) { b.classList.toggle("on", k === i); b.classList.toggle("seen", k < i); });
    typed.textContent = "";
    var n = 0, speed = Math.max(45, Math.floor((T_CMD - 400) / s.cmd.length));
    every(function () { if (n <= s.cmd.length) typed.textContent = s.cmd.slice(0, n++); }, speed);
    later(function () {
      clear(); apply(); sr.dataset.p = "render";
      var pct = 0, pe = $(".cm-pct", sr), bar = $(".cm-pr i", sr);
      every(function () { pct = Math.min(100, pct + 7 + Math.random() * 9); pe.textContent = Math.round(pct); bar.style.width = pct + "%"; }, 70);
      later(function () {
        clear(); sr.dataset.p = "play";
        if (s.id === "aipanel") {
          var a = 0, ap = $(".ai-pct", sr);
          every(function () { a = Math.min(100, a + 4); ap.textContent = a; if (a >= 100) sr.classList.add("ai-done"); }, 60);
        }
        var hold = s.id === "recap" ? T_RECAP : T_PLAY;
        later(function () { sr.classList.remove("ai-done"); run((i + 1) % SK.length); }, hold);
      }, T_REN);
    }, T_CMD);
    if (list) list.style.setProperty("--dur", (T_CMD + T_REN + (s.id === "recap" ? T_RECAP : T_PLAY)) + "ms");
  }
  if (list) list.addEventListener("click", function (e) { var b = e.target.closest("button"); if (b) { sr.classList.remove("ai-done"); run(+b.dataset.i); } });

  /* run only while visible; pause animations when off screen */
  var started = false, q = /[?&]srtest=(\w+)/.exec(location.search);
  if (/[?&]rec\b/.test(location.search)) {  /* video capture: full-screen reel from t=0 */
    document.documentElement.classList.add("srtest", "srrec"); started = true; window.__go = function () { run(0); };
    window.__tick = function () {   /* drive every CSS animation/transition from the (virtual) JS clock */
      var now = performance.now();
      document.getAnimations().forEach(function (an) { if (an.__v0 === undefined) { an.__v0 = now; an.pause(); } an.currentTime = now - an.__v0; });
    };
  } else if (q) {                          /* preview helper: ?srtest=xray shows one scene, held */
    T_PLAY = T_RECAP = 1e9; T_CMD = /cmd/.test(location.search) ? 1e9 : 10; T_REN = /render/.test(location.search) ? 1e9 : 10; started = true;
    run(Math.max(0, SK.map(function (k) { return k.id; }).indexOf(q[1])));
    document.documentElement.classList.add("srtest");
    if (q[1] === "plain") setTimeout(function () { sr.dataset.s = "plain"; main.className = "sr-main"; mainStage.dataset.fx = "grade"; $(".sr-tag", sr).textContent = ""; }, 600);
  } else if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        sr.classList.toggle("sr-off", !en.isIntersecting);
        if (en.isIntersecting && !started) { started = true; run(0); }
      });
    }, { threshold: 0.25 }).observe(sr);
  } else { run(0); }
  var pay = document.querySelector("a.full[data-pay]"), cta = $(".rc-cta", sr);
  if (pay && cta) { cta.href = pay.getAttribute("href"); if (pay.target) { cta.target = pay.target; cta.rel = "noopener"; } }
  $$(".js-price", sr).forEach(function (e) { e.textContent = (window.CUTIQ_CONFIG || {}).price || 399; });
})();
