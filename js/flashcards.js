const urlBase = "https://back-end-tf-web-chi.vercel.app";

const tabelaCorpo = document.getElementById("tabela-corpo");
tabelaCorpo.innerHTML = "Aguarde..."; 

(async () => {
  try {
    const endpoint = "/flashcards"; 
    const urlFinal = urlBase + endpoint; 

    const response = await fetch(urlFinal);

    if (!response.ok) {
      throw new Error("Erro na requisição: " + response.status);
    }

    const data = await response.json();

    console.log(data);

    tabelaCorpo.innerHTML = "";

    data.forEach((flashcard) => {
    
      const linha = document.createElement("tr"); 
      
      linha.innerHTML = `
              <td>${flashcard.id}</td>
              <td>${flashcard.pergunta}</td>
              <td>${flashcard.resposta}</td>
                <td>
                <a class="botao editar" href="ver-flashcard.html?id=${flashcard.id}">Ver</a>
                <a class="botao excluir" data-id="${flashcard.id}">Excluir</a>
              </td>
              `;
      tabelaCorpo.appendChild(linha); 
    });
  } catch (error) {
    tabelaCorpo.innerHTML = `Erro na requisição: ${error}`;
  }
})();