form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!form.checkValidity()) return;

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();

    saveSubscriber(nome, email);

    // 👉 redireciona pra página de sucesso
    window.location.href = "success.html";
});