const urlBase = "https://back-end-tf-web-chi.vercel.app";
const tabelaCorpo = document.getElementById("tabela-corpo");

tabelaCorpo.innerHTML = "<tr><td colspan='4'>Aguarde...</td></tr>"; 

// --- 1. Listeners de Evento ---

// Captura cliques na tabela para delegar a ação de exclusão
tabelaCorpo.addEventListener("click", acao);

// --- 2. Funções de Manipulação ---

function acao(e) {
    // Verifica se o alvo do clique possui a classe 'excluir'
    if (e.target.classList.contains("excluir")) {
        e.preventDefault(); // Impede o comportamento padrão do link
        const id = e.target.getAttribute("data-id"); // Obtém o ID do admin
        excluirAdmin(id); // Chama a função para excluir
    }
}

// Função para excluir um administrador
async function excluirAdmin(id) {
    // Confirmação antes de proceder com a exclusão
    if (!confirm(`Tem certeza que deseja excluir o administrador com ID ${id}?`)) return;

    try {
        const endpoint = `/admin/${id}`; 
        const urlFinal = urlBase + endpoint; 

        const response = await fetch(urlFinal, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        alert("Administrador excluído com sucesso!");
        
        // Recarrega a página atual para atualizar a lista
        window.location.reload(); 
        
    } catch (error) {
        console.error(error);
        alert("Administrador não foi excluído! Verifique a conexão.");
    }
}

(async () => {
    try {
        const endpoint = "/admin"; 
        const urlFinal = urlBase + endpoint; 

        const response = await fetch(urlFinal);

        if (!response.ok) {
            throw new Error("Erro na requisição: " + response.status);
        }

        const data = await response.json();
        tabelaCorpo.innerHTML = "";

        data.forEach((admin) => {
            const linha = document.createElement("tr"); 
            
            linha.innerHTML = `
                <td>${admin.id}</td>
                <td>${admin.nome}</td>
                <td>${admin.email}</td>
                <td>
                    <a class="botao editar" href="ver-admin.html?id=${admin.id}">Ver</a>
                    <a class="botao excluir" data-id="${admin.id}" href="#">Excluir</a>
                </td>
            `;
            
            tabelaCorpo.appendChild(linha); 
        });

    } catch (error) {
        tabelaCorpo.innerHTML = `<tr><td colspan="4">Erro ao carregar dados: ${error.message}</td></tr>`;
    }
})();