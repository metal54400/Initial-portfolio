// ==== Réglages rapides ====
const TARGET_EMAIL = "deepstone.studio@gmail.com"; // <-- remplace par ton email
// =========================

// Menu mobile
const toggle = document.querySelector(".nav__toggle");
const links = document.querySelector(".nav__links");

if (toggle && links) {
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  links.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Année footer
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Formulaire -> mailto
const form = document.getElementById("contactForm");
form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const name = data.get("name");
  const email = data.get("email");
  const message = data.get("message");

  const subject = encodeURIComponent(`Contact Portfolio — ${name}`);
  const body = encodeURIComponent(`Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

  window.location.href = `mailto:${TARGET_EMAIL}?subject=${subject}&body=${body}`;
});

// Copier l'IP
const copyBtn = document.getElementById("copyIpBtn");
const ipEl = document.getElementById("serverIp");

copyBtn?.addEventListener("click", async () => {
  const ip = ipEl?.textContent?.trim() || "";
  if (!ip) return;

  try {
    await navigator.clipboard.writeText(ip);
    copyBtn.textContent = "Copié ✅";
    setTimeout(() => (copyBtn.textContent = "Copier l’IP"), 1200);
  } catch {
    alert("Impossible de copier automatiquement. Copie manuellement l'IP : " + ip);
  }
});
