document.addEventListener('DOMContentLoaded', () => {
    const flashcardGrid = document.getElementById('flashcardGrid');
    const addFlashcardButton = document.getElementById('addFlashcardButton');
    const playButton = document.querySelector('.play-button');

    let cardCount = 1;

    function addFlashcard() {
        cardCount++;
        const newFlashcardHTML = `
            <div class="flashcard-item card-container">
                <input type="checkbox" id="card-${cardCount}-flip" class="card-flip-checkbox">
                <label for="card-${cardCount}-flip" class="card-inner">
                    <div class="card-face card-front">
                        <textarea placeholder="Pergunta aqui..." class="flashcard-textarea"></textarea>
                    </div>
                    <div class="card-face card-back">
                        <textarea placeholder="Resposta aqui..." class="flashcard-textarea"></textarea>
                    </div>
                </label>
            </div>
        `;
        
        addFlashcardButton.insertAdjacentHTML('beforebegin', newFlashcardHTML);
    }

    addFlashcardButton.addEventListener('click', addFlashcard);

    playButton.addEventListener('click', () => {
        const allFlashcards = [];
        const cardContainers = document.querySelectorAll('.card-container');
        
        cardContainers.forEach(card => {
            const pergunta = card.querySelector('.card-front .flashcard-textarea').value;
            const resposta = card.querySelector('.card-back .flashcard-textarea').value;
            
            if (pergunta.trim() !== '' && resposta.trim() !== '') {
                allFlashcards.push({ pergunta: pergunta, resposta: resposta });
            }
        });

        localStorage.setItem('flashcards', JSON.stringify(allFlashcards));

        window.location.href = 'estudo.html';
    });
});