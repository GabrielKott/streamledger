const form = document.getElementById('newsletter-form');
const modal = document.getElementById('success-modal');
const overlay = modal.querySelector('.modal__overlay');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    abrirModal();
});

function abrirModal() {
    modal.hidden = false;
    document.body.style.overflow = 'hidden'; // trava scroll da página
    modal.querySelector('.modal__card').focus();
}

function fecharModal() {
    modal.hidden = true;
    document.body.style.overflow = '';
}

// Fechar clicando no overlay
overlay.addEventListener('click', fecharModal);

// Fechar com ESC
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.hidden) {
        fecharModal();
    }
});