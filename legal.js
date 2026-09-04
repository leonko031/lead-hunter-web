/* Lead Hunter legal documents and the modal that shows them.
   Opens from any element with data-lh-legal="terms|privacy|refunds", or from #terms, #privacy, #refunds in the URL.
   The home page is a bundle that rebuilds its DOM after load, so the modal is created on first open, never at parse time. */
(function () {
  var UPDATED = '4 September 2026';
  var MAIL = 'getleadhunter@gmail.com';
  var DOCS = {
    terms: { title: 'Terms of Service', kicker: 'Terms', html: '' +
      '<p class="lh-lead">These terms cover the purchase and use of Lead Hunter, a downloadable software folder sold at getleadhunter.io. Buying it means you agree to them. They are written in plain language on purpose.</p>' +
      '<h3>1. Who you are dealing with</h3>' +
      '<p>Lead Hunter is built and operated by Leon Ilišin, Croatia. Payments are handled by Stripe, which acts as the merchant of record for this sale: Stripe processes your payment, applies any tax that is due and issues refunds. Questions about the product, delivery, refunds or these terms go to <a href="mailto:' + MAIL + '">' + MAIL + '</a>.</p>' +
      '<h3>2. What you are buying</h3>' +
      '<p>A folder of nine tools that runs on your own computer inside Claude Code or Codex. It searches public sources for local businesses in a trade and a city, reads their websites, checks that each email domain resolves, drops chains and dead addresses, scores what is left, and writes a short brief for the top rows: what is broken on the site, what to sell and a price range. Output is an Excel file, a CSV and a Markdown file of briefs.</p>' +
      '<p>Claude Code and Codex are separate products from other companies. You need your own access to one of them, with its own terms and its own cost. Lead Hunter does not include it.</p>' +
      '<h3>3. Price, payment and delivery</h3>' +
      '<p>The price is 67 US dollars, paid once. There is no subscription and nothing is charged again. After payment you receive the download link on screen and by email at the address you gave Stripe. If the email does not arrive within a few minutes, check spam, then write to us and we send it by hand.</p>' +
      '<h3>4. Your licence</h3>' +
      '<p>You may install and run Lead Hunter on computers you control, for your own business or freelance work, on as many cities and trades as you like, for as long as you like. If you run a company or an agency, your own team may use it for that company\'s work.</p>' +
      '<p>You may change the code for your own use. You may not sell, rent, publish, share or redistribute the folder, its code, its skills or its documentation, in whole or in part, and you may not offer it as a service to third parties. The lists and briefs it produces are yours.</p>' +
      '<h3>5. Updates and support</h3>' +
      '<p>You receive updates for 12 months from purchase. After that, the version you have keeps working; you simply stop receiving new ones. Support is by email and is provided on a best effort basis. There is no guaranteed response time.</p>' +
      '<h3>6. What it does not do</h3>' +
      '<ul>' +
      '<li>It does not send emails. It builds the list and profiles it. Sending is your job, in your own tool.</li>' +
      '<li>It depends on public search engines and on the websites it reads. When those change, it can need adjusting, and it can occasionally return less than expected.</li>' +
      '<li>Results are not guaranteed to be complete or accurate. Check anything before you put it in front of a client.</li>' +
      '<li>Twenty briefs per run is a cap, not a promise. A narrow trade in a small town gives you what it finds, and tells you how many.</li>' +
      '</ul>' +
      '<h3>7. Your responsibilities</h3>' +
      '<p>You are responsible for how you use what the tool finds. In particular you agree to comply with the laws that apply to you and to the people you contact, including data protection and electronic marketing rules such as the GDPR and the ePrivacy rules in the EU and their equivalents elsewhere; to respect the terms and technical limits of the websites and services the tool reads; to keep your own records of where each contact came from; and not to use the tool to harass anyone, to send spam, or to collect data about private individuals. For any personal data the tool collects on your instruction, you are the controller. We never receive it.</p>' +
      '<h3>8. No guarantee of results</h3>' +
      '<p>Lead Hunter gives you a list and a reason to write. It does not promise replies, clients, sales or income, and nothing on this site should be read as such a promise. How you write, who you write to and what you sell are yours.</p>' +
      '<h3>9. Refunds</h3>' +
      '<p>Fourteen days from purchase, full refund, one email is all it takes. The details are in the <a href="#refunds" data-lh-legal="refunds">Refund Policy</a>.</p>' +
      '<h3>10. Liability</h3>' +
      '<p>To the extent the law allows, our total liability for anything arising from this purchase is limited to the amount you paid. We are not liable for indirect losses, lost profits or lost business, or for the actions of third-party services the tool depends on. Nothing here limits rights you have as a consumer under mandatory law, including your statutory rights in the EU.</p>' +
      '<h3>11. Changes</h3>' +
      '<p>We may update these terms. The date at the top tells you when. Changes apply to purchases made after that date; your purchase is governed by the terms shown when you bought.</p>' +
      '<h3>12. Law</h3>' +
      '<p>These terms are governed by the law of the Republic of Croatia. If you are a consumer in the EU, you also keep the protections of the law of the country you live in, and you may use the European Commission\'s online dispute resolution platform.</p>' +
      '<h3>13. Contact</h3>' +
      '<p><a href="mailto:' + MAIL + '">' + MAIL + '</a>. Plain email, a person reads it.</p>'
    },
    privacy: { title: 'Privacy Policy', kicker: 'Privacy', html: '' +
      '<p class="lh-lead">Short version: this site measures its own pages and its ads, Stripe handles your payment, we keep your email to deliver the product and to send a few onboarding emails, and the tool itself sends us nothing about what you run. The long version follows.</p>' +
      '<h3>1. Who is responsible</h3>' +
      '<p>Leon Ilišin, Croatia, operating Lead Hunter at getleadhunter.io, is the controller for the data described here. Contact: <a href="mailto:' + MAIL + '">' + MAIL + '</a>.</p>' +
      '<h3>2. On the website</h3>' +
      '<p><strong>Analytics.</strong> We use Rybbit, a privacy-friendly analytics service that does not set cookies. It records page views, which sections of the page you reach, which buttons you click, your approximate country, browser type and screen size, and the site that sent you. It can also keep an anonymised replay of how the page was used (scrolls and clicks), with anything you type masked. It does not store a profile that identifies you by name.</p>' +
      '<p><strong>Advertising measurement.</strong> We use the Meta Pixel to see whether our advertising on Facebook and Instagram works. It sets cookies (_fbp and, if you arrived from a Meta ad, _fbc) and reports these events to Meta: that you viewed the page, that you clicked a buy button, and, if you buy, the purchase. Meta may link this to your Meta account under its own privacy policy. You can limit this in your Meta ad settings or by blocking the cookie in your browser; the site works without it.</p>' +
      '<p><strong>Server logs.</strong> The site is hosted on GitHub Pages, which keeps standard access logs for security.</p>' +
      '<h3>3. When you buy</h3>' +
      '<p>Checkout runs on Stripe. Stripe collects your card details, email, name and billing address. We never see card numbers. Stripe passes us your email, your name and billing address as you entered them, and an order id. We use these to deliver the download link, to send the onboarding emails below, to handle refunds and support, and to keep the records that tax and accounting rules require.</p>' +
      '<p>We also report the purchase to Meta through its Conversions API so that ad results are counted correctly when a browser blocks the pixel. What we send is hashed (turned into a one-way code) before it leaves our server: your email, and where Stripe gave them, your name, city, postcode and country. If you would rather we did not send this, write to us before or after you buy and we will exclude your order.</p>' +
      '<h3>4. Emails</h3>' +
      '<p>After purchase you receive the delivery email and up to four short onboarding emails over the following twelve days, sent from hello@getleadhunter.io through Resend. Every one of them tells you how to stop them: reply with the word unsubscribe, or email us. A refund stops them as well. We do not send newsletters and we do not share your address.</p>' +
      '<h3>5. Where the data lives</h3>' +
      '<p>Order records and the email schedule are stored on a small server we run on Fly.io in Frankfurt, Germany. Payment data stays with Stripe. Email delivery runs through Resend. The site is served by GitHub Pages. Analytics data is held by Rybbit. Advertising data is held by Meta. Each of these companies acts as our processor or, in Meta\'s case, as an independent controller under its own policy.</p>' +
      '<h3>6. How long we keep it</h3>' +
      '<p>Order records for as long as we need them for support, refunds and the retention periods that accounting law sets. The onboarding email schedule ends twelve days after purchase or when you stop it. Analytics and advertising data follow the retention settings of those services.</p>' +
      '<h3>7. Your rights</h3>' +
      '<p>Under the GDPR you can ask what we hold about you, ask us to correct or delete it, restrict or object to how we use it, or receive a copy in a portable form. Email us and we answer within a month. You can also complain to the Croatian data protection authority, AZOP, or to the authority in your own country.</p>' +
      '<h3>8. The tool on your computer</h3>' +
      '<p>Lead Hunter runs entirely on your own machine. It does not phone home, it does not send us the searches you run or the lists it builds, and we have no way to see them. Whatever it collects on your instruction is under your control and your responsibility.</p>' +
      '<h3>9. Age</h3>' +
      '<p>Lead Hunter is a business tool for adults. We do not knowingly collect data from anyone under 18.</p>' +
      '<h3>10. Changes</h3>' +
      '<p>If this policy changes, the date at the top changes with it, and the new version applies from that day.</p>'
    },
    refunds: { title: 'Refund Policy', kicker: 'Refunds', html: '' +
      '<p class="lh-lead">Fourteen days. Full refund. One email is all it takes.</p>' +
      '<h3>How it works</h3>' +
      '<p>If Lead Hunter is not what you wanted, email <a href="mailto:' + MAIL + '">' + MAIL + '</a> within 14 days of your purchase from the address you bought with, or include your order email. You do not need to give a reason. We confirm by email and Stripe returns the full amount to the payment method you used, usually within 5 to 10 business days depending on your bank.</p>' +
      '<h3>What it covers</h3>' +
      '<p>The full price, 67 US dollars, and any tax Stripe charged with it. Everything, no partial refunds and no fees.</p>' +
      '<h3>After a refund</h3>' +
      '<p>Your licence ends, the update emails stop, and we ask you to delete the folder. If you bought again later, that would be a new purchase with its own 14 days.</p>' +
      '<h3>After 14 days</h3>' +
      '<p>We do not offer refunds after the 14-day window, except where the law of your country requires it. If something is genuinely broken, write to us anyway; we would rather fix it.</p>' +
      '<h3>Chargebacks</h3>' +
      '<p>A chargeback costs more than a refund and takes longer for you. Email us first; a refund request within 14 days is always granted.</p>'
    }
  };

  var CSS = '' +
    '.lh-legal-overlay{position:fixed;inset:0;background:rgba(6,6,8,.78);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);z-index:100000;display:flex;align-items:center;justify-content:center;padding:20px;opacity:0;transition:opacity .18s}' +
    '.lh-legal-overlay.is-open{opacity:1}' +
    '.lh-legal{background:#0e0e12;color:#f4f4f6;border:1px solid rgba(255,255,255,.12);border-radius:20px;width:100%;max-width:720px;max-height:min(86vh,900px);display:flex;flex-direction:column;box-shadow:0 40px 100px -40px rgba(0,0,0,1);transform:translateY(12px);transition:transform .18s;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Inter,sans-serif}' +
    '.lh-legal-overlay.is-open .lh-legal{transform:none}' +
    '.lh-legal-head{display:flex;align-items:center;gap:14px;padding:18px 22px;border-bottom:1px solid rgba(255,255,255,.08)}' +
    '.lh-legal-head .k{font-family:"JetBrains Mono",ui-monospace,Menlo,monospace;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#b6ff3d}' +
    '.lh-legal-head h2{font-size:18px;font-weight:600;letter-spacing:-.02em;margin:0}' +
    '.lh-legal-head .d{margin-left:auto;font-size:12px;color:#71717b;white-space:nowrap}' +
    '.lh-legal-x{background:none;border:1px solid rgba(255,255,255,.14);color:#f4f4f6;width:34px;height:34px;border-radius:10px;cursor:pointer;font-size:18px;line-height:1;flex-shrink:0}' +
    '.lh-legal-x:hover{background:rgba(255,255,255,.06)}' +
    '.lh-legal-body{overflow:auto;padding:22px 24px 28px;font-size:15px;line-height:1.7;color:#c9c9d1;-webkit-overflow-scrolling:touch}' +
    '.lh-legal-body .lh-lead{color:#f4f4f6;font-size:16px;margin:0 0 18px}' +
    '.lh-legal-body h3{color:#f4f4f6;font-size:14px;font-weight:600;letter-spacing:-.01em;margin:22px 0 6px}' +
    '.lh-legal-body p{margin:0 0 12px}.lh-legal-body ul{margin:0 0 12px 18px;padding:0}.lh-legal-body li{margin:0 0 6px}' +
    '.lh-legal-body a{color:#b6ff3d;text-decoration:none}.lh-legal-body a:hover{text-decoration:underline}' +
    '.lh-legal-nav{display:flex;gap:8px;padding:12px 22px;border-top:1px solid rgba(255,255,255,.08);flex-wrap:wrap}' +
    '.lh-legal-nav button{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);color:#c9c9d1;font-size:12.5px;padding:7px 12px;border-radius:9px;cursor:pointer}' +
    '.lh-legal-nav button.on{background:#b6ff3d;color:#0a0a0c;border-color:#b6ff3d;font-weight:600}' +
    '@media (max-width:560px){.lh-legal-overlay{padding:0;align-items:flex-end}.lh-legal{max-height:92vh;border-radius:20px 20px 0 0;border-bottom:0}.lh-legal-head .d{display:none}}';

  var overlay = null, lastFocus = null, current = null;

  function build() {
    var st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);
    overlay = document.createElement('div'); overlay.className = 'lh-legal-overlay'; overlay.setAttribute('role', 'dialog'); overlay.setAttribute('aria-modal', 'true');
    overlay.innerHTML = '<div class="lh-legal"><div class="lh-legal-head"><span class="k"></span><h2></h2><span class="d">Last updated ' + UPDATED + '</span><button class="lh-legal-x" aria-label="Close">×</button></div><div class="lh-legal-body"></div><div class="lh-legal-nav"></div></div>';
    var nav = overlay.querySelector('.lh-legal-nav');
    Object.keys(DOCS).forEach(function (k) { var b = document.createElement('button'); b.type = 'button'; b.textContent = DOCS[k].title; b.setAttribute('data-lh-legal', k); nav.appendChild(b); });
    overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
    overlay.querySelector('.lh-legal-x').addEventListener('click', close);
    document.body.appendChild(overlay);
  }
  function open(key) {
    if (!DOCS[key]) return;
    if (!overlay || !document.body.contains(overlay)) build();
    current = key;
    overlay.querySelector('.k').textContent = DOCS[key].kicker;
    overlay.querySelector('h2').textContent = DOCS[key].title;
    overlay.querySelector('.lh-legal-body').innerHTML = DOCS[key].html;
    overlay.querySelector('.lh-legal-body').scrollTop = 0;
    overlay.querySelectorAll('.lh-legal-nav button').forEach(function (b) { b.classList.toggle('on', b.getAttribute('data-lh-legal') === key); });
    lastFocus = document.activeElement;
    overlay.style.display = 'flex'; document.documentElement.style.overflow = 'hidden';
    setTimeout(function () { overlay.classList.add('is-open'); }, 0); // not rAF: background tabs never paint it
    overlay.querySelector('.lh-legal-x').focus();
    if (location.hash !== '#' + key) history.replaceState(null, '', '#' + key);
    if (window.rybbit && window.rybbit.event) window.rybbit.event('legal_open', { doc: key });
  }
  function close() {
    if (!overlay) return;
    overlay.classList.remove('is-open'); document.documentElement.style.overflow = '';
    setTimeout(function () { overlay.style.display = 'none'; }, 180);
    if (/^#(terms|privacy|refunds)$/.test(location.hash)) history.replaceState(null, '', location.pathname + location.search);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
    current = null;
  }
  document.addEventListener('click', function (e) {
    var t = e.target && e.target.closest ? e.target.closest('[data-lh-legal]') : null;
    if (!t) return;
    e.preventDefault(); open(t.getAttribute('data-lh-legal'));
  }, true);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && current) close(); });
  function fromHash() { var m = location.hash.match(/^#(terms|privacy|refunds)$/); if (m) open(m[1]); }
  window.addEventListener('hashchange', fromHash);
  // The home page rebuilds its DOM after load; give it a moment before honouring a deep link.
  [0, 800, 2000].forEach(function (t) { setTimeout(fromHash, t); });
  window.LeadHunterLegal = { open: open, close: close };
})();
