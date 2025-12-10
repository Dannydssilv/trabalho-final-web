const urlBase = "https://back-end-tf-web-chi.vercel.app";
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const botaoSalvar = document.getElementById("submit");
botaoSalvar.addEventListener("click", salvarAdmin);

document.getElementById("id").value = "Carregando...";

(async () => {
    try {
        const endpoint = `/admin/${id}`; 
        const urlFinal = urlBase + endpoint; 

        const response = await fetch(urlFinal);

        if (!response.ok) {
            throw new Error("Erro na requisição: " + response.status);
        }

        const data = await response.json();

        const admin = Array.isArray(data) ? data[0] : data;

        document.getElementById("id").value = admin.id;
        document.getElementById("nome").value = admin.nome;
        document.getElementById("email").value = admin.email;
        document.getElementById("senha").value = admin.senha;

    } catch (error) {
        document.getElementById("id").value = `Erro: ${error.message}`;
        console.error("Erro ao carregar administrador:", error);
    }
})();

async function salvarAdmin(e) {
    e.preventDefault(); // Impede o comportamento padrão do botão

    try {
        const dados = {
            nome: document.getElementById("nome").value,
            email: document.getElementById("email").value,
            senha: document.getElementById("senha").value,
        };

        if (!dados.nome || !dados.email || !dados.senha) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        const endpoint = `/admin/${id}`; 
        const urlFinal = urlBase + endpoint; 

        const response = await fetch(urlFinal, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dados),
        });

        if (!response.ok) {
            throw new Error("Erro na requisição: " + response.status);
        }

        alert("Administrador alterado com sucesso!");
        window.location.href = "admin.html";

    } catch (error) {
        console.error("Erro ao salvar:", error);
        alert("Administrador não alterado: " + error.message);
        window.location.href = "admin.html";
    }
}