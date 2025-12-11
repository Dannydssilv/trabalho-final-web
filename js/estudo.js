document.addEventListener('DOMContentLoaded', () => {
    const studyCard = document.getElementById('studyCard');
    const perguntaText = document.getElementById('pergunta-text');
    const respostaText = document.getElementById('resposta-text');
    const nextCardBtn = document.getElementById('nextCardBtn');
    const restartBtn = document.getElementById('restartBtn');

    let flashcards = [];
    let currentCardIndex = 0;

    function showModal(titulo, msg, callback) {
        const modalDiv = document.createElement("div");
        modalDiv.className = "custom-modal-overlay";
        modalDiv.innerHTML = `
            <div class="custom-modal-box">
                <h3 style="color: #9370db;">${titulo}</h3>
                <p>${msg}</p>
                <button id="btn-modal-ok" class="btn-modal btn-confirm">OK</button>
            </div>
        `;
        document.body.appendChild(modalDiv);
        document.getElementById("btn-modal-ok").addEventListener("click", () => {
            modalDiv.remove();
            if(callback) callback();
        });
    }

    function loadFlashcards() {
        const savedFlashcards = localStorage.getItem('flashcards');
        if (savedFlashcards) {
            flashcards = JSON.parse(savedFlashcards);
            shuffle(flashcards);
            if (flashcards.length > 0) {
                showCurrentCard();
            } else {
                perguntaText.textContent = "Lista vazia.";
            }
        }
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
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
                // AQUI: Janela bonita em vez de alert
                showModal("Parabéns!", "Você finalizou a rodada! Vamos reembaralhar.", () => {
                    currentCardIndex = 0;
                    shuffle(flashcards);
                    showCurrentCard();
                });
            } else {
                showCurrentCard();
            }
        }, 300);
    });

    restartBtn.addEventListener('click', () => {
        window.location.href = 'crie.html';
    });

    loadFlashcards();
});