  document.getElementById("year").textContent = new Date().getFullYear();

  const mobileBtn = document.getElementById('mobileBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  mobileBtn?.addEventListener('click', () => {
    const open = mobileMenu.style.display === 'flex';
    mobileMenu.style.display = open ? 'none' : 'flex';
    mobileBtn.setAttribute('aria-expanded', String(!open));
  });
  document.querySelectorAll('.mobile-link').forEach(l => l.addEventListener('click', () => {
    mobileMenu.style.display = 'none';
    mobileBtn.setAttribute('aria-expanded', 'false');
  }));

  document.getElementById("contactForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = encodeURIComponent(e.target.name.value);
    const message = encodeURIComponent(e.target.message.value);
    window.location.href = `mailto:matheocillierfavier@gmail.com?subject=Contact Pro - Portfolio&body=Bonjour Mathéo,%0A%0A${message}%0A%0ACordialement,%0A${name}`;
  });

  const cursor = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = (mx - 4) + 'px';
    cursor.style.top = (my - 4) + 'px';
  });
  function animateRing() {
    rx += (mx - rx - 16) * 0.12;
    ry += (my - ry - 16) * 0.12;
    cursorRing.style.left = rx + 'px';
    cursorRing.style.top = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.style.transform = 'scale(2.5)'; cursorRing.style.transform = 'scale(1.5)'; });
    el.addEventListener('mouseleave', () => { cursor.style.transform = 'scale(1)'; cursorRing.style.transform = 'scale(1)'; });
  });

  const socialColors = ['#cccccc','#5865F2','#00f2fe','#1ED760','#E1306C','#FFFC00','#cccccc','#1877F2'];
  document.querySelectorAll('.social-card').forEach((card, i) => {
    const icon = card.querySelector('.social-icon');
    const color = socialColors[i];
    card.addEventListener('mouseenter', () => { icon.style.color = color; card.style.borderColor = color + '33'; });
    card.addEventListener('mouseleave', () => { icon.style.color = ''; card.style.borderColor = ''; });
  });

  function copyIP(button, ipText) {
  navigator.clipboard.writeText(ipText).then(() => {
    const textSpan = button.querySelector('span');
    const icon = button.querySelector('i');
    
    // Sauvegarde du contenu d'origine
    const originalText = textSpan.innerText;
    
    // Changement d'état (Succès)
    textSpan.innerText = "IP Copiée !";
    icon.className = "fa-solid fa-check";
    button.style.borderColor = "#50fa7b";
    button.style.color = "#50fa7b";
    
    // Retour à l'état initial après 2 secondes
    setTimeout(() => {
      textSpan.innerText = originalText;
      icon.className = "fa-solid fa-copy";
      button.style.borderColor = "var(--border)";
      button.style.color = "var(--cyan)";
    }, 2000);
  }).catch(err => {
    console.error('Erreur lors de la copie : ', err);
  });
}