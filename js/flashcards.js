const urlBase = "https://trabalho-final-web-ruddy.vercel.app";
const tabelaCorpo = document.getElementById("tabela-corpo");

tabelaCorpo.innerHTML = "<tr><td colspan='4'>Aguarde...</td></tr>"; 

// 1. Adiciona o listener de evento na tabela (Delegação de Eventos)
tabelaCorpo.addEventListener("click", acao);

// 2. Função para lidar com cliques nos botões da tabela
function acao(e) {
    // Verifica se o elemento clicado é o botão de excluir
    if (e.target.classList.contains("excluir")) {
        e.preventDefault(); // Impede o comportamento padrão do link
        const id = e.target.getAttribute("data-id"); // Obtém o ID do flashcard
        excluirFlashcard(id); // Chama a função para excluir
    }
}

// 3. Função para excluir um flashcard
async function excluirFlashcard(id) {
    // Adicionei uma confirmação para evitar exclusões acidentais
    if (!confirm("Tem certeza que deseja excluir este flashcard?")) return;

    try {
        const endpoint = `/flashcards/${id}`; 
        const urlFinal = urlBase + endpoint;

        const response = await fetch(urlFinal, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        alert("Flashcard excluído com sucesso!");
        
        // Recarrega a página de listagem de flashcards
        window.location.href = "flashcards.html"; 
        
    } catch (error) {
        console.error(error);
        alert("O flashcard não foi excluído!");
    }
}

// 4. Busca os flashcards e preenche a tabela
(async () => {
    try {
        const endpoint = "/flashcards"; 
        const urlFinal = urlBase + endpoint; 

        const response = await fetch(urlFinal);

        if (!response.ok) {
            throw new Error("Erro na requisição: " + response.status);
        }

        const data = await response.json();

        tabelaCorpo.innerHTML = "";

        data.forEach((flashcard) => {
            const linha = document.createElement("tr"); 
            
            linha.innerHTML = `
                <td>${flashcard.id}</td>
                <td>${flashcard.pergunta}</td>
                <td>${flashcard.resposta}</td>
                <td>
                    <a class="botao editar" href="ver-flashcard.html?id=${flashcard.id}">Ver</a>
                    <a class="botao excluir" data-id="${flashcard.id}" href="#">Excluir</a>
                </td>
            `;
            
            tabelaCorpo.appendChild(linha); 
        });

    } catch (error) {
        tabelaCorpo.innerHTML = `<tr><td colspan="4">Erro na requisição: ${error.message}</td></tr>`;
    }
})();