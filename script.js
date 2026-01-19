// Gallery Lightbox
const images = document.querySelectorAll('.gallery img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
if (images.length && lightbox && lightboxImg) {
  images.forEach((img) => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightbox.style.display = 'flex';
    });
  });
  lightbox.addEventListener('click', () => {
    lightbox.style.display = 'none';
    lightboxImg.removeAttribute('src');
  });
}

// ---- Form submit (Ajax + Formspree) ----
(function () {
  const form = document.getElementById('contact-form');
  const statusEl = document.getElementById('form-status');

  if (!form) return;

  async function sendMessage(event) {
    event.preventDefault();

    // Anti-bot: honeypot
    const hp = form.querySelector('input[name="website"]');
    if (hp && hp.value.trim() !== '') {
      statusEl.textContent = 'Merci, votre message a été envoyé.';
      form.reset();
      return;
    }

    // Validation HTML5
    if (!form.checkValidity()) {
      statusEl.textContent = 'Merci de vérifier les champs requis.';
      return;
    }

    statusEl.textContent = 'Envoi en cours…';

    try {
      const formData = new FormData(form);
      const res = await fetch(form.action, {
        method: form.method || 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        statusEl.textContent = 'Merci pour votre message ! Nous vous répondrons rapidement.';
        form.reset();
      } else {
        let msg = 'Une erreur est survenue lors de l’envoi. Merci de réessayer.';
        try {
          const data = await res.json();
          if (data && data.errors) {
            msg = data.errors.map(e => e.message).join(' ');
          } else if (data && data.error) {
            msg = data.error;
          }
        } catch (_) { /* Réponse non JSON */ }
        statusEl.textContent = msg;
      }
    } catch (err) {
      statusEl.textContent = 'Impossible de contacter le service. Vérifiez votre connexion ou réessayez plus tard.';
    }
  }

  form.addEventListener('submit', sendMessage);
})();

// Menu burger
const toggleBtn = document.querySelector('.menu-toggle');
const menuLinks = document.getElementById('menu-links');
if (toggleBtn && menuLinks) {
  toggleBtn.addEventListener('click', () => {
    const open = menuLinks.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggleBtn.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  });
  // Ferme au clic sur un lien
  menuLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      menuLinks.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.setAttribute('aria-label', 'Ouvrir le menu');
    });
  });
}
