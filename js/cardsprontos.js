document.addEventListener('DOMContentLoaded', () => {
    const studyCard = document.getElementById('studyCard');
    const perguntaText = document.getElementById('pergunta-text');
    const respostaText = document.getElementById('resposta-text');
    const nextCardBtn = document.getElementById('nextCardBtn');
    const restartBtn = document.getElementById('restartBtn');

    // Elementos do Modal
    const modalAviso = document.getElementById('modal-aviso');
    const modalTitulo = document.getElementById('modal-titulo');
    const modalMensagem = document.getElementById('modal-mensagem');
    const btnModalOk = document.getElementById('btn-modal-ok');

    let flashcards = [];
    let currentCardIndex = 0;

    const urlBase = "https://back-end-tf-web-chi.vercel.app";

    // --- FUNÇÃO PARA MOSTRAR A JANELA BONITA ---
    function mostrarModal(titulo, mensagem, callback) {
        modalTitulo.textContent = titulo;
        modalMensagem.textContent = mensagem;
        
        // Mostra o modal (muda o display de none para flex)
        modalAviso.style.display = 'flex';
        
        // Define o que acontece ao clicar em OK
        btnModalOk.onclick = () => {
            modalAviso.style.display = 'none'; // Esconde
            if (callback) callback(); // Executa a ação seguinte
        };
    }

    // 1. Buscar do Banco
    async function pegarFlashBD() {
        try {
            const response = await fetch(urlBase + "/flashcards");
            if (!response.ok) throw new Error("Erro na requisição");
            const data = await response.json(); 
            return data;
        } catch (error) {
            console.error(error);
            mostrarModal("Ops!", "Erro ao buscar cartões: " + error.message);
            return [];
        }
    }

    // 2. Embaralhar
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // 3. Mostrar Card
    function showCurrentCard() {
        if (flashcards.length > 0) {
            const currentCard = flashcards[currentCardIndex];
            perguntaText.textContent = currentCard.pergunta; 
            respostaText.textContent = currentCard.resposta;
            studyCard.classList.remove('flipped');
        }
    }

    // 4. Iniciar Jogo
    async function iniciarJogo() {
        perguntaText.textContent = "Carregando flashcards...";
        
        const dadosDoBanco = await pegarFlashBD();

        if (!dadosDoBanco || dadosDoBanco.length === 0) {
            perguntaText.textContent = "Nenhum flashcard encontrado.";
            nextCardBtn.style.display = 'none';
            return;
        }

        flashcards = dadosDoBanco;
        shuffle(flashcards);
        showCurrentCard();
    }

    // --- EVENTOS ---

    studyCard.addEventListener('click', () => {
        studyCard.classList.toggle('flipped');
    });

    nextCardBtn.addEventListener('click', () => {
        studyCard.classList.remove('flipped');

        setTimeout(() => {
            currentCardIndex++;
            
            // SE ACABOU A LISTA:
            if (currentCardIndex >= flashcards.length) {
                // CHAMA O MODAL BONITO EM VEZ DO ALERT
                mostrarModal("Parabéns!", "Você completou todos os cards! Começando de novo...", () => {
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
        window.location.href = 'index.html';
    });

    iniciarJogo();
});