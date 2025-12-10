const urlBase = "https://trabalho-final-web-ruddy.vercel.app";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const botaoSalvar = document.getElementById("submit");
botaoSalvar.addEventListener("click", salvarFlashcard);

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
        
        const flashcard = Array.isArray(data) ? data[0] : data;

        document.getElementById("id").value = flashcard.id;
        document.getElementById("pergunta").value = flashcard.pergunta;
        document.getElementById("resposta").value = flashcard.resposta;

    } catch (error) {
        document.getElementById("id").value = `Erro: ${error.message}`;
    }
})();

async function salvarFlashcard(e) {
    e.preventDefault(); 

    try {
        const dados = {
            pergunta: document.getElementById("pergunta").value,
            resposta: document.getElementById("resposta").value
        };

        const endpoint = `/flashcards/${id}`; 
        const urlFinal = urlBase + endpoint; 
        const response = await fetch(urlFinal, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json", 
            },
            body: JSON.stringify(dados), 
        });

        if (!response.ok) {
            throw new Error("Erro na requisição: " + response.status);
        }

        alert("Questão alterada com sucesso!");
        window.location.href = "cardsprontos.html";


    } catch (error) {
        alert("Flashcard não pôde ser alterado: " + error.message);
        window.location.href = "cardsprontos.html";
    }
}