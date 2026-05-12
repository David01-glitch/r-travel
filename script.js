// ===== Welcome / Cookie modal =====
(function(){
  const KEY = "rr_welcome_v1";
  if (sessionStorage.getItem(KEY) === "seen") return;

  const veil = document.createElement("div");
  veil.className = "cookie-veil";
  veil.innerHTML = `
    <div class="cookie-card" role="dialog" aria-modal="true" aria-labelledby="welcomeTitle">
      <div class="compass" aria-hidden="true"></div>
      <h3 id="welcomeTitle">Pack your curiosity?</h3>
      <p>We use a few cookies to make these stories load faster and remember where you left off. No selling, no tracking circus — just the postcards.</p>
      <div class="cookie-actions">
        <button class="btn btn-primary" data-cookie="yes">Yes, take me along</button>
        <button class="btn btn-ghost" data-cookie="no">Maybe later, just browsing</button>
      </div>
      <small>Either way, you stay right here on the site.</small>
    </div>`;
  document.body.appendChild(veil);

  veil.addEventListener("click", (e) => {
    const t = e.target.closest("[data-cookie]");
    if (!t && e.target !== veil) return;
    sessionStorage.setItem(KEY, "seen");
    veil.style.transition = "opacity .3s ease";
    veil.style.opacity = "0";
    setTimeout(() => veil.remove(), 300);
  });
})();

// ===== Inline "Read more" expand/collapse =====
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".more");
  if (!btn) return;
  const card = btn.closest(".card");
  if (!card) return;
  const open = card.classList.toggle("open");
  btn.textContent = open ? "Show less ↑" : "Read more →";
});

// ===== Active nav link =====
(function(){
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a.link").forEach(a => {
    if ((a.getAttribute("href") || "").endsWith(path)) a.classList.add("active");
  });
})();

// ===== Contact form (no backend; opens mail client) =====
const cf = document.getElementById("contactForm");
if (cf) {
  cf.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = encodeURIComponent(cf.name.value || "");
    const from = encodeURIComponent(cf.email.value || "");
    const msg  = encodeURIComponent(cf.message.value || "");
    const body = `From: ${name} <${decodeURIComponent(from)}>%0D%0A%0D%0A${msg}`;
    window.location.href = `mailto:Retiretravel0034@gmail.com?subject=Hello%20from%20Retire%20%26%20Roam&body=${body}`;
  });
}
