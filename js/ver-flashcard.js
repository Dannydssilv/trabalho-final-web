const urlBase = "https://back-end-tf-web-chi.vercel.app";
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

document.getElementById("id").value = "Carregando...";

(async () => {
  try {
    const endpoint = `/flashcards/${id}`; 
    const urlFinal = urlBase + endpoint; 

    const response = await fetch(urlFinal);

    if (!response.ok) {
      throw new Error("Erro na requisição: " + response.status);
    }

    const data = await response.json();

    document.getElementById("id").value = data[0].id;
    document.getElementById("pergunta").innerText = data[0].pergunta;
    document.getElementById("resposta").value = data[0].resposta;


  } catch (error) {
    document.getElementById("id").value = `Erro na requisição: ${error}`;
  }
})();