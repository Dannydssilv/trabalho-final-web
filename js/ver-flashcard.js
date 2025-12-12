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
        const response = await fetch(`${urlBase}/flashcards/${id}`);
        if (!response.ok) throw new Error("Erro na requisição");
        
        const data = await response.json();
        const flashcard = Array.isArray(data) ? data[0] : data;

        document.getElementById("id").value = flashcard.id;
        document.getElementById("pergunta").value = flashcard.pergunta;
        document.getElementById("resposta").value = flashcard.resposta;

    } catch (error) {
        document.getElementById("id").value = "Erro";
        console.error(error);
        mostrarModal("Erro", "Falha ao carregar dados do card.");
    }
})();

botaoSalvar.addEventListener("click", async (e) => {
    e.preventDefault(); 

    const pergunta = document.getElementById("pergunta").value.trim();
    const resposta = document.getElementById("resposta").value.trim();

    if (!pergunta || !resposta) {
        mostrarModal("Atenção", "Preencha pergunta e resposta.");
        return;
    }

    try {
        const dados = { pergunta, resposta };

        const response = await fetch(`${urlBase}/flashcards/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados), 
        });

        if (!response.ok) throw new Error("Erro ao salvar");

        mostrarModal("Sucesso!", "Questão alterada com sucesso!", () => {
            window.location.href = "admin.html";
        });

    } catch (error) {
        console.error(error);
        mostrarModal("Ops!", "Erro ao alterar: " + error.message);
    }
});