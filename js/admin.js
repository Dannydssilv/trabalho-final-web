const urlBase = "https://back-end-tf-web-chi.vercel.app";
const tabelaCorpo = document.getElementById("tabela-corpo");

tabelaCorpo.innerHTML = "<tr><td colspan='4'>Carregando flashcards...</td></tr>"; 

tabelaCorpo.addEventListener("click", (e) => {
    const botaoExcluir = e.target.closest(".excluir");
    if (botaoExcluir) {
        e.preventDefault(); 
        const id = botaoExcluir.getAttribute("data-id");
        confirmarExclusao(id);
    }
});

// --- NOVA FUNÇÃO DE CONFIRMAÇÃO BONITA ---
function confirmarExclusao(id) {
    // Cria a janela na tela
    const modalDiv = document.createElement("div");
    modalDiv.className = "custom-modal-overlay";
    modalDiv.innerHTML = `
        <div class="custom-modal-box">
            <h3>Tem certeza?</h3>
            <p>Deseja realmente excluir o flashcard <b>ID ${id}</b>?</p>
            <div class="modal-buttons">
                <button id="btn-nao" class="btn-modal btn-cancel">Cancelar</button>
                <button id="btn-sim" class="btn-modal btn-confirm">Sim, Excluir</button>
            </div>
        </div>
    `;
    document.body.appendChild(modalDiv);

    // Botão Cancelar
    document.getElementById("btn-nao").addEventListener("click", () => {
        modalDiv.remove();
    });

    // Botão Sim (Faz a exclusão de verdade)
    document.getElementById("btn-sim").addEventListener("click", async () => {
        modalDiv.remove(); // Fecha a janela
        try {
            await fetch(`${urlBase}/flashcards/${id}`, { method: "DELETE" });
            mostrarAviso("Sucesso", "Flashcard excluído!", () => window.location.reload());
        } catch (error) {
            mostrarAviso("Erro", "Não foi possível excluir.");
        }
    });
}

function mostrarAviso(titulo, msg, callback) {
    const modalDiv = document.createElement("div");
    modalDiv.className = "custom-modal-overlay";
    modalDiv.innerHTML = `
        <div class="custom-modal-box">
            <h3>${titulo}</h3>
            <p>${msg}</p>
            <button id="btn-ok" class="btn-modal btn-confirm">OK</button>
        </div>
    `;
    document.body.appendChild(modalDiv);
    document.getElementById("btn-ok").addEventListener("click", () => {
        modalDiv.remove();
        if(callback) callback();
    });
}

// Carregar Tabela (Igual ao anterior)
(async () => {
    try {
        const response = await fetch(urlBase + "/flashcards");
        const data = await response.json();
        tabelaCorpo.innerHTML = "";
        
        if (data.length === 0) {
            tabelaCorpo.innerHTML = `<tr><td colspan="4">Nenhum flashcard encontrado.</td></tr>`;
            return;
        }

        data.forEach((card) => {
            const linha = document.createElement("tr"); 
            linha.innerHTML = `
                <td>${card.id}</td>
                <td>${card.pergunta}</td>
                <td>${card.resposta}</td>
                <td>
                    <a class="botao editar" href="ver-flashcard.html?id=${card.id}"><i class="fas fa-edit"></i></a>
                    <a class="botao excluir" data-id="${card.id}" href="#" style="color: red; margin-left: 10px;"><i class="fas fa-trash-alt"></i></a>
                </td>
            `;
            tabelaCorpo.appendChild(linha); 
        });
    } catch (error) {
        tabelaCorpo.innerHTML = `<tr><td colspan="4">Erro ao carregar.</td></tr>`;
    }
})();