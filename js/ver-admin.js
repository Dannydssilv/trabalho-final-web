const urlBase = "https://back-end-tf-web-chi.vercel.app";
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

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

(async () => {
    try {
        const response = await fetch(`${urlBase}/admin/${id}`);
        if (!response.ok) throw new Error("Erro ao buscar dados");

        const data = await response.json();
        const admin = Array.isArray(data) ? data[0] : data;

        document.getElementById("id").value = admin.id;
        document.getElementById("nome").value = admin.nome;
        document.getElementById("email").value = admin.email;

    } catch (error) {
        console.error(error);
        mostrarModal("Erro", "Não foi possível carregar os dados do administrador.");
    }
})();

botaoSalvar.addEventListener("click", async (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();

    if (!nome || !email) {
        mostrarModal("Atenção", "Por favor, preencha o Nome e o E-mail.");
        return;
    }

    try {
        const dados = { nome, email };

        if (senha) {
            dados.senha = senha;
        }

        const response = await fetch(`${urlBase}/admin/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados),
        });

        if (!response.ok) throw new Error("Erro na requisição: " + response.status);

        mostrarModal("Sucesso!", "Administrador alterado com sucesso!", () => {
            window.location.href = "admin.html";
        });

    } catch (error) {
        console.error("Erro ao salvar:", error);
        mostrarModal("Erro", "Administrador não alterado: " + error.message);
    }
});