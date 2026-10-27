// Vanilla demo wiring carried over from the old static site; runs once over src/projects.html.
import { checkBill } from './billcheck.js'

export function initDemos() {
  // UPI City leaderboard, lift over chance (AUC-PR), from the repo README
  (function () {
    var rows = [["Given the answers",26.0,0],["Mine",15.1,1],["Sort by amount",3.8,0],["Best open source",3.3,0],["Random guessing",1.0,0]];
    document.getElementById('lb').innerHTML = rows.map(function (r) {
      return '<div class="brow' + (r[2] ? ' me' : '') + '"><span class="lbl">' + r[0] + '</span><span class="track"><span class="fill" style="width:' +
        (r[1] / 26 * 100).toFixed(1) + '%"></span></span><span class="v">' + r[1].toFixed(1) + 'x</span></div>';
    }).join('');
  })();

  // Web server, README table (2026-10-18)
  (function () {
    var data = {
      "100":  [[153049,"0.99 ms"],[659495,"2.51 ms"],[525776,"2.30 ms"]],
      "500":  [[153726,"4.27 ms"],[708134,"4.66 ms"],[562812,"6.36 ms"]],
      "1,000":[[157532,"7.98 ms"],[664709,"5.52 ms"],[495155,"9.73 ms"]],
      "2,000":[[153829,"16.80 ms"],[671556,"6.71 ms"],[550215,"11.28 ms"]],
      "5,000":[[117072,"46.06 ms"],[589644,"12.20 ms"],[519660,"22.87 ms"]]
    };
    var names = ["Mine, 1 loop", "Mine, 1 per core", "nginx"], max = 720000;
    var seg = document.getElementById('conns'), out = document.getElementById('ws');
    function draw(k) {
      out.innerHTML = data[k].map(function (d, i) {
        return '<div class="brow' + (i === 1 ? ' me' : '') + '"><span class="lbl">' + names[i] + '</span><span class="track"><span class="fill" style="width:' +
          (d[0] / max * 100).toFixed(1) + '%"></span></span><span class="v">' + Math.round(d[0] / 1000) + 'k<small>p99 ' + d[1] + '</small></span></div>';
      }).join('');
      [].forEach.call(seg.children, function (b) { b.setAttribute('aria-pressed', b.dataset.k === k); });
    }
    Object.keys(data).forEach(function (k) {
      var b = document.createElement('button'); b.type = 'button'; b.dataset.k = k; b.textContent = k;
      b.addEventListener('click', function () { draw(k); }); seg.appendChild(b);
    });
    draw("1,000");
  })();

  // Bill checker
  (function () {
    var TODAY = "2026-10-04";   // the repo's test date, so the example dates stay valid
    var base = { gstin: "27AAPFU0939F1ZV", bill_no: "INV-1042", date: "2026-10-02",
      items: [{ name: "Amul Taaza 500ml", qty: 2, rate: 28, amount: 56 }, { name: "Britannia Good Day 100g", qty: 1, rate: 30, amount: 30 }],
      subtotal: 86, cgst: 2.15, sgst: 2.15, total: 90.30 };
    var scen = [
      ["Clean bill", {}],
      ["OCR misread", { gstin: "27AAPFU0939FIZV", bill_no: "INV-1043" }],
      ["Edited total", { total: 990.30, bill_no: "INV-1044" }],
      ["Fake GSTIN", { gstin: "27AAPFU0939F1ZQ", bill_no: "INV-1045" }],
      ["Future date", { date: "2026-11-02", bill_no: "INV-1046" }],
      ["Uploaded twice", null]
    ];
    var cur = Object.assign({}, base), seen = new Set();
    var $ = function (id) { return document.getElementById(id); };
    var seg = $('scen'), gIn = $('b-gstin'), tIn = $('b-total');
    function fill() { gIn.value = cur.gstin; tIn.value = cur.total.toFixed(2); $('b-no').textContent = cur.bill_no; $('b-date').textContent = cur.date; }
    function run(fresh) {
      if (fresh) seen = new Set();
      var t0 = performance.now(), r = checkBill(cur, seen, TODAY), ms = performance.now() - t0;
      $('verdict').dataset.v = r[0]; $('vv').textContent = r[0];
      $('why').innerHTML = r[1].length ? r[1].map(function (w) { return '<li>' + w.replace(/</g, '&lt;') + '</li>'; }).join('') : '<li>Every check passed.</li>';
      $('vt').textContent = 'Checked in ' + (ms < 0.1 ? 'under 0.1' : ms.toFixed(2)) + ' ms';
    }
    scen.forEach(function (s, i) {
      var b = document.createElement('button'); b.type = 'button'; b.textContent = s[0]; b.setAttribute('aria-pressed', i === 0);
      b.addEventListener('click', function () {
        [].forEach.call(seg.children, function (x) { x.setAttribute('aria-pressed', x === b); });
        if (s[1] === null) {   // accept the clean bill once, then send it again so the duplicate check fires
          cur = Object.assign({}, base); fill(); seen = new Set(); checkBill(cur, seen, TODAY); run(false); return;
        }
        cur = Object.assign({}, base, s[1]); fill(); run(true);
      });
      seg.appendChild(b);
    });
    gIn.addEventListener('input', function () { cur.gstin = gIn.value; run(true); });
    tIn.addEventListener('input', function () { var v = parseFloat(tIn.value); if (!isNaN(v)) { cur.total = v; run(true); } });
    fill(); run(true);
  })();

  // Photo screens
  (function () {
    var seg = document.getElementById('ptabs'), img = document.getElementById('pimg'), cap = document.getElementById('pcap');
    [].forEach.call(seg.children, function (b) {
      b.addEventListener('click', function () {
        [].forEach.call(seg.children, function (x) { x.setAttribute('aria-pressed', x === b); });
        img.src = b.dataset.src; img.alt = b.dataset.alt; img.width = b.dataset.w; img.height = b.dataset.h; cap.textContent = b.dataset.cap.replace(/&quot;/g, '"');
      });
    });
  })();


  // Protected: rules from the six cogs (Antiban, Antibotadd, Antichannel, Antirole, Antiwebhook)
  (function () {
    var who = [["Server owner","owner"],["Trusted admin","trusted"],["Anyone else","other"]];
    var acts = [
      ["Deletes a channel", ["They get banned."]],
      ["Creates a channel", ["The channel is deleted.","They get banned."]],
      ["Bans a member", ["The member is unbanned.","They get banned."]],
      ["Adds a bot", ["The bot is banned.","They get banned."]],
      ["Changes a role", ["They get banned."]],
      ["Creates a webhook", ["They get banned."]]
    ];
    var w = "other", a = 0, $ = function (id) { return document.getElementById(id); };
    function draw() {
      var ok = w !== "other";
      $('p-out').dataset.v = ok ? "approve" : "reject";
      $('p-vv').textContent = ok ? "Allowed" : "Blocked";
      $('p-why').innerHTML = ok ? '<li>The owner and whitelisted admins can change anything.</li>'
        : acts[a][1].map(function (x) { return '<li>' + x + '</li>'; }).join('');
    }
    function seg(el, items, cur, set) {
      items.forEach(function (it, i) {
        var b = document.createElement('button'); b.type = 'button'; b.textContent = it[0];
        b.setAttribute('aria-pressed', (it[1] === cur) || (i === cur));
        b.addEventListener('click', function () { [].forEach.call(el.children, function (x) { x.setAttribute('aria-pressed', x === b); }); set(it[1] !== undefined && typeof it[1] === 'string' ? it[1] : i); draw(); });
        el.appendChild(b);
      });
    }
    seg($('p-who'), who, w, function (v) { w = v; });
    seg($('p-act'), acts, a, function (v) { a = v; });
    draw();
  })();
}
