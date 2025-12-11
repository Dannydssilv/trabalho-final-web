const urlBase = "https://back-end-tf-web-chi.vercel.app";
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const botaoSalvar = document.getElementById("submit");
botaoSalvar.addEventListener("click", salvarFlashcard);

// Carrega os dados iniciais
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
    }
})();

async function salvarFlashcard(e) {
    e.preventDefault(); 

    try {
        const dados = {
            pergunta: document.getElementById("pergunta").value,
            resposta: document.getElementById("resposta").value
        };

        const response = await fetch(`${urlBase}/flashcards/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados), 
        });

        if (!response.ok) throw new Error("Erro ao salvar");

        // --- AQUI ESTÁ A MUDANÇA: JANELA BONITA ---
        mostrarModalBonito("Sucesso!", "Questão alterada com sucesso!", () => {
            window.location.href = "admin.html";
        });

    } catch (error) {
        mostrarModalBonito("Ops!", "Erro ao alterar: " + error.message);
    }
}

// --- FUNÇÃO QUE CRIA A JANELA BONITA ---
function mostrarModalBonito(titulo, mensagem, callback) {
    // Cria o HTML da janela
    const modalDiv = document.createElement("div");
    modalDiv.className = "custom-modal-overlay";
    modalDiv.innerHTML = `
        <div class="custom-modal-box">
            <h3>${titulo}</h3>
            <p>${mensagem}</p>
            <div class="modal-buttons">
                <button id="modal-ok-btn" class="btn-modal btn-confirm">OK</button>
            </div>
        </div>
    `;
    document.body.appendChild(modalDiv);

    // Adiciona ação ao botão OK
    document.getElementById("modal-ok-btn").addEventListener("click", () => {
        modalDiv.remove(); // Fecha a janela
        if (callback) callback(); // Executa a ação (ex: mudar de página)
    });
}