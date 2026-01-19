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
  if (!calendarEl) return;

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    locale: "fr",
    firstDay: 1,                 // semaine qui commence le lundi
    fixedWeekCount: false,       // pas de sixième ligne vide inutile
    height: "auto",
    dayMaxEventRows: 2,          // évite des cellules trop hautes

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
          end: "2026-02-19",
          className: "available"
        },
        {
          title: "Réservé",
          start: "2026-02-19",
          end: "2026-02-22",
          className: "reserved"
        },
        {
          title: "Disponible",
          start: "2026-02-22",
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
      ],

    // --- Rendre les étiquettes plus courtes et propres ---
    eventContent(arg) {
      // On affiche juste le titre, sans heure
      return { html: `<span>${arg.event.title}</span>` };
    },

    // --- Infobulles au survol ---
    eventDidMount(info) {
      const tip = document.createElement('div');
      tip.className = 'fc-tooltip';
      tip.textContent = info.event.title;
      document.body.appendChild(tip);

      function move(e) {
        tip.style.left = `${e.pageX}px`;
        tip.style.top  = `${e.pageY}px`;
      }

      function enter(e){
        move(e);
        tip.style.display = 'block';
      }
      function leave(){
        tip.style.display = 'none';
      }

      info.el.addEventListener('mousemove', move);
      info.el.addEventListener('mouseenter', enter);
      info.el.addEventListener('mouseleave', leave);

      // Nettoyage si FullCalendar recycle le nœud
      info.el.addEventListener('remove', () => tip.remove());
    },

    // --- Accessibilité : libellés ARIA utiles ---
    eventMouseEnter(info) {
      info.el.setAttribute('aria-label', `${info.event.title}`);
    }
  });

  calendar.render();
});


// Mettre un petit marqueur sur les samedis
document.addEventListener("DOMContentLoaded", () => {
  const observer = new MutationObserver(() => {
    document.querySelectorAll('.fc-daygrid-day').forEach(cell => {
      const dateStr = cell.getAttribute('data-date'); // YYYY-MM-DD
      if (!dateStr) return;
      const d = new Date(dateStr + 'T00:00:00');
      if (d.getDay() === 6) { // samedi
        cell.style.boxShadow = 'inset 0 0 0 2px rgba(10,92,107,.18)';
        cell.style.borderRadius = '8px';
      }
    });
  });
  observer.observe(document.getElementById('calendar'), { childList: true, subtree: true });
});
``

