/* CutIQ v5: "What's inside" folder tree + prompt marquees, built from skills-data.js */
(function () {
  "use strict";
  var DATA = window.CUTIQ_SKILLS || { categories: [] };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  var slug = function (s) { return s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); };

  var TAG = {
    "Cutting & Timeline": "Cuts", "Color Grading & LUTs": "Colour", "Text & Typography": "Text", "Captions & Subtitles": "Captions",
    "Transitions": "Transitions", "Motion & Animation": "Motion", "Audio Editing & Mixing": "Audio", "Music & Beat Sync": "Beats",
    "VFX & Compositing": "VFX", "Speed & Time Effects": "Speed", "Stabilize, Restore & Cleanup": "Cleanup", "Social Media Formats": "Reels",
    "Branding & Watermarks": "Brand", "Real Estate & Property Videos": "Property", "Cinematic, Wedding & Events": "Cinematic",
    "Product, E-commerce & Ads": "Ads", "YouTube, Podcast & Talking Head": "Podcast", "AI & Automation": "Auto", "Export, Delivery & QC": "Export"
  };

  var tree = document.getElementById("bzTree");
  if (tree) {
    tree.innerHTML = DATA.categories.map(function (c, i) {
      var n = (i + 1 < 10 ? "0" : "") + (i + 1);
      return '<li><div class="t"><code><i>' + n + "_</i>" + esc(slug(c.name)) + '/</code><em>' + esc(TAG[c.name] || c.count) + "</em></div>" +
        "<span>" + esc(c.skills.slice(0, 3).join(" · ")) + " + " + (c.count - 3) + " more</span></li>";
    }).join("");
  }

  /* marquee: two rows of real skill names, duplicated so the loop is seamless */
  var all = [];
  DATA.categories.forEach(function (c) { c.skills.forEach(function (s) { all.push(s); }); });
  function pick(offset, n) { var out = []; for (var k = 0; k < n && all.length; k++) out.push(all[(offset + k * 7) % all.length]); return out; }
  function fill(id, items) {
    var el = document.getElementById(id); if (!el || !items.length) return;
    var html = items.map(function (s) { return "<span>effects " + esc(slug(s.replace(/\(.*?\)/g, ""))) + "</span>"; }).join("");
    el.innerHTML = html + html;
  }
  fill("mqA", pick(0, 16));
  fill("mqB", pick(3, 16));
})();
