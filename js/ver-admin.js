const urlBase = "https://back-end-tf-web-chi.vercel.app";
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

document.getElementById("id").value = "Carregando...";


(async () => {
  try {
    const endpoint = `/admin/${id}`; // Endpoint da API para obter os dados do usuário
    const urlFinal = urlBase + endpoint; // URL completa da requisição

    const response = await fetch(urlFinal);

    if (!response.ok) {
      throw new Error("Erro na requisição: " + response.status);
    }

    const data = await response.json();

    document.getElementById("id").value = data[0].id;
    document.getElementById("nome").value = data[0].nome;
    document.getElementById("email").value = data[0].email;
    document.getElementById("senha").value = data[0].senha;
  } catch (error) {
    document.getElementById("id").value = `Erro na requisição: ${error}`;
  }
})();