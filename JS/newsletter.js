/**
 * StreamLedger — Newsletter Form
 * Valida o formulário Bootstrap, exibe feedback inline via JS
 * e salva o inscrito no localStorage.
 */

(function () {
    'use strict';

    const form = document.getElementById('newsletter-form');
    const submitBtn = document.getElementById('submit-btn');
    const alertOk = document.getElementById('form-success');
    const alertErr = document.getElementById('form-error');
    const successMsg = document.getElementById('success-msg');

    if (!form) return;

    /* ── Helpers ─────────────────────────────────────── */

    function showAlert(el) {
        [alertOk, alertErr].forEach(a => a.classList.add('d-none'));
        el.classList.remove('d-none');
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function hideAlerts() {
        [alertOk, alertErr].forEach(a => a.classList.add('d-none'));
    }

    function setLoading(on) {
        submitBtn.disabled = on;
        submitBtn.textContent = on ? 'Enviando…' : 'Concluir';
    }

    function saveSubscriber(nome, email) {
        const key = 'streamledger_subscribers';
        const list = JSON.parse(localStorage.getItem(key) || '[]');
        list.push({ nome, email, date: new Date().toLocaleDateString('pt-BR') });
        localStorage.setItem(key, JSON.stringify(list));
    }

    function alreadySubscribed(email) {
        const key = 'streamledger_subscribers';
        const list = JSON.parse(localStorage.getItem(key) || '[]');
        return list.some(s => s.email.toLowerCase() === email.toLowerCase());
    }

    /* ── Submit ───────────────────────────────────────── */

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        e.stopPropagation();

        hideAlerts();

        // Aciona validação nativa do Bootstrap
        form.classList.add('was-validated');

        if (!form.checkValidity()) {
            showAlert(alertErr);
            return;
        }

        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();

        // Verifica duplicidade
        if (alreadySubscribed(email)) {
            successMsg.textContent =
                `O e-mail ${email} já está cadastrado. Fique de olho nas novidades!`;
            showAlert(alertOk);
            return;
        }

        // Simula envio (loading state)
        setLoading(true);

        setTimeout(() => {
            saveSubscriber(nome, email);

            successMsg.textContent =
                `Obrigado, ${nome}! Você receberá as novidades em ${email}.`;

            form.reset();
            form.classList.remove('was-validated');
            setLoading(false);
            showAlert(alertOk);
        }, 900);
    });

    /* ── Limpa alertas ao digitar ─────────────────────── */
    form.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', hideAlerts);
    });

})();
