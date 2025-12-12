const urlBase = "https://back-end-tf-web-chi.vercel.app";
const botaoSalvar = document.getElementById("submit");

const modalAviso = document.getElementById('modal-aviso');
const modalTitulo = document.getElementById('modal-titulo');
const modalMensagem = document.getElementById('modal-mensagem');
const btnModalOk = document.getElementById('btn-modal-ok');

function mostrarModal(titulo, mensagem, callback) {
    modalTitulo.textContent = titulo;
    modalMensagem.textContent = mensagem;
    modalAviso.style.display = 'flex';

    btnModalOk.onclick = () => {
        modalAviso.style.display = 'none';
        if (callback) callback();
    };
}

botaoSalvar.addEventListener("click", async (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();

    if (!nome || !email || !senha) {
        mostrarModal("Atenção", "Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    try {
        const dados = { nome, email, senha };

        const response = await fetch(`${urlBase}/admin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados),
        });

        if (!response.ok) throw new Error("Erro na requisição: " + response.status);

        mostrarModal("Sucesso!", "Administrador inserido com sucesso!", () => {
            window.location.href = "admin.html";
        });

    } catch (error) {
        console.error(error);
        mostrarModal("Erro", "Falha ao cadastrar: " + error.message);
    }
});