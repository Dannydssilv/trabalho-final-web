const stars = document.querySelectorAll('.star');
const formAvaliacao = document.getElementById('form-avaliacao');
const modalAgradecimento = document.getElementById('modal-agradecimento');
const btnFecharAgradecimento = document.getElementById('btn-fechar-agradecimento');

let avaliacaoSelecionada = 0;

stars.forEach(star => {
    star.addEventListener('click', () => {
        const value = parseInt(star.getAttribute('data-value'));
        avaliacaoSelecionada = value;

        atualizarEstrelas(value);
    });
});

function atualizarEstrelas(valor) {
    stars.forEach(s => {
        const sValue = parseInt(s.getAttribute('data-value'));
        if (sValue <= valor) {
            s.classList.add('active'); 
        } else {
            s.classList.remove('active'); 
        }
    });
}

formAvaliacao.addEventListener('submit', (e) => {
    e.preventDefault();

    if (avaliacaoSelecionada === 0) {
        alert("Por favor, selecione pelo menos uma estrela!");
        return;
    }

    console.log(`Avaliação: ${avaliacaoSelecionada} estrelas`);
    console.log(`Comentário: ${document.getElementById('comentario').value}`);

    modalAgradecimento.style.display = 'flex';
});

btnFecharAgradecimento.addEventListener('click', () => {
    modalAgradecimento.style.display = 'none';
    
    document.getElementById('comentario').value = '';
    avaliacaoSelecionada = 0;
    atualizarEstrelas(0);
});