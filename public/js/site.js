(function () {
  // sticky header shadow
  var h = document.getElementById('header');
  var onScroll = function () { if (h) h.classList.toggle('scrolled', window.scrollY > 40); };
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  // mobile drawer
  var d = document.getElementById('drawer'), b = document.querySelector('.burger');
  function toggle(open) { if (!d) return; d.classList.toggle('open', open); d.setAttribute('aria-hidden', !open); if (b) b.setAttribute('aria-expanded', open); document.body.style.overflow = open ? 'hidden' : ''; }
  if (b) b.addEventListener('click', function () { toggle(true); });
  if (d) d.addEventListener('click', function (e) { if (e.target === d || e.target.closest('.drawer-close')) toggle(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') toggle(false); });

  // attribution: remember first landing page + UTMs for the session
  var store = {};
  try { store = JSON.parse(sessionStorage.getItem('hz_attr') || '{}'); } catch (e) {}
  var qs = new URLSearchParams(location.search);
  if (!store.landing_page) {
    store.landing_page = location.pathname + location.search;
    store.referrer = document.referrer || '';
  }
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid'].forEach(function (k) { if (qs.get(k)) store[k] = qs.get(k); });
  try { sessionStorage.setItem('hz_attr', JSON.stringify(store)); } catch (e) {}

  window.dataLayer = window.dataLayer || [];
  document.addEventListener('click', function (e) {
    var a = e.target.closest('[data-track]');
    if (a) window.dataLayer.push({ event: 'click_to_call', location: a.getAttribute('data-track') });
  });

  // lead forms
  document.querySelectorAll('.lead-form').forEach(function (f) {
    Object.keys(store).forEach(function (k) { if (f.elements[k]) f.elements[k].value = store[k]; });
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = f.querySelector('.form-msg'), btn = f.querySelector('button[type=submit]');
      msg.className = 'form-msg'; msg.textContent = '';
      if (!f.elements.name.value.trim() || !f.elements.phone.value.trim()) {
        msg.className = 'form-msg err'; msg.textContent = 'Please add your name and phone number.'; return;
      }
      btn.disabled = true; var label = btn.textContent; btn.textContent = 'Sending…';
      var data = {}; new FormData(f).forEach(function (v, k) { data[k] = v; });
      fetch(f.action, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) })
        .then(function (r) { return r.json().then(function (j) { return { ok: r.ok && j.ok, j: j }; }); })
        .then(function (res) {
          if (res.ok) {
            window.dataLayer.push({ event: 'generate_lead', form_name: data.form_name, interest: data.interest });
            location.href = '/thank-you/';
          } else { throw new Error(res.j.message); }
        })
        .catch(function (err) {
          msg.className = 'form-msg err'; msg.textContent = err.message || 'Something went wrong. Please call us.';
          btn.disabled = false; btn.textContent = label;
        });
    });
  });
})();
