const form = document.getElementById('newsletter-form');
const modal = document.getElementById('modal-newsletter-success');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    abrirModal();
});

function abrirModal() {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function fecharModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

// Fechar clicando fora do card
modal.addEventListener('click', function (e) {
    if (e.target === modal) fecharModal();
});

// Fechar com ESC
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.style.display === 'flex') fecharModal();
});