const urlBase = "https://back-end-tf-web-chi.vercel.app";
const tabelaCorpo = document.getElementById("tabela-corpo");

const modalOverlay = document.getElementById("modal-confirmacao");
const btnCancelarModal = document.getElementById("btn-cancelar-modal");
const btnConfirmarModal = document.getElementById("btn-confirmar-modal");
const spanIdExclusao = document.getElementById("id-exclusao");

let idParaExcluir = null;

tabelaCorpo.innerHTML = "<tr><td colspan='4'>Carregando flashcards...</td></tr>"; 

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
                    <a class="botao editar" href="ver-flashcard.html?id=${card.id}" title="Editar" style="margin-right: 10px; color: #0984e3;">
                        <i class="fas fa-edit"></i>
                    </a>
                    <a class="botao excluir" data-id="${card.id}" href="#" title="Excluir" style="color: #d63031;">
                        <i class="fas fa-trash-alt"></i>
                    </a>
                </td>
            `;
            tabelaCorpo.appendChild(linha); 
        });

    } catch (error) {
        tabelaCorpo.innerHTML = `<tr><td colspan="4" style="color:red">Erro ao carregar dados.</td></tr>`;
    }
})();

tabelaCorpo.addEventListener("click", (e) => {
    const botaoExcluir = e.target.closest(".excluir");
    
    if (botaoExcluir) {
        e.preventDefault(); 
        const id = botaoExcluir.getAttribute("data-id");
        
        idParaExcluir = id;
        spanIdExclusao.textContent = id;
        modalOverlay.style.display = "flex";
    }
});

btnCancelarModal.addEventListener("click", () => {
    modalOverlay.style.display = "none";
    idParaExcluir = null;
});

btnConfirmarModal.addEventListener("click", async () => {
    if (!idParaExcluir) return;

    const textoOriginal = btnConfirmarModal.innerText;
    btnConfirmarModal.innerText = "Excluindo...";
    btnConfirmarModal.disabled = true;

    try {
        const response = await fetch(`${urlBase}/flashcards/${idParaExcluir}`, { method: "DELETE" });

        if (!response.ok) throw new Error("Erro ao excluir");

        window.location.reload(); 

    } catch (error) {
        console.error(error);
        alert("Erro ao excluir. Tente novamente."); 
        modalOverlay.style.display = "none";
    } finally {
        btnConfirmarModal.innerText = textoOriginal;
        btnConfirmarModal.disabled = false;
    }
});