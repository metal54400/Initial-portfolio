// Menu mobile
const toggle = document.querySelector(".nav__toggle");
const links = document.querySelector(".nav__links");

if (toggle && links) {
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  // Fermer le menu quand on clique un lien
  links.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Année footer
document.getElementById("year").textContent = new Date().getFullYear();

// Formulaire -> mailto (simple sans backend)
const form = document.getElementById("contactForm");
form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const name = data.get("name");
  const email = data.get("email");
  const message = data.get("message");

  const subject = encodeURIComponent(`Contact Portfolio — ${name}`);
  const body = encodeURIComponent(`Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

  // Remplace l'email ici :
  window.location.href = `mailto:deepstone.studio@gmail.com?subject=${subject}&body=${body}`;
});


