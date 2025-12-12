const urlBase = "https://back-end-tf-web-chi.vercel.app";
const botaoAutor = document.getElementById('botaoAutor');
const elAutor = document.getElementById('autor');
const elApi = document.getElementById('api');
const elBd = document.getElementById('bd');

if (botaoAutor) {
    botaoAutor.addEventListener('click', async () => {
        elAutor.innerText = "Aguarde...";

        try {
            const response = await fetch(urlBase);

            if (!response.ok) throw new Error(response.status);

            const data = await response.json();
            
            if (elAutor) elAutor.innerHTML = `<strong>Autor:</strong> ${data.autor}`;
            if (elApi) elApi.innerHTML = `<strong>API:</strong> ${data.mensagem}`;
            if (elBd) elBd.innerHTML = `<strong>Banco de Dados:</strong> ${data.dbStatus}`;

        } catch (error) {
            console.error(error);
            if (elAutor) elAutor.innerText = "Erro ao carregar.";
        }
    });
}