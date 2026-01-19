
// === LIGHTBOX AMÉLIORÉE ===
const images = document.querySelectorAll('.gallery img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

let currentIndex = 0;

// Création des boutons navigation
const btnPrev = document.createElement('button');
const btnNext = document.createElement('button');

btnPrev.className = 'lightbox-btn prev';
btnNext.className = 'lightbox-btn next';

btnPrev.textContent = '←';
btnNext.textContent = '→';

lightbox.appendChild(btnPrev);
lightbox.appendChild(btnNext);

// Ouvrir la lightbox
function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = images[index].src;
    lightbox.classList.add('open');
}

// Naviguer
function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    openLightbox(currentIndex);
}

function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    openLightbox(currentIndex);
}

// Événements
images.forEach((img, index) => {
    img.addEventListener('click', () => openLightbox(index));
});

btnNext.addEventListener('click', e => {
    e.stopPropagation();
    showNext();
});

btnPrev.addEventListener('click', e => {
    e.stopPropagation();
    showPrev();
});

// Fermer lightbox
lightbox.addEventListener('click', () => {
    lightbox.classList.remove('open');
    lightboxImg.removeAttribute('src');
});

// Navigation clavier
document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;

    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'Escape') lightbox.classList.remove('open');
});
