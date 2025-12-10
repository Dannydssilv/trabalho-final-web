const urlBase = "https://trabalho-final-web-ruddy.vercel.app";

const botaoSalvar = document.getElementById("submit");
botaoSalvar.addEventListener("click", inserirFlashcard);

async function inserirFlashcard(e) {
    e.preventDefault(); // Impede o comportamento padrão do botão

    try {
        const dados = {
            pergunta: document.getElementById("pergunta").value, 
            resposta: document.getElementById("resposta").value
        };

        if (!dados.pergunta || !dados.resposta) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        const endpoint = "/flashcards"; 
        const urlFinal = urlBase + endpoint; 

        const response = await fetch(urlFinal, {
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
            },
            body: JSON.stringify(dados), 
        });
        
        if (!response.ok) {
            throw new Error("Erro na requisição: " + response.status);
        }

        alert("Flashcard inserido com sucesso!");
        window.location.href = "flashcards.html";

    } catch (error) {
        alert("Flashcard não inserido: " + error.message);
        window.location.href = "flashcards.html";
    }
}