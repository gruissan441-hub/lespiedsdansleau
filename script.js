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



// --- CALENDRIER FULLCALENDAR ---
document.addEventListener("DOMContentLoaded", function () {
  const calendarEl = document.getElementById("calendar");

  if (calendarEl) {
    const calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: "dayGridMonth",
      locale: "fr",
      headerToolbar: {
        left: "prev,next",
        center: "title",
        right: ""
      },

      // ---- LISTE DES DISPONIBILITÉS / RÉSERVATIONS ----
      events: [
        {
          title: "Disponible",
          start: "2026-01-01",
          end: "2026-07-11",
          className: "available"
        },
        {
          title: "Réservé",
          start: "2026-07-11",
          end: "2026-07-25",
          className: "reserved"
        },
        {
          title: "Disponible",
          start: "2026-07-25",
          end: "2026-12-31",
          className: "available"
        }
      ]
    });

    calendar.render();
  }
});
