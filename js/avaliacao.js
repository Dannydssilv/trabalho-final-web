// Seleciona todas as estrelas
const stars = document.querySelectorAll('.star');
const formAvaliacao = document.getElementById('form-avaliacao');
const modalAgradecimento = document.getElementById('modal-agradecimento');
const btnFecharAgradecimento = document.getElementById('btn-fechar-agradecimento');

let avaliacaoSelecionada = 0;

// Lógica das Estrelas
stars.forEach(star => {
    star.addEventListener('click', () => {
        // Pega o valor da estrela clicada (1 a 5)
        const value = parseInt(star.getAttribute('data-value'));
        avaliacaoSelecionada = value;

        // Pinta as estrelas
        atualizarEstrelas(value);
    });
});

function atualizarEstrelas(valor) {
    stars.forEach(s => {
        const sValue = parseInt(s.getAttribute('data-value'));
        if (sValue <= valor) {
            s.classList.add('active'); // Fica dourada
        } else {
            s.classList.remove('active'); // Volta a ser cinza
        }
    });
}

// Envio do Formulário
formAvaliacao.addEventListener('submit', (e) => {
    e.preventDefault();

    if (avaliacaoSelecionada === 0) {
        alert("Por favor, selecione pelo menos uma estrela!");
        return;
    }

    // Aqui você enviaria para o banco de dados no futuro
    console.log(`Avaliação: ${avaliacaoSelecionada} estrelas`);
    console.log(`Comentário: ${document.getElementById('comentario').value}`);

    // Mostra o modal de agradecimento
    modalAgradecimento.style.display = 'flex';
});

// Fechar Modal e limpar formulário
btnFecharAgradecimento.addEventListener('click', () => {
    modalAgradecimento.style.display = 'none';
    
    // Reseta o form
    document.getElementById('comentario').value = '';
    avaliacaoSelecionada = 0;
    atualizarEstrelas(0);
});