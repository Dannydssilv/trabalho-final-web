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

    const pergunta = document.getElementById("pergunta").value.trim();
    const resposta = document.getElementById("resposta").value.trim();

    if (!pergunta || !resposta) {
        mostrarModal("Atenção", "Preencha a pergunta e a resposta!");
        return;
    }

    try {
        const dados = { pergunta, resposta };

        const response = await fetch(`${urlBase}/flashcards`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados),
        });

        if (!response.ok) throw new Error("Erro na requisição: " + response.status);

        mostrarModal("Sucesso!", "Flashcard inserido com sucesso!", () => {
            window.location.href = 'admin.html';
        });

    } catch (error) {
        console.error(error);
        mostrarModal("Erro", "Não foi possível inserir o card.");
    }
});