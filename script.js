const images = document.querySelectorAll(".gallery img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

images.forEach((img) => {
  img.addEventListener("click", () => {
    lightboxImg.src = img.src;
    lightbox.style.display = "flex";
  });
});

lightbox.addEventListener("click", () => {
  lightbox.style.display = "none";
});

function sendMessage(event) {
  event.preventDefault();
  alert("Merci pour votre message ! Nous vous répondrons rapidement.");
}

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
``
