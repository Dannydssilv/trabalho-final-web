const urlBase = "https://back-end-tf-web-chi.vercel.app";

const menuFlashcards = document.getElementById("menu-flashcards");
const menuAvaliacoes = document.getElementById("menu-avaliacoes");
const viewFlashcards = document.getElementById("view-flashcards");
const viewAvaliacoes = document.getElementById("view-avaliacoes");

const tabelaFlashcards = document.getElementById("tabela-flashcards");
const tabelaAvaliacoes = document.getElementById("tabela-avaliacoes");

const modalOverlay = document.getElementById("modal-confirmacao");
const btnCancelarModal = document.getElementById("btn-cancelar-modal");
const btnConfirmarModal = document.getElementById("btn-confirmar-modal");
const spanIdExclusao = document.getElementById("id-exclusao");

let itemParaExcluir = null;
let tipoExclusao = ""; 

menuFlashcards.addEventListener("click", () => {
    ativarAba(menuFlashcards, viewFlashcards);
    carregarFlashcards();
});

menuAvaliacoes.addEventListener("click", () => {
    ativarAba(menuAvaliacoes, viewAvaliacoes);
    carregarAvaliacoes();
});

function ativarAba(menuItem, viewItem) {
    document.querySelectorAll(".menu-item").forEach(el => el.classList.remove("active"));
    document.querySelectorAll(".section-view").forEach(el => el.classList.remove("active"));
    
    menuItem.classList.add("active");
    viewItem.classList.add("active");
}

async function carregarFlashcards() {
    tabelaFlashcards.innerHTML = "<tr><td colspan='4'>Carregando flashcards...</td></tr>";
    try {
        const response = await fetch(urlBase + "/flashcards");
        const data = await response.json();
        
        tabelaFlashcards.innerHTML = "";
        if (data.length === 0) {
            tabelaFlashcards.innerHTML = `<tr><td colspan="4">Nenhum flashcard encontrado.</td></tr>`;
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
                    <a class="botao excluir" data-id="${card.id}" data-tipo="flashcard" href="#" title="Excluir" style="color: #d63031;">
                        <i class="fas fa-trash-alt"></i>
                    </a>
                </td>
            `;
            tabelaFlashcards.appendChild(linha);
        });
    } catch (error) {
        tabelaFlashcards.innerHTML = `<tr><td colspan="4" style="color:red">Erro ao carregar dados.</td></tr>`;
    }
}

async function carregarAvaliacoes() {
    tabelaAvaliacoes.innerHTML = "<tr><td colspan='4'>Carregando avaliações...</td></tr>";
    try {
        const response = await fetch(urlBase + "/avaliacoes");
        const data = await response.json();
        
        tabelaAvaliacoes.innerHTML = "";
        if (data.length === 0) {
            tabelaAvaliacoes.innerHTML = `<tr><td colspan="4">Nenhuma avaliação encontrada.</td></tr>`;
            return;
        }

        data.forEach((av) => {
            const estrelasHTML = Array(5).fill(0).map((_, i) => 
                `<i class="fas fa-star" style="color: ${i < av.nota ? '#f1c40f' : '#ddd'}; font-size: 0.8rem;"></i>`
            ).join('');

            const linha = document.createElement("tr");
            linha.innerHTML = `
                <td>${av.id}</td>
                <td style="white-space: nowrap;">${estrelasHTML}</td>
                <td>${av.comentario || "<i style='color:#ccc'>Sem comentário</i>"}</td>
                <td>
                    <a class="botao excluir" data-id="${av.id}" data-tipo="avaliacao" href="#" title="Excluir" style="color: #d63031;">
                        <i class="fas fa-trash-alt"></i>
                    </a>
                </td>
            `;
            tabelaAvaliacoes.appendChild(linha);
        });
    } catch (error) {
        tabelaAvaliacoes.innerHTML = `<tr><td colspan="4" style="color:red">Erro ao carregar avaliações.</td></tr>`;
    }
}


document.addEventListener("click", (e) => {
    const botaoExcluir = e.target.closest(".excluir");
    if (botaoExcluir) {
        e.preventDefault();
        const id = botaoExcluir.getAttribute("data-id");
        const tipo = botaoExcluir.getAttribute("data-tipo"); 

        itemParaExcluir = id;
        tipoExclusao = tipo;
        
        spanIdExclusao.textContent = `${tipo === 'flashcard' ? 'Card' : 'Avaliação'} #${id}`;
        modalOverlay.style.display = "flex";
    }
});

btnCancelarModal.addEventListener("click", () => {
    modalOverlay.style.display = "none";
    itemParaExcluir = null;
    tipoExclusao = "";
});

btnConfirmarModal.addEventListener("click", async () => {
    if (!itemParaExcluir) return;

    const textoOriginal = btnConfirmarModal.innerText;
    btnConfirmarModal.innerText = "Excluindo...";
    btnConfirmarModal.disabled = true;

    const endpoint = tipoExclusao === 'flashcard' ? 'flashcards' : 'avaliacoes';

    try {
        const response = await fetch(`${urlBase}/${endpoint}/${itemParaExcluir}`, { method: "DELETE" });

        if (!response.ok) throw new Error("Erro ao excluir");

        modalOverlay.style.display = "none";
        
        if (tipoExclusao === 'flashcard') {
            carregarFlashcards();
        } else {
            carregarAvaliacoes();
        }

    } catch (error) {
        console.error(error);
        alert("Erro ao excluir. Tente novamente.");
        modalOverlay.style.display = "none";
    } finally {
        btnConfirmarModal.innerText = textoOriginal;
        btnConfirmarModal.disabled = false;
        itemParaExcluir = null;
    }
});

carregarFlashcards();