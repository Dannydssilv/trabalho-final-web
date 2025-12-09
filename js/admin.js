const urlBase = "https://back-end-tf-web-chi.vercel.app";

const tabelaCorpo = document.getElementById("tabela-corpo");
tabelaCorpo.innerHTML = "Aguarde..."; 


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
                <a class="botao excluir" data-id="${admin.id}">Excluir</a>
            </td>
      `;
      
      tabelaCorpo.appendChild(linha); 
    });

  } catch (error) {
    tabelaCorpo.innerHTML = `<tr><td colspan="4">Erro: ${error}</td></tr>`;
  }
})();