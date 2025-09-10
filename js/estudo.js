document.addEventListener('DOMContentLoaded', () => {
    const studyCard = document.getElementById('studyCard');
    const perguntaText = document.getElementById('pergunta-text');
    const respostaText = document.getElementById('resposta-text');
    const nextCardBtn = document.getElementById('nextCardBtn');

    let flashcards = [];
    let currentCardIndex = 0;

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function loadFlashcards() {
        const savedFlashcards = localStorage.getItem('flashcards');
        if (savedFlashcards) {
            flashcards = JSON.parse(savedFlashcards);
            shuffle(flashcards);
            if (flashcards.length > 0) {
                showCurrentCard();
            } else {
                perguntaText.textContent = "Nenhum flashcard encontrado. Crie alguns!";
                nextCardBtn.style.display = 'none';
            }
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

    loadFlashcards();
});