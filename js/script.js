document.addEventListener('DOMContentLoaded', () => {
    
    // Verifica se estamos na página de criação (crie.html)
    const btnAddPilha = document.getElementById('btnAddPilha');

    if (btnAddPilha) {
        const inputPergunta = document.getElementById('inputPergunta');
        const inputResposta = document.getElementById('inputResposta');
        const btnSalvarJogar = document.getElementById('btnSalvarJogar');
        const cardsContainer = document.getElementById('cardsContainer');
        const currentCardElement = document.getElementById('currentCard');
        const cardInner = currentCardElement.querySelector('.card-inner');
        const btnsVirar = currentCardElement.querySelectorAll('.btn-virar');

        let cardsTemporarios = [];

        btnsVirar.forEach(btn => {
            btn.addEventListener('click', () => cardInner.classList.toggle('flipped'));
        });

        btnAddPilha.addEventListener('click', () => {
            const perguntaTxt = inputPergunta.value.trim();
            const respostaTxt = inputResposta.value.trim();

            if (!perguntaTxt || !respostaTxt) return;

            cardsTemporarios.push({ pergunta: perguntaTxt, resposta: respostaTxt });

            const cardFinalizado = document.createElement('div');
            cardFinalizado.className = 'flashcard-item card-container finished-card';
            cardFinalizado.innerHTML = `
                <div class="card-inner">
                    <div class="card-face card-front" style="background-color: #e0e0e0; border-color: #ccc;">
                        <textarea class="flashcard-textarea" readonly>${perguntaTxt}</textarea>
                    </div>
                </div>
            `;

            cardsContainer.insertBefore(cardFinalizado, currentCardElement);

            inputPergunta.value = "";
            inputResposta.value = "";
            cardInner.classList.remove('flipped');

            setTimeout(() => cardsContainer.scrollLeft = cardsContainer.scrollWidth, 100);
        });

        btnSalvarJogar.addEventListener('click', () => {
            if (cardsTemporarios.length === 0) return;
            localStorage.setItem('flashcards', JSON.stringify(cardsTemporarios));
            window.location.href = "estudo.html";
        });
    }
});