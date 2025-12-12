document.addEventListener('DOMContentLoaded', () => {
    const studyCard = document.getElementById('studyCard');
    const perguntaText = document.getElementById('pergunta-text');
    const respostaText = document.getElementById('resposta-text');
    const nextCardBtn = document.getElementById('nextCardBtn');
    const restartBtn = document.getElementById('restartBtn');

    const modalAviso = document.getElementById('modal-aviso');
    const modalTitulo = document.getElementById('modal-titulo');
    const modalMensagem = document.getElementById('modal-mensagem');
    const btnModalOk = document.getElementById('btn-modal-ok');

    let flashcards = [];
    let currentCardIndex = 0;

    function showModal(titulo, msg, callback) {
        modalTitulo.textContent = titulo;
        modalMensagem.textContent = msg;
        modalAviso.style.display = 'flex';

        btnModalOk.onclick = () => {
            modalAviso.style.display = 'none';
            if (callback) callback();
        };
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
                nextCardBtn.style.display = 'none';
            }
        } else {
            perguntaText.textContent = "Nenhum card para revisar.";
            nextCardBtn.style.display = 'none';
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