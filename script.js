document.addEventListener('DOMContentLoaded', () => {
  
  // --- 1. GESTION DU CURSEUR (CORRIGÉ) ---
  const cursor = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursorRing');
  
  // On n'active le curseur personnalisé que sur Desktop (> 768px)
  if (cursor && cursorRing && window.matchMedia("(min-width: 769px)").matches) {
    
    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    // Écouteur global sur la fenêtre pour capter la souris partout
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Le point central suit INSTANTANÉMENT la souris via transform
      // C'est plus fiable que left/top qui peuvent laguer au scroll
      cursor.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    });

    // Animation fluide pour l'anneau extérieur (effet de traînée)
    function animateRing() {
      // Interpolation pour un mouvement doux
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      
      cursorRing.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px)`;
      
      requestAnimationFrame(animateRing);
    }
    
    // Lancer l'animation
    animateRing();

    // Effets au survol des éléments interactifs
    const interactiveElements = document.querySelectorAll('a, button, .card, input, textarea, .copy-ip-btn');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px) scale(2.5)`;
        cursorRing.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px) scale(1.5)`;
        cursorRing.style.borderColor = 'rgba(0, 255, 200, 0.8)';
      });
      
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px) scale(1)`;
        cursorRing.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px) scale(1)`;
        cursorRing.style.borderColor = 'rgba(0, 255, 200, 0.4)';
      });
    });
  }

  // --- 2. MENU MOBILE ---
  const mobileBtn = document.getElementById('mobileBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuIconBars = document.getElementById('menuIconBars');
  const menuIconX = document.getElementById('menuIconX');

  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      const isExpanded = mobileBtn.getAttribute('aria-expanded') === 'true';
      
      if (!isExpanded) {
        mobileMenu.style.display = 'flex';
        mobileBtn.setAttribute('aria-expanded', 'true');
        // Animation icône
        if(menuIconBars) menuIconBars.style.opacity = '0';
        if(menuIconX) {
            menuIconX.style.opacity = '1';
            menuIconX.style.transform = 'scale(1)';
        }
      } else {
        mobileMenu.style.display = 'none';
        mobileBtn.setAttribute('aria-expanded', 'false');
        // Animation icône
        if(menuIconBars) menuIconBars.style.opacity = '1';
        if(menuIconX) {
            menuIconX.style.opacity = '0';
            menuIconX.style.transform = 'scale(0.5)';
        }
      }
    });

    // Fermer le menu quand on clique sur un lien
    document.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.style.display = 'none';
        mobileBtn.setAttribute('aria-expanded', 'false');
        if(menuIconBars) menuIconBars.style.opacity = '1';
        if(menuIconX) {
            menuIconX.style.opacity = '0';
            menuIconX.style.transform = 'scale(0.5)';
        }
      });
    });
  }

  // --- 3. COULEURS RÉSEAUX SOCIAUX ---
  const socialColors = ['#cccccc','#5865F2','#00f2fe','#1ED760','#E1306C','#FFFC00','#cccccc','#1877F2'];
  document.querySelectorAll('.social-card').forEach((card, i) => {
    const icon = card.querySelector('.social-icon');
    // Vérification si l'icône existe pour éviter les erreurs
    if(icon) {
        const color = socialColors[i] || '#cccccc';
        card.addEventListener('mouseenter', () => { 
            icon.style.color = color; 
            card.style.borderColor = color + '33'; // Ajoute de la transparence
        });
        card.addEventListener('mouseleave', () => { 
            icon.style.color = ''; 
            card.style.borderColor = ''; 
        });
    }
  });

  // --- 4. FONCTION COPIER IP ---
  window.copyIP = function(button, ipText) {
    navigator.clipboard.writeText(ipText).then(() => {
      const textSpan = button.querySelector('span');
      const icon = button.querySelector('i');
      
      // Sauvegarde du contenu d'origine
      const originalText = textSpan ? textSpan.innerText : "Copier";
      
      // Changement d'état (Succès)
      if(textSpan) textSpan.innerText = "IP Copiée !";
      if(icon) icon.className = "fa-solid fa-check";
      
      button.style.borderColor = "#50fa7b";
      button.style.color = "#50fa7b";
      
      // Retour à l'état initial après 2 secondes
      setTimeout(() => {
        if(textSpan) textSpan.innerText = originalText;
        if(icon) icon.className = "fa-solid fa-copy";
        button.style.borderColor = "var(--border)";
        button.style.color = "var(--cyan)";
      }, 2000);
    }).catch(err => {
      console.error('Erreur lors de la copie : ', err);
    });
  };

  // --- 5. FORMULAIRE DE CONTACT ---
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = encodeURIComponent(e.target.name.value);
        const message = encodeURIComponent(e.target.message.value);
        window.location.href = `mailto:matheocillierfavier@gmail.com?subject=Contact Pro - Portfolio&body=Bonjour Mathéo,%0A%0A${message}%0A%0ACordialement,%0A${name}`;
      });
  }

  // --- 6. MISE À JOUR ANNÉE FOOTER ---
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});