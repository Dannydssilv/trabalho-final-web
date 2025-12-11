document.addEventListener('DOMContentLoaded', () => {
    const studyCard = document.getElementById('studyCard');
    const perguntaText = document.getElementById('pergunta-text');
    const respostaText = document.getElementById('resposta-text');
    const nextCardBtn = document.getElementById('nextCardBtn');
    const restartBtn = document.getElementById('restartBtn');

    let flashcards = [];
    let currentCardIndex = 0;

    const urlBase = "https://back-end-tf-web-chi.vercel.app";

    // let prontoFlashcards = [
    //     { pergunta: "Qual é a capital do Brasil?", resposta: "Brasília" },
    //     { pergunta: "Qual é o maior planeta do Sistema Solar?", resposta: "Júpiter" },
    //     { pergunta: "Quem escreveu 'Dom Quixote'?", resposta: "Miguel de Cervantes" },
    //     { pergunta: "Qual é o principal gás na atmosfera da Terra?", resposta: "Nitrogênio" },
    //     { pergunta: "Qual é o metal mais abundante na crosta terrestre?", resposta: "Alumínio" },
    //     { pergunta: "Em que ano a Declaração de Independência do Brasil foi assinada?", resposta: "1822" },
    //     { pergunta: "Qual é a fórmula química da água?", resposta: "H2O" },
    //     { pergunta: "Quem pintou a Mona Lisa?", resposta: "Leonardo da Vinci" },
    //     { pergunta: "Qual é o maior oceano do mundo?", resposta: "Oceano Pacífico" },
    //     { pergunta: "Qual país tem o maior número de pirâmides?", resposta: "Sudão" },
    // ];

    async function pegarFlashBD() {
        try {
            const endpoint = "/flashcards";
            const urlFinal = urlBase + endpoint;

            const response = await fetch(urlFinal);

            if (!response.ok) {
                throw new Error("Erro na requisição: " + response.status);
            }

            const data = response.json();

            return data;

        } catch (error) {
            alert(error.message);
            console.error(error);
            return [];
        }
    }

    async function carregarDados() {
        const prontoFlashcards = await pegarFlashBD();

        // Agora 'prontoFlashcards' tem os dados reais (o array)
        console.log(prontoFlashcards);
        
        return prontoFlashcards;
        // Aqui você chamaria a função que desenha na tela, ex:
        // renderizarFlashcards(prontoFlashcards);
    }

    const prontoFlashcards = carregarDados();

    console.log(prontoFlashcards);

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function loadFlashcards() {
        flashcards = prontoFlashcards;
        shuffle(flashcards);
        if (flashcards.length > 0) {
            showCurrentCard();
        } else {
            perguntaText.textContent = "Nenhum flashcard encontrado. Volte para a página inicial.";
            nextCardBtn.style.display = 'none';
        }
    }

    function showCurrentCard() {
        if (flashcards.length > 0) {
            const currentCard = flashcards[currentCardIndex];
            perguntaText.textContent = currentCard.pergunta;
            respostaText.textContent = currentCard.resposta;
            studyCard.classList.remove('flipped');
        }
    }

    studyCard.addEventListener('click', () => {
        studyCard.classList.toggle('flipped');
    });

    nextCardBtn.addEventListener('click', () => {
        studyCard.classList.remove('flipped');

        setTimeout(() => {
            currentCardIndex++;
            if (currentCardIndex >= flashcards.length) {
                currentCardIndex = 0;
                shuffle(flashcards);
            }
            showCurrentCard();
        }, 600);
    });

    restartBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    loadFlashcards();
});